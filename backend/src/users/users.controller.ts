import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service'
import {CreateUserDto} from "./dto/create.user.dto";
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {

}



  @Post("create")
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
  }


  @Get("list-users")
  async listUser(){
     return await this.usersService.get_users();
  }

}