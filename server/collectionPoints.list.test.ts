import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database function
vi.mock("./db", () => ({
  getCollectionPoints: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Ponto 1",
      latitude: "-3.0950",
      longitude: "-41.7700",
      address: "Endereço 1",
      city: "Parnaíba",
      state: "PI",
      description: "Descrição 1",
    },
    {
      id: 2,
      name: "Ponto 2",
      latitude: "-3.0960",
      longitude: "-41.7710",
      address: "Endereço 2",
      city: "Parnaíba",
      state: "PI",
      description: "Descrição 2",
    },
    {
      id: 3,
      name: "Ponto 3",
      latitude: "-3.0970",
      longitude: "-41.7720",
      address: "Endereço 3",
      city: "Parnaíba",
      state: "PI",
      description: "Descrição 3",
    },
  ]),
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

describe("collectionPoints.list", () => {
  let ctx: TrpcContext;

  beforeEach(() => {
    ctx = createPublicContext();
  });

  it("should return all collection points without pagination params", async () => {
    const caller = appRouter.createCaller(ctx);

    const result = await caller.collectionPoints.list();

    expect(result.data).toHaveLength(3);
    expect(result.pagination.total).toBe(3);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.limit).toBe(50);
  });

  it("should return paginated collection points", async () => {
    const caller = appRouter.createCaller(ctx);

    const result = await caller.collectionPoints.list({
      page: 1,
      limit: 2,
    });

    expect(result.data).toHaveLength(2);
    expect(result.pagination.total).toBe(3);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.limit).toBe(2);
    expect(result.pagination.totalPages).toBe(2);
  });

  it("should return second page of results", async () => {
    const caller = appRouter.createCaller(ctx);

    const result = await caller.collectionPoints.list({
      page: 2,
      limit: 2,
    });

    expect(result.data).toHaveLength(1);
    expect(result.data[0].name).toBe("Ponto 3");
    expect(result.pagination.page).toBe(2);
  });

  it("should reject invalid page number", async () => {
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.collectionPoints.list({
        page: 0,
        limit: 10,
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should reject limit exceeding maximum", async () => {
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.collectionPoints.list({
        page: 1,
        limit: 101,
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });
});
