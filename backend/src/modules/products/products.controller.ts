import { Controller, Get, Param, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  findAll(@Query("category") category?: string, @Query("filter") filter?: string) {
    return this.products.findAll({ category, filter });
  }

  @Get("filters")
  findFilters() {
    return this.products.findFilters();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.products.findOne(id);
  }
}
