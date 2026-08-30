import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { CoursesModule } from "./modules/courses/courses.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { PortfolioModule } from "./modules/portfolio/portfolio.module";
import { ProductsModule } from "./modules/products/products.module";
import { ServicesModule } from "./modules/services/services.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    ProductsModule,
    CoursesModule,
    OrdersModule,
    ServicesModule,
    BookingsModule,
    PortfolioModule,
  ],
})
export class AppModule {}
