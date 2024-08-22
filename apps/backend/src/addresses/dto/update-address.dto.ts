import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsInt()
  employeeId?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  street?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  state?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  postalCode?: string;
}
