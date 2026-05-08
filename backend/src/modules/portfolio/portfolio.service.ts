import { Injectable } from "@nestjs/common";

@Injectable()
export class PortfolioService {
  findAll() { return [{ title: "Antes/Depois Noiva", category: "before-after" }, { title: "Look Diário", category: "makeup" }]; }
}
