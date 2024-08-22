import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CustomResponse } from '../common/response/custom-response';
import { CustomException } from '../common/exceptions/custom.exception';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async createEmployee(data: CreateEmployeeDto): Promise<CustomResponse<any>> {
    const employee = await this.prisma.employee.create({
      data,
    });
    return {
      statusCode: 201,
      message: 'Employee created successfully',
      data: employee,
    };
  }

  async getEmployees(): Promise<CustomResponse<any[]>> {
    const employees = await this.prisma.employee.findMany();
    return {
      statusCode: 200,
      message: 'Employees retrieved successfully',
      data: employees,
    };
  }

  async getEmployeeById(id: number): Promise<CustomResponse<any>> {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: { addresses: true }, // Include addresses
    });
    if (!employee) {
      throw new CustomException('Employee not found', HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: 200,
      message: 'Employee retrieved successfully',
      data: employee,
    };
  }

  async updateEmployee(
    id: number,
    data: UpdateEmployeeDto
  ): Promise<CustomResponse<any>> {
    const updatedEmployee = await this.prisma.employee.update({
      where: { id },
      data,
    });
    return {
      statusCode: 200,
      message: 'Employee updated successfully',
      data: updatedEmployee,
    };
  }

  async deleteEmployee(id: number): Promise<CustomResponse<any>> {
    const deletedEmployee = await this.prisma.employee.delete({
      where: { id },
    });
    return {
      statusCode: 200,
      message: 'Employee deleted successfully',
      data: deletedEmployee,
    };
  }
}
