import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.createAddress(createAddressDto);
  }

  @Get()
  findAll() {
    return this.addressService.getAddresses();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const addressId = parseInt(id, 10);
    if (isNaN(addressId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.addressService.getAddressById(addressId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    const addressId = parseInt(id, 10);
    if (isNaN(addressId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.addressService.updateAddress(addressId, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const addressId = parseInt(id, 10);
    if (isNaN(addressId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.addressService.deleteAddress(addressId);
  }
}
