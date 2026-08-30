import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface RequestLike {
  headers: { authorization?: string };
  user?: AuthUser;
}

function extractUser(req: RequestLike, jwt: JwtService): AuthUser | null {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) return null;
  try {
    const payload = jwt.verify(header.slice(7));
    return { id: payload.sub, email: payload.email, name: payload.name };
  } catch {
    return null;
  }
}

/** Requires a valid token; attaches req.user. */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<RequestLike>();
    const user = extractUser(req, this.jwt);
    if (!user) throw new UnauthorizedException("Sessão inválida ou expirada.");
    req.user = user;
    return true;
  }
}

/** Never blocks; attaches req.user when a valid token is present. */
@Injectable()
export class OptionalJwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<RequestLike>();
    const user = extractUser(req, this.jwt);
    if (user) req.user = user;
    return true;
  }
}
