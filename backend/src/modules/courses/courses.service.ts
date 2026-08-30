import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const courses = await this.prisma.course.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { lessons: true } } },
    });
    return courses.map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      summary: c.summary,
      priceCents: c.priceCents,
      coverUrl: c.coverUrl,
      level: c.level,
      lessonCount: c._count.lessons,
    }));
  }

  async findOne(slug: string, userId?: string) {
    const course = await this.prisma.course.findUnique({
      where: { slug },
      include: { lessons: { orderBy: { order: "asc" } } },
    });
    if (!course || !course.published) throw new NotFoundException("Curso não encontrado.");

    const enrolled = userId
      ? !!(await this.prisma.enrollment.findUnique({
          where: { userId_courseId: { userId, courseId: course.id } },
        }))
      : false;

    return {
      id: course.id,
      slug: course.slug,
      title: course.title,
      summary: course.summary,
      description: course.description,
      priceCents: course.priceCents,
      coverUrl: course.coverUrl,
      level: course.level,
      enrolled,
      lessons: course.lessons.map((l) => {
        const canWatch = enrolled || l.freePreview;
        return {
          id: l.id,
          title: l.title,
          durationLabel: l.durationLabel,
          order: l.order,
          freePreview: l.freePreview,
          // video is only exposed to owners / on free previews
          videoUrl: canWatch ? l.videoUrl : null,
          locked: !canWatch,
        };
      }),
    };
  }
}
