import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  Inject,
  Logger,
} from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/users/dto/create.user.dto'
import { User, UserDocument } from 'src/schemas/User.schema'
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { JwtPayload } from 'interface/jwt-payload.interface'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Role } from 'src/common/enums/role.enum'
import { Permission } from 'src/common/enums/permission.enum'

type typeLogin = Pick<CreateUserDto, 'email' | 'password'>
type IActivationToken = {
  code: string
  token: string
  tokenExpiresAt: Date
}

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(User)
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectModel(User.name)
    // private readonly authRepository:Repository<User>,
    private readonly authModel: Model<UserDocument>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async createUser(data_user: CreateUserDto): Promise<UserDocument> {
    const { email, password } = data_user

    try {
      const user = await this.userService.findUserByEmail(email)

      if (user) {
        this.logger.warn(
          `Tentative de création d'un utilisateur existant: ${email}`,
          {
            context: 'createUser',
            timestamp: new Date().toLocaleDateString(),
          }
        )
        throw new UnauthorizedException('User exist !')
      }
      const hashPass = await this.hashPassword(password)
      // const newUser = await this.authModel.create({
      //   ...data_user,
      //   password: hashPass,
      // })

      const newUser = new this.authModel({
        ...data_user,
        password: hashPass,
      })
      const { code, token, tokenExpiresAt } = this.activateUser(newUser)

      newUser.verificationCode = code
      newUser.verificationToken = token
      newUser.tokenExpiresAt = tokenExpiresAt

      await newUser.save()
      this.logger.debug(`Utilisateur créé avec succès: ${email}`, {
        context: 'createUser',
        timestamp: new Date().toLocaleDateString(),
      })
      return newUser
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(
        `Erreur lors de la création de l'utilisateur: ${email}`,
        {
          context: 'createUser',
          timestamp: new Date().toLocaleDateString(),
          errorMessage: err.message,
        }
      )
      throw new InternalServerErrorException(
        "Erreur lors de la création de l'utilisateur"
      )
    }
  }

  async signin(
    data_user: typeLogin
  ): Promise<{
    data: {
      user: { email: string; name: string; role: string }
      access_token: string
    }
  }> {
    const { password, email } = data_user

    if (!password) throw new BadRequestException('Mot de passe requis')
    if (!email) throw new BadRequestException('email requis')

    const user_by_email = await this.userService.get_user_by_email(email)

    if (user_by_email) {
      const verifPassword = await this.verifPassword(
        password,
        user_by_email.password
      )

      if (verifPassword) {
        // const user: JwtPayload = { email: user_by_email.email }
        // const token = this.jwtService.sign(user)

        const payload: JwtPayload = {
          email: user_by_email.email,
          role: user_by_email.role,
          permissions: user_by_email.permissions,
          sub: user_by_email._id.toString(),
        }

        const token = this.jwtService.sign(payload)

        // Mettre à jour lastLoginAt
        user_by_email.lastLoginAt = new Date()
        await user_by_email.save()

        return {
          data: {
            user: {
              email: user_by_email.email,
              name: user_by_email.name,
              role: user_by_email.role,
            },
            access_token: token,
          },
        }
      } else {
        throw new UnauthorizedException('Mot de passe ou email incorrect')
      }
    } else {
      throw new NotFoundException('User not found !')
    }
  }

  async validateUser(payload: JwtPayload): Promise<UserDocument | null> {
    return await this.userService.get_user_by_email(payload.email)
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 9)
  }

  private async verifPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  async profile(email: string) {
    if (!email) throw new BadRequestException('email requis')
    const user = await this.userService.get_user_by_email(email)
    if (!user) throw new NotFoundException('User not Found')

    return { email: user.email, userId: user._id }
  }

  activateUser = (user: UserDocument): IActivationToken => {
    try {
      const code = Math.floor(1000 + Math.random() * 9000).toString()

      const token = this.jwtService.sign(
        { email: user.email },
        {
          secret: process.env.ACTIVATION_SECRET as string,
          expiresIn: '30m',
        }
      )

      const tokenExpiresAt = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes

      return { code, token, tokenExpiresAt }
    } catch (error) {
      console.error(error)
      throw new Error("Échec de la génération du token d'activation.")
    }
  }

  async assignRole(userId: string, role: Role): Promise<UserDocument> {
    const user = await this.userService.get_user_by_id(userId)
    if (!user) throw new NotFoundException('Utilisateur non trouvé')

    user.role = role
    await user.save()

    this.logger.log(`Rôle ${role} assigné à l'utilisateur ${user.email}`)
    return user
  }

  async addPermission(
    userId: string,
    permission: Permission
  ): Promise<UserDocument> {
    const user = await this.userService.get_user_by_id(userId)
    if (!user) throw new NotFoundException('Utilisateur non trouvé')

    if (!user.permissions.includes(permission)) {
      user.permissions.push(permission)
      await user.save()
    }

    return user
  }

  async hasPermission(
    userId: string,
    permission: Permission
  ): Promise<boolean> {
    const user = await this.userService.get_user_by_id(userId)
    return user?.permissions?.includes(permission) ?? false
  }

 
}
