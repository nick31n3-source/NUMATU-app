import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createPartner, getCollectionPoints, getPartnerById } from "./db";
import { notifyOwner } from "./_core/notification";
import { sendPartnerRegistrationEmail, sendPartnerWelcomeEmail } from "./email";

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

            // Enviar e-mail de notificação para numatucorp@gmail.com
            try {
              await sendPartnerRegistrationEmail(partner);
            } catch (error) {
              console.error("[Partners] Erro ao enviar e-mail de notificação:", error);
              // Não bloquear o fluxo se o e-mail falhar
            }

            // Enviar e-mail de boas-vindas para o parceiro
            try {
              await sendPartnerWelcomeEmail(partner);
            } catch (error) {
              console.error("[Partners] Erro ao enviar e-mail de boas-vindas:", error);
              // Não bloquear o fluxo se o e-mail falhar
            }

            return { 
              success: true,
              partnerId: partner.id,
              message: "Parceiro registrado com sucesso! Você receberá um e-mail de confirmação em breve.",
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
