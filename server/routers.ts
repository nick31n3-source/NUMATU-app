import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createPartner, getCollectionPoints, getPartnerById } from "./db";
import { notifyOwner } from "./_core/notification";
import { sendWhatsAppWelcomeMessage, sendAIResponse } from "./whatsapp";
import { generatePartnerResponse } from "./ai_agent";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  partners: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(2).max(255).trim(),
          email: z.string().email().max(320).toLowerCase().trim(),
          phone: z.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/).optional().or(z.literal('')),
          whatsappNumber: z.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/).optional().or(z.literal('')),
          partnerType: z.enum(["company", "collector", "buyer"]),
          companyName: z.string().max(255).trim().optional().or(z.literal('')),
          city: z.string().max(100).trim().optional().or(z.literal('')),
          state: z.string().length(2).toUpperCase().trim().optional().or(z.literal('')),
          message: z.string().max(1000).trim().optional().or(z.literal('')),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Preparar dados para salvar no banco de dados
          const partnerData = {
            name: input.name,
            email: input.email,
            phone: input.phone || null,
            whatsappNumber: input.whatsappNumber || input.phone || null,
            partnerType: input.partnerType,
            companyName: input.companyName || null,
            city: input.city || null,
            state: input.state || null,
            message: input.message || null,
          };

          // Salvar parceiro no banco de dados
          const result = await createPartner(partnerData as any);
          
          if (result && result.length > 0) {
            const partner = result[0];
            
            // Notificar proprietário sobre novo parceiro
            await notifyOwner({
              title: `Novo Parceiro Interessado: ${input.partnerType}`,
              content: `${input.name} (${input.email}) se registrou como ${input.partnerType}${input.companyName ? ` - ${input.companyName}` : ""}`,
            });

            // Enviar mensagem de boas-vindas via WhatsApp com conteúdo gerado por IA
            const whatsappPhone = input.whatsappNumber || input.phone;
            if (whatsappPhone) {
              try {
                await sendWhatsAppWelcomeMessage(partner);
              } catch (error) {
                console.error("[Partners] Erro ao enviar mensagem WhatsApp:", error);
                // Não bloquear o fluxo se WhatsApp falhar
              }
            }

            return { 
              success: true,
              partnerId: partner.id,
              message: "Parceiro registrado com sucesso! Você receberá uma mensagem de boas-vindas em breve.",
            };
          }
          
          return { 
            success: false,
            message: "Erro ao registrar parceiro",
          };
        } catch (error) {
          console.error("[Partners] Erro ao submeter parceiro:", error);
          return { 
            success: false,
            message: "Erro ao processar seu registro. Por favor, tente novamente.",
          };
        }
      }),

    /**
     * Rota para responder perguntas de parceiros via IA
     */
    askQuestion: publicProcedure
      .input(
        z.object({
          partnerId: z.number(),
          question: z.string().min(5).max(500).trim(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Buscar dados do parceiro
          const partner = await getPartnerById(input.partnerId);
          
          if (!partner) {
            return {
              success: false,
              message: "Parceiro não encontrado",
            };
          }

          // Gerar resposta via IA e enviar via WhatsApp
          const whatsappPhone = partner.whatsappNumber || partner.phone;
          if (whatsappPhone) {
            await sendAIResponse(partner, input.question);
          }

          return {
            success: true,
            message: "Sua pergunta foi enviada para o agente de IA. Você receberá uma resposta em breve.",
          };
        } catch (error) {
          console.error("[Partners] Erro ao processar pergunta:", error);
          return {
            success: false,
            message: "Erro ao processar sua pergunta",
          };
        }
      }),
  }),

  collectionPoints: router({
    list: publicProcedure
      .input(
        z.object({
          page: z.number().min(1).default(1),
          limit: z.number().min(1).max(100).default(50),
        }).optional()
      )
      .query(async ({ input }) => {
        const page = input?.page || 1;
        const limit = input?.limit || 50;
        const offset = (page - 1) * limit;
        
        const points = await getCollectionPoints();
        const total = points.length;
        const paginatedPoints = points.slice(offset, offset + limit);
        
        return {
          data: paginatedPoints,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
