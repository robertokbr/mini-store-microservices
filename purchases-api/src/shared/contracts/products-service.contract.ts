import { ProductDto } from '../dtos/product.dto';

type ListProductsResponse = {
  products: ProductDto[];
};

type UpdateProductData = {
  amount: number;
};

type UpdateProductRequest = {
  id: string;
  data: UpdateProductData;
};

type UdateProductResponse = {
  product: ProductDto;
};

export interface ProductsServiceContract {
  listProducts({}): Promise<ListProductsResponse>;
  updateProduct(data: UpdateProductRequest): Promise<UdateProductResponse>;
}
