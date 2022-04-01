import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PurchasesModule } from './modules/purchases/purchases.module';
import { ProductsController } from './products.controller';
import { SessionsController } from './sessions.controller';
import { AuthModule } from './shared/providers/auth-module.provider';
import { ProductsModule } from './shared/providers/products-module.provider';

@Module({
  imports: [PurchasesModule, AuthModule, ProductsModule],
  controllers: [AppController, SessionsController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
