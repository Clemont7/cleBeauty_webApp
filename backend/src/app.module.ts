import { Module } from "@nestjs/common";
import { ServicesModule } from "./modules/services/services.module";
import { BookingsModule } from "./modules/bookings/bookings.module";
import { ClassesModule } from "./modules/classes/classes.module";
import { PortfolioModule } from "./modules/portfolio/portfolio.module";

@Module({
  imports: [ServicesModule, BookingsModule, ClassesModule, PortfolioModule]
})
export class AppModule {}
