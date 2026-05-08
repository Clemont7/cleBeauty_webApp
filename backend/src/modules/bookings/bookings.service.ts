import { Injectable } from "@nestjs/common";

@Injectable()
export class BookingsService {
  create(payload: Record<string, unknown>) { return { message: "Booking received", payload }; }
}
