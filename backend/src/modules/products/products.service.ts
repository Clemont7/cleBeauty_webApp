import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(params: { category?: string; filter?: string }) {
    return this.prisma.product.findMany({
      where: {
        category: params.category || undefined,
        filterType: params.filter === "true" ? { not: null } : undefined,
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
  }

  /** Shades available in the virtual try-on studio. */
  findFilters() {
    return this.prisma.product.findMany({
      where: { filterType: { not: null } },
      orderBy: { filterType: "asc" },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException("Produto não encontrado.");
    return product;
  }
}
