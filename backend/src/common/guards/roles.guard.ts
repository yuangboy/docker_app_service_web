// src/common/guards/roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { Role } from '../enums/role.enum';
import { Permission } from '../enums/permission.enum';
import {WINSTON_MODULE_PROVIDER} from "nest-winston";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  canActivate(context: ExecutionContext): boolean {

    this.logger.warn("=== Role Guard Activated ===", {
      context: 'RolesGuard',
      timestamp: new Date().toLocaleDateString(),
    });
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    this.logger.debug(`Required Roles for this route: ${requiredRoles}`, {
      context: 'RolesGuard',
      timestamp: new Date().toLocaleDateString(),
    });

    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );
    this.logger.debug(`Required Permissions for this route: ${requiredPermissions}`, {
      context: 'RolesGuard',
      timestamp: new Date().toLocaleDateString(),
    });

    // Si aucune restriction n'est définie, on autorise
    if (!requiredRoles && !requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    this.logger.debug(`User info from request: ${JSON.stringify(request.user)}`, {
      context: 'RolesGuard',
      timestamp: new Date().toLocaleDateString(),
    });

    this.logger.debug("Toute les clés request.user: " + Object.keys(request), {
      context: 'RolesGuard',
      timestamp: new Date().toLocaleDateString(),
    });

    const user = request.user;

    if (!user) {
      this.logger.warn(`Utilisateur non authentifié (undefined): ${JSON.stringify(request.user)}`, {
        context: 'RolesGuard',
        timestamp: new Date().toLocaleDateString(),
      });
      throw new ForbiddenException(`Utilisateur non authentifié: ${user}`);
      
    }
    this.logger.debug(`Utilisateur authentifié: ${JSON.stringify(user)}`, {
      context: 'RolesGuard',
      timestamp: new Date().toLocaleDateString(),
    });

    // Vérification des rôles
    if (requiredRoles && requiredRoles.length > 0) {
      const hasRole = requiredRoles.some((role) => user.role === role);
      if (!hasRole) {
        throw new ForbiddenException(
          `Rôle requis : ${requiredRoles.join(', ')}. Votre rôle : ${user.role}`
        );
      }
    }

    // Vérification des permissions
    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasPermissions = requiredPermissions.every((permission) =>
        user.permissions?.includes(permission)
      );
      if (!hasPermissions) {
        throw new ForbiddenException(
          `Permissions requises : ${requiredPermissions.join(', ')}`
        );
      }
    }

    return true;
  }
}