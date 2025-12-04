import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createPartner, getCollectionPoints } from "./db";
import { notifyOwner } from "./_core/notification";
import { sendWhatsAppWelcomeMessage } from "./whatsapp";

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
          partnerType: z.enum(["company", "collector", "buyer"]),
          companyName: z.string().max(255).trim().optional().or(z.literal('')),
          city: z.string().max(100).trim().optional().or(z.literal('')),
          state: z.string().length(2).toUpperCase().trim().optional().or(z.literal('')),
          message: z.string().max(1000).trim().optional().or(z.literal('')),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const result = await createPartner(input);
          if (result) {
            // Notify owner about new partner
            await notifyOwner({
              title: `Novo Parceiro Interessado: ${input.partnerType}`,
              content: `${input.name} (${input.email}) se registrou como ${input.partnerType}${input.companyName ? ` - ${input.companyName}` : ""}`,
            });

            // Send WhatsApp welcome message if phone is provided
            if (input.phone) {
              await sendWhatsAppWelcomeMessage({
                phone: input.phone,
                name: input.name,
                partnerType: input.partnerType,
                email: input.email,
              });
            }
          }
          return { success: !!result };
        } catch (error) {
          console.error("Error submitting partner:", error);
          return { success: false };
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
