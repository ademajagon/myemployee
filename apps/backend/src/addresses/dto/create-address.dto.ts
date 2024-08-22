import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;
}
