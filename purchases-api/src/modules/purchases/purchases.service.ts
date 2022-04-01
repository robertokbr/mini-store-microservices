import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthServiceContract } from 'src/shared/contracts/auth-service.contract';
import { ProductsServiceContract } from 'src/shared/contracts/products-service.contract';
import { promisify } from '../../shared/utils/observable.util';
import { CreatePurchaseDto } from './dtos/create-purchase.dto';
import { PurchaseDto } from './dtos/purchase.dto';

@Injectable()
export class PurchasesService implements OnModuleInit {
  private purchasesRepository: PurchaseDto[] = [];
  private authService: AuthServiceContract;
  private productsService: ProductsServiceContract;

  constructor(
    @Inject('AuthModule')
    private readonly authClient: ClientGrpc,
    @Inject('ProductsModule')
    private readonly productsClient: ClientGrpc,
  ) {}

  // Extracting the services from  the modules
  onModuleInit() {
    this.authService = promisify(this.authClient.getService('AuthService'));
    this.productsService = promisify(
      this.productsClient.getService('ProductsService'),
    );
  }

  async create(
    createPurchaseDto: CreatePurchaseDto,
    jwt: string,
  ): Promise<PurchaseDto> {
    if (createPurchaseDto.productAmount <= 0) {
      throw new BadRequestException('Invalid amount');
    }

    const { user } = await this.authService.getSessionPayload({ jwt });

    const { products } = await this.productsService.listProducts({});

    const { amount, ...product } = products.find(
      (p) => p.id === createPurchaseDto.productId,
    );

    if (!product) {
      throw new NotFoundException('Invalid product id');
    }

    if (amount < createPurchaseDto.productAmount) {
      throw new BadRequestException('Not enough amount to process the request');
    }

    const purchase = {
      id: `${this.purchasesRepository.length}`,
      state: 'inProgress',
      amount: createPurchaseDto.productAmount,
      user,
      product,
    };

    this.purchasesRepository.push(purchase);

    await this.productsService.updateProduct({
      id: product.id,
      data: { amount: createPurchaseDto.productAmount },
    });

    return purchase;
  }

  async findAll(): Promise<PurchaseDto[]> {
    return this.purchasesRepository;
  }
}
