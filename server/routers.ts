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
          name: z.string().min(2),
          email: z.string().email(),
          phone: z.string().optional(),
          partnerType: z.enum(["company", "collector", "buyer"]),
          companyName: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          message: z.string().optional(),
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
    list: publicProcedure.query(async () => {
      return await getCollectionPoints();
    }),
  }),
});

export type AppRouter = typeof appRouter;
