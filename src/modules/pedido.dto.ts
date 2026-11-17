import { IsBoolean, IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreatePedidoDto {
  @IsInt()
  cliente_id: number;

  @IsInt()
  estado_pedido_id: number;

  @IsBoolean()
  esta_pagado: boolean;

  @IsOptional()
  @IsInt()
  pago_id?: number;

  @IsDateString()
  fecha_entrega_estimada: string;

  @IsOptional()
  @IsDateString()
  fecha_entrega_real?: string;
}

export class UpdatePedidoDto {
  @IsOptional()
  @IsInt()
  estado_pedido_id?: number;

  @IsOptional()
  @IsBoolean()
  esta_pagado?: boolean;

  @IsOptional()
  @IsInt()
  pago_id?: number;

  @IsOptional()
  @IsDateString()
  fecha_entrega_estimada?: string;

  @IsOptional()
  @IsDateString()
  fecha_entrega_real?: string;
}
