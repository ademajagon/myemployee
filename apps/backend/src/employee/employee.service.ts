import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async createEmployee(data: any) {
    return this.prisma.employee.create({
      data,
    });
  }

  async getEmployees() {
    return this.prisma.employee.findMany();
  }

  async getEmployeeById(id: number) {
    return this.prisma.employee.findUnique({
      where: { id },
      include: { addresses: true },
    });
  }

  async updateEmployee(id: number, data: any) {
    return this.prisma.employee.update({
      where: { id },
      data,
    });
  }

  async deleteEmployee(id: number) {
    return this.prisma.employee.delete({
      where: { id },
    });
  }
}
