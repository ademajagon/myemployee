import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: any) {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeeService.getEmployees();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.employeeService.getEmployeeById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateEmployeeDto: any) {
    return this.employeeService.updateEmployee(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.employeeService.deleteEmployee(id);
  }
}
