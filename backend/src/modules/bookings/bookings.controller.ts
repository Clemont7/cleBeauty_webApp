import { Body, Controller, Post } from "@nestjs/common";
import { BookingsService } from "./bookings.service";

@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}
  @Post() create(@Body() payload: Record<string, unknown>) { return this.bookingsService.create(payload); }
}
