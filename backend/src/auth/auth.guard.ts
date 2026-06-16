import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {WINSTON_MODULE_PROVIDER} from "nest-winston";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.logger.warn(`Accès refusé: Token manquant dans la requête`, {
        context: 'AuthGuard',
        timestamp: new Date().toLocaleDateString(),
      });
      throw new UnauthorizedException("Token manquant ou Invalide");
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers

      this.logger.debug(`Accès autorisé: Token valide pour l'utilisateur ${JSON.stringify(payload)}`, {
        context: 'AuthGuard',
        timestamp: new Date().toLocaleDateString(),
      });
      request['user'] = payload;
    } catch (error:unknown) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(`Erreur de validation du token: ${err.message}`, {
        context: 'AuthGuard',
        timestamp: new Date().toLocaleDateString(),
      });
      throw new UnauthorizedException("Token Invalide ou expiré");
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}