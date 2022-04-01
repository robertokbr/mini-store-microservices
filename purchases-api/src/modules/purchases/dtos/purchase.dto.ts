import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from 'src/shared/dtos/product.dto';
import { UserDto } from 'src/shared/dtos/user.dto';

export class PurchaseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  state = 'inProgrees';

  @ApiProperty()
  amount: number;

  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  product: Omit<ProductDto, 'amount'>;
}
