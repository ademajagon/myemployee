import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async createAddress(data: CreateAddressDto) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: data.employeeId },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return this.prisma.address.create({
      data,
    });
  }

  async getAddresses() {
    return this.prisma.address.findMany();
  }

  async getAddressById(id: number) {
    const address = await this.prisma.address.findUnique({
      where: { id },
    });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async updateAddress(id: number, data: UpdateAddressDto) {
    const address = await this.prisma.address.update({
      where: { id },
      data,
    });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async deleteAddress(id: number) {
    const address = await this.prisma.address.delete({
      where: { id },
    });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }
}
