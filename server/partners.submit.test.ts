import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database and notification functions
vi.mock("./db", () => ({
  createPartner: vi.fn().mockResolvedValue({ insertId: 1 }),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("partners.submit", () => {
  let ctx: TrpcContext;

  beforeEach(() => {
    ctx = createPublicContext();
  });

  it("should accept valid partner submission", async () => {
    const caller = appRouter.createCaller(ctx);

    const result = await caller.partners.submit({
      name: "João Silva",
      email: "joao@example.com",
      phone: "(86) 99586-2231",
      partnerType: "company",
      companyName: "Empresa ABC",
      city: "Parnaíba",
      state: "PI",
      message: "Interessado em parceria",
    });

    expect(result).toEqual({ success: true });
  });

  it("should reject submission without name", async () => {
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.partners.submit({
        name: "",
        email: "joao@example.com",
        phone: "(86) 99586-2231",
        partnerType: "company",
        companyName: "Empresa ABC",
        city: "Parnaíba",
        state: "PI",
        message: "Interessado em parceria",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should reject submission with invalid email", async () => {
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.partners.submit({
        name: "João Silva",
        email: "invalid-email",
        phone: "(86) 99586-2231",
        partnerType: "company",
        companyName: "Empresa ABC",
        city: "Parnaíba",
        state: "PI",
        message: "Interessado em parceria",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should accept all partner types", async () => {
    const caller = appRouter.createCaller(ctx);
    const partnerTypes: Array<"company" | "collector" | "buyer"> = [
      "company",
      "collector",
      "buyer",
    ];

    for (const type of partnerTypes) {
      const result = await caller.partners.submit({
        name: "Test User",
        email: "test@example.com",
        phone: "(86) 99586-2231",
        partnerType: type,
        companyName: "Test Company",
        city: "Parnaíba",
        state: "PI",
        message: "Test message",
      });

      expect(result.success).toBe(true);
    }
  });
});
