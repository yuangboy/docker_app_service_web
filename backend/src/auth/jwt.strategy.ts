// auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtPayload } from '../../interface/jwt-payload.interface'
import { UsersService } from '../users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET')
    if (!jwtSecret) {
      throw new Error('JWT_SECRET must be defined in configuration')
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.get_user_by_email(payload.email)

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Utilisateur inactif ou inexistant')
    }

    // Retourner l'utilisateur complet avec ses rôles et permissions
    return {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
    }
  }
}
