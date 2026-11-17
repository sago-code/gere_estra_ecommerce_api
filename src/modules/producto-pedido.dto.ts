import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateProductoPedidoDto {
  @IsInt()
  producto_id: number;

  @IsInt()
  pedido_id: number;

  @IsInt()
  @Min(1)
  cantidad: number;

  @IsNumber()
  precio_unitario: number;
}
