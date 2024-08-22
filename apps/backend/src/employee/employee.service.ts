import 'multer';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CustomResponse } from '../common/response/custom-response';
import { CustomException } from '../common/exceptions/custom.exception';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service
  ) {}

  async createEmployee(
    data: CreateEmployeeDto,
    file: Express.Multer.File
  ): Promise<CustomResponse<any>> {
    let photoUrl = null;
    if (file) {
      const key = await this.s3Service.uploadFile(file);
      photoUrl = this.s3Service.getFileUrl(key);
    }

    const employee = await this.prisma.employee.create({
      data: {
        ...data,
        photo: photoUrl,
      },
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
      include: { addresses: true },
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
    data: UpdateEmployeeDto,
    file?: Express.Multer.File
  ): Promise<CustomResponse<any>> {
    let photoUrl = null;
    if (file) {
      const key = await this.s3Service.uploadFile(file);
      photoUrl = this.s3Service.getFileUrl(key);
    }

    const updatedEmployee = await this.prisma.employee.update({
      where: { id },
      data: {
        ...data,
        photo: photoUrl ? photoUrl : data.photo,
      },
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

    if (deletedEmployee.photo) {
      const key = deletedEmployee.photo.split('/').pop();
      await this.s3Service.deleteFile(key);
    }

    return {
      statusCode: 200,
      message: 'Employee deleted successfully',
      data: deletedEmployee,
    };
  }
}
