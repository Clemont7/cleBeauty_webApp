import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CheckoutDto } from "./dto";

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  /** Simulated checkout: prices are recomputed server-side, no real charge. */
  async checkout(userId: string, dto: CheckoutDto) {
    const productIds = dto.items.filter((i) => i.kind === "product").map((i) => i.id);
    const courseIds = dto.items.filter((i) => i.kind === "course").map((i) => i.id);

    const [products, courses] = await Promise.all([
      this.prisma.product.findMany({ where: { id: { in: productIds } } }),
      this.prisma.course.findMany({ where: { id: { in: courseIds } } }),
    ]);

    const productMap = new Map(products.map((p) => [p.id, p]));
    const courseMap = new Map(courses.map((c) => [c.id, c]));

    let totalCents = 0;
    const itemsData = dto.items.map((item) => {
      if (item.kind === "product") {
        const p = productMap.get(item.id);
        if (!p) throw new BadRequestException(`Produto inválido: ${item.id}`);
        totalCents += p.priceCents * item.quantity;
        return {
          kind: "product",
          name: p.name,
          priceCents: p.priceCents,
          quantity: item.quantity,
          productId: p.id,
        };
      }
      const c = courseMap.get(item.id);
      if (!c) throw new BadRequestException(`Curso inválido: ${item.id}`);
      totalCents += c.priceCents;
      return {
        kind: "course",
        name: c.title,
        priceCents: c.priceCents,
        quantity: 1,
        courseId: c.id,
      };
    });

    const order = await this.prisma.order.create({
      data: {
        userId,
        totalCents,
        status: "paid",
        customerName: dto.customerName,
        address: dto.address,
        city: dto.city,
        phone: dto.phone,
        items: { create: itemsData },
      },
      include: { items: true },
    });

    // Grant course access.
    for (const courseId of courseIds) {
      await this.prisma.enrollment.upsert({
        where: { userId_courseId: { userId, courseId } },
        create: { userId, courseId },
        update: {},
      });
    }

    return order;
  }

  listOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });
  }

  async listLibrary(userId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      include: { course: true },
      orderBy: { createdAt: "desc" },
    });
    return enrollments.map((e) => ({
      enrolledAt: e.createdAt,
      course: {
        id: e.course.id,
        slug: e.course.slug,
        title: e.course.title,
        summary: e.course.summary,
        coverUrl: e.course.coverUrl,
      },
    }));
  }
}
