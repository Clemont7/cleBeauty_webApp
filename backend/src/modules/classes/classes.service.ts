import { Injectable } from "@nestjs/common";

@Injectable()
export class ClassesService {
  findAll() { return [{ title: "Base perfeita minimalista", locked: true }, { title: "Penteado natural para eventos", locked: true }]; }
}
