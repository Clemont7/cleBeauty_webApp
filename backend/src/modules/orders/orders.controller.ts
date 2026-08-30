import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../../auth/current-user.decorator";
import { AuthUser, JwtAuthGuard } from "../../auth/jwt.guard";
import { CheckoutDto } from "./dto";
import { OrdersService } from "./orders.service";

@Controller()
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post("checkout")
  checkout(@CurrentUser() user: AuthUser, @Body() dto: CheckoutDto) {
    return this.orders.checkout(user.id, dto);
  }

  @Get("orders")
  listOrders(@CurrentUser() user: AuthUser) {
    return this.orders.listOrders(user.id);
  }

  @Get("library")
  listLibrary(@CurrentUser() user: AuthUser) {
    return this.orders.listLibrary(user.id);
  }
}
