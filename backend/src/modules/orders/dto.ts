import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";

export class CheckoutItemDto {
  @IsIn(["product", "course"])
  kind!: "product" | "course";

  @IsString()
  id!: string;

  @IsInt()
  @Min(1)
  quantity: number = 1;
}

export class CheckoutDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items!: CheckoutItemDto[];

  @IsString()
  @MinLength(2)
  customerName!: string;

  @IsString()
  @MinLength(3)
  address!: string;

  @IsString()
  @MinLength(2)
  city!: string;

  @IsString()
  @MinLength(6)
  phone!: string;
}
