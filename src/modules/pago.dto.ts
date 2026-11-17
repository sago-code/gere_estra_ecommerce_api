import { IsDateString, IsInt, IsNumber, Min } from 'class-validator';

export class CreatePagoDto {
  @IsDateString()
  fecha_pago: string;

  @IsNumber()
  @Min(0)
  valor_pago: number;

  @IsInt()
  cliente_id: number;

  @IsInt()
  metodo_pago_id: number;
}
