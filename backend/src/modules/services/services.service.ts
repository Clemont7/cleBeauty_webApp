import { Injectable } from "@nestjs/common";

@Injectable()
export class ServicesService {
  findAll() {
    return [
      { title: "Maquilhagem Minimalista", price: "2.500 MZN", duration: "60 min" },
      { title: "Penteado Natural", price: "2.000 MZN", duration: "45 min" }
    ];
  }
}
