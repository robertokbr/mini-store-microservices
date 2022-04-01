import { ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  productAmount: number;
}
