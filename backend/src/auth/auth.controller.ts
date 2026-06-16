import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { LoginUserDto } from 'src/users/dto/login.user.dto';
import { AuthGuard } from './auth.guard';
import { UserDocument } from 'src/schemas/User.schema';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { Permissions } from '../common/decorators/permissions.decorator';
import { Role } from '../common/enums/role.enum';
import { Permission } from '../common/enums/permission.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService:AuthService,
        private readonly userService:UsersService
    ){}

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get("profile")
    async getProfile(@Request() req:{user:UserDocument}){
      const profile = await this.authService.profile(req.user.email as string);         
      return profile;
    }

    @Post("register")
    async register(@Body() data_user:CreateUserDto){
        const user = await this.authService.createUser(data_user);
        return user;
    }

    @Post("login")
    async login(@Body() data_user:LoginUserDto){
        const token = await this.authService.signin(data_user);
        return token;
    }

     // Accessible uniquement aux admins
  
  @UseGuards(AuthGuard, RolesGuard)  
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @Get('admin/users')
  async getAllUsers() {
    return await this.userService.get_users();
  }

  // Accessible uniquement avec permission spécifique
  @Post('admin/assign-role/:userId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Permissions(Permission.MANAGE_ROLES)
  @ApiBearerAuth()
  async assignRole(@Param('userId') userId: string, @Body('role') role: Role) {
    return await this.authService.assignRole(userId, role);
  }

  // Personnel et Admin peuvent accéder
  @Get('personnel/dashboard')
  @Roles(Role.PERSONNEL, Role.ADMIN)
  @ApiBearerAuth()
  async getPersonnelDashboard() {
    return { message: 'Dashboard personnel' };
  }

}
