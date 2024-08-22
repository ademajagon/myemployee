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
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(createEmployeeDto);
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
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    const employeeId = parseInt(id, 10);
    if (isNaN(employeeId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.employeeService.updateEmployee(employeeId, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const employeeId = parseInt(id, 10);
    if (isNaN(employeeId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.employeeService.deleteEmployee(employeeId);
  }
}
