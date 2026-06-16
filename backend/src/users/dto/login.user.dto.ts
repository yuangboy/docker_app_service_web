import { Expose } from 'class-transformer'
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

import {Role} from "../../common/enums/role.enum";

export class LoginUserDto {
  @IsEmail()
  email!: string

  @IsString()
  password!: string
}
