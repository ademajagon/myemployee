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
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.createAddress(createAddressDto);
  }

  @Get()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.addressService.getAddresses();
  }

  @Get(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    const addressId = parseInt(id, 10);
    if (isNaN(addressId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.addressService.getAddressById(addressId);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    const addressId = parseInt(id, 10);
    if (isNaN(addressId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.addressService.updateAddress(addressId, updateAddressDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    const addressId = parseInt(id, 10);
    if (isNaN(addressId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.addressService.deleteAddress(addressId);
  }
}
