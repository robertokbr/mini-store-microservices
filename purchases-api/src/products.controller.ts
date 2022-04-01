import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { ProductsServiceContract } from './shared/contracts/products-service.contract';

@ApiTags('products')
@Controller('products')
export class ProductsController implements OnModuleInit {
  private productsService: ProductsServiceContract;

  constructor(
    @Inject('ProductsModule')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.productsService = this.client.getService('ProductsService');
  }

  @Get()
  async findAll() {
    return this.productsService.listProducts({});
  }
}
