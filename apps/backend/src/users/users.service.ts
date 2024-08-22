import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { username: data.username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  async findAllUsers() {
    return this.prisma.user.findMany();
  }

  async findOne(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  // If you need to find by id, make sure it's implemented correctly
  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findUserByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async removeUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
