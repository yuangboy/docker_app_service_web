import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { Role } from '../common/enums/role.enum'
import { Permission } from '../common/enums/permission.enum'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ default: false })
  isOauth: boolean

  @Prop()
  profilePicture?: string

  @Prop()
  phoneNumber?: string

  @Prop()
  googleId?: string

  @Prop({ default: false })
  isVerified: boolean

  @Prop({ type: String, enum: Role, default: Role.USER })
  role: Role

  @Prop({ type: [String], enum: Permission, default: [] })
  permissions: Permission[]

  @Prop({ default: true })
  isActive: boolean

  @Prop({ default: false })
  agreeTerms: boolean

  @Prop({ default: false })
  isBlocked: boolean

  @Prop({ default: null })
  verificationCode?: string

  @Prop({ default: null })
  verificationToken?: string

  @Prop({ default: null })
  tokenExpiresAt?: Date

  @Prop()
  lastLoginAt?: Date

  @Prop({ default: null })
  resetPasswordToken?: string

  @Prop({ default: null })
  resetPasswordExpires?: Date

  @Prop({ default: 0 })
  verificationAttempts: number
}

export const UserSchema = SchemaFactory.createForClass(User)
