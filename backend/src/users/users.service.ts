import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../schemas/User.schema'
import { CreateUserDto } from './dto/create.user.dto'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
// import { UserDto } from './dto/user.dto'
// type typeUsers=Omit<UserDto,"ObjectId">  

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  //  private users: User[] = [
  //   {
  //     name: 'Admin',
  //     email: 'admin@example.com',
  //     password: 'admin123',
  //     role: 'admin_principal',
  //     isOauth: false,
  //     isVerified: true,
  //     agreeTerms: true,
  //     isBlocked: false,
  //     verificationAttempts: 0,
  //   },
  //   {
  //     name: 'Secondary Admin',
  //     email: 'secondary-admin@example.com',
  //     password: 'secondary123',
  //     role: 'admin_secondaire',
  //     isOauth: false,
  //     isVerified: true,
  //     agreeTerms: true,
  //     isBlocked: false,
  //     verificationAttempts: 0,
  //   },
  //   {
  //     name: 'Personnel',
  //     email: 'personnel@example.com',
  //     password: 'personnel123',
  //     role: 'personnel',
  //     isOauth: false,
  //     isVerified: true,
  //     agreeTerms: true,
  //     isBlocked: false,
  //     verificationAttempts: 0,
  //   }
  //  ];

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    })
    if (!existingUser) {
      await this.userModel.create(createUserDto)
    }
  }

  async get_user_by_email(email: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findOne({ email })

      if (!user) {
        this.logger.warn('User not Found',{
          context: 'getUserByEmail',
          email,
          timestamp: new Date().toLocaleDateString(),
        })
        throw new NotFoundException('User not found !')
      }

      this.logger.debug('User exist', {
        context: 'getUserByEmail',
        UserId: user._id,
        timestamp: new Date().toLocaleDateString(),
      })
      return user
    } catch (error:unknown)
     {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(
        `Erreur lors de la recherche de l'utilisateur: ${email}`,{
          context: 'getUserByEmail',
          email,
          timestamp: new Date().toLocaleDateString(),
          errorMessage: err.message,
        }
      )
      throw new InternalServerErrorException('Erreur lors de la recherche')
    }
  }

 
  async get_users():Promise<User[] | [] > {
    //  return await this.userModel.find();
    try {

      const users=await this.userModel.find();
      this.logger.debug('Fetching all users from the database', {
        timestamp: new Date().toISOString(),
        data: users,
      });
      return users;
    } catch (error:unknown) {
      const err=error instanceof Error ? error : new Error(String(error));
      this.logger.error(`Error fetching users: ${err.message}`, { err });
      throw error;
    }
  }

  // user.service.ts
async findUserByEmail(email: string): Promise<UserDocument | null> {
  try {
    const user = await this.userModel.findOne({ email });
    return user; // Retourne null si non trouvé, pas d'exception
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    this.logger.error(`Erreur lors de la recherche: ${email}`, {
      context: 'findUserByEmail',
      errorMessage: err.message,
    });
    throw new InternalServerErrorException('Erreur lors de la recherche');
  }
}

 async get_user_by_id(userId: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findOne({ _id: userId })

      if (!user) {
        this.logger.warn('User not Found', {
          context: 'getUserByEmail',
          userId,
          timestamp: new Date().toLocaleDateString(),
        })
        throw new NotFoundException('User not found !')
      }

      this.logger.debug('User exist', {
        context: 'getUserByEmail',
        UserId: user._id,
        timestamp: new Date().toLocaleDateString(),
      })
      return user
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error))
      this.logger.error(
        `Erreur lors de la recherche de l'utilisateur: ${userId}`,
        {
          context: 'getUserByEmail',
          userId,
          timestamp: new Date().toLocaleDateString(),
          errorMessage: err.message,
        }
      )
      throw new InternalServerErrorException('Erreur lors de la recherche')
    }
  }


}
