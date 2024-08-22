import { Role } from '@prisma/client';

export class UpdateUserDto {
  username?: string;
  password?: string;
  role?: Role;
}
