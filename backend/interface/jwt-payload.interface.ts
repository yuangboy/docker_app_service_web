// interface/jwt-payload.interface.ts
import { Role } from '../src/common/enums/role.enum';
import { Permission } from '../src/common/enums/permission.enum';

// export interface JwtPayload{
//     email:string
// }

export interface JwtPayload {
  email: string;
  role?: Role;
  permissions?: Permission[];
  sub?: string; // user id
}
