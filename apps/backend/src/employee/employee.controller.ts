import 'multer';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  BadRequestException,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.employeeService.createEmployee(createEmployeeDto, file);
  }

  @Get()
  findAll() {
    return this.employeeService.getEmployees();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const employeeId = parseInt(id, 10);
    if (isNaN(employeeId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.employeeService.getEmployeeById(employeeId);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('photo'))
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const employeeId = parseInt(id, 10);
    if (isNaN(employeeId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.employeeService.updateEmployee(
      employeeId,
      updateEmployeeDto,
      file
    );
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    const employeeId = parseInt(id, 10);
    if (isNaN(employeeId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.employeeService.deleteEmployee(employeeId);
  }
}
