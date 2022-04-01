import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAuth } from 'src/shared/decorators/get-auth.decorator';
import { CreatePurchaseDto } from './dtos/create-purchase.dto';
import { PurchaseDto } from './dtos/purchase.dto';
import { PurchasesService } from './purchases.service';

@ApiTags('purchases')
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchaseService: PurchasesService) {}

  @ApiBearerAuth()
  @Post()
  async create(
    @Body() createPurchaseDto: CreatePurchaseDto,
    @GetAuth() jwt: string,
  ): Promise<PurchaseDto> {
    return this.purchaseService.create(createPurchaseDto, jwt);
  }

  @Get()
  async findAll(): Promise<PurchaseDto[]> {
    return this.purchaseService.findAll();
  }
}
