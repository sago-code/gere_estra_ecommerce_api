import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePagoDto } from '../modules/pago.dto.js';
import { PagoFacturaService } from '../services/pago-factura.service.js';

@Controller('pagos')
export class PagoFacturaController {
  constructor(private readonly service: PagoFacturaService) {}

  @Get()
  findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
  ) {
    return this.service.findAll(limit ?? 50, offset ?? 0);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreatePagoDto) {
    return this.service.create(dto);
  }
}
