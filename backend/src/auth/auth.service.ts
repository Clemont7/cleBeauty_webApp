import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto, RegisterDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private async sign(user: { id: string; email: string; name: string }) {
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email, name: user.name });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase().trim();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException("Já existe uma conta com este email.");

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { email, name: dto.name.trim(), passwordHash },
    });
    return this.sign(user);
  }

  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase().trim();
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException("Email ou palavra-passe inválidos.");

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException("Email ou palavra-passe inválidos.");

    return this.sign(user);
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        enrollments: { select: { courseId: true } },
      },
    });
    if (!user) throw new UnauthorizedException();
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      enrolledCourseIds: user.enrollments.map((e) => e.courseId),
    };
  }
}
