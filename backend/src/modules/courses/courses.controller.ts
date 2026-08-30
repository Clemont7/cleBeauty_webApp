import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../../auth/current-user.decorator";
import { AuthUser, OptionalJwtAuthGuard } from "../../auth/jwt.guard";
import { CoursesService } from "./courses.service";

@Controller("courses")
export class CoursesController {
  constructor(private readonly courses: CoursesService) {}

  @Get()
  findAll() {
    return this.courses.findAll();
  }

  @Get(":slug")
  @UseGuards(OptionalJwtAuthGuard)
  findOne(@Param("slug") slug: string, @CurrentUser() user?: AuthUser) {
    return this.courses.findOne(slug, user?.id);
  }
}
