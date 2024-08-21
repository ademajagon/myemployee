import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from '../employee/employee.module';
import { AddressModule } from '../addresses/address.module';

@Module({
  imports: [EmployeeModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
