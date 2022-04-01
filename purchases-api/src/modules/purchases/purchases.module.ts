import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared/providers/auth-module.provider';
import { ProductsModule } from 'src/shared/providers/products-module.provider';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesService],
  imports: [AuthModule, ProductsModule],
})
export class PurchasesModule {}
