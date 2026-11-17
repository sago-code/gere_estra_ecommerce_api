import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePedidoDto, UpdatePedidoDto } from '../modules/pedido.dto.js';
import { ClienteEntity } from '../repository/entities/cliente.entity.js';
import { EstadoPedidoEntity } from '../repository/entities/estado-pedido.entity.js';
import { PagoFacturaEntity } from '../repository/entities/pago-factura.entity.js';
import { PedidoEntity } from '../repository/entities/pedido.entity.js';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepo: Repository<PedidoEntity>,
    @InjectRepository(ClienteEntity)
    private readonly clienteRepo: Repository<ClienteEntity>,
    @InjectRepository(EstadoPedidoEntity)
    private readonly estadoRepo: Repository<EstadoPedidoEntity>,
    @InjectRepository(PagoFacturaEntity)
    private readonly pagoRepo: Repository<PagoFacturaEntity>,
  ) {}

  async findAll(limit = 50, offset = 0) {
    const [items, total] = await this.pedidoRepo.findAndCount({
      relations: {
        cliente: { usuario: true },
        estado_pedido: true,
        pago: { metodo_pago: true },
      },
      order: { created_at: 'DESC' },
      take: limit,
      skip: offset,
    });
    return { items, total, limit, offset };
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepo.findOne({
      where: { id },
      relations: {
        cliente: { usuario: true },
        estado_pedido: true,
        pago: { metodo_pago: true },
      },
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido ${id} no encontrado`);
    }
    return pedido;
  }

  async create(dto: CreatePedidoDto) {
    const cliente = await this.clienteRepo.findOne({
      where: { id: dto.cliente_id },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente ${dto.cliente_id} no encontrado`);
    }

    const estado = await this.estadoRepo.findOne({
      where: { id: dto.estado_pedido_id },
    });
    if (!estado) {
      throw new NotFoundException(
        `Estado de pedido ${dto.estado_pedido_id} no encontrado`,
      );
    }

    let pago = null;
    if (dto.pago_id) {
      pago = await this.pagoRepo.findOne({ where: { id: dto.pago_id } });
      if (!pago) {
        throw new NotFoundException(`Pago ${dto.pago_id} no encontrado`);
      }
    }

    const pedido = this.pedidoRepo.create({
      cliente,
      estado_pedido: estado,
      esta_pagado: dto.esta_pagado,
      pago,
      fecha_entrega_estimada: new Date(dto.fecha_entrega_estimada),
      fecha_entrega_real: dto.fecha_entrega_real
        ? new Date(dto.fecha_entrega_real)
        : null,
    });

    return this.pedidoRepo.save(pedido);
  }

  async update(id: number, dto: UpdatePedidoDto) {
    const pedido = await this.findOne(id);

    if (dto.estado_pedido_id !== undefined) {
      const estado = await this.estadoRepo.findOne({
        where: { id: dto.estado_pedido_id },
      });
      if (!estado) {
        throw new NotFoundException(
          `Estado de pedido ${dto.estado_pedido_id} no encontrado`,
        );
      }
      pedido.estado_pedido = estado;
    }

    if (dto.esta_pagado !== undefined) {
      pedido.esta_pagado = dto.esta_pagado;
    }

    if (dto.pago_id !== undefined) {
      if (dto.pago_id === null) {
        pedido.pago = null;
      } else {
        const pago = await this.pagoRepo.findOne({ where: { id: dto.pago_id } });
        if (!pago) {
          throw new NotFoundException(`Pago ${dto.pago_id} no encontrado`);
        }
        pedido.pago = pago;
      }
    }

    if (dto.fecha_entrega_estimada !== undefined) {
      pedido.fecha_entrega_estimada = new Date(dto.fecha_entrega_estimada);
    }

    if (dto.fecha_entrega_real !== undefined) {
      pedido.fecha_entrega_real = dto.fecha_entrega_real
        ? new Date(dto.fecha_entrega_real)
        : null;
    }

    return this.pedidoRepo.save(pedido);
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);
    await this.pedidoRepo.softRemove(pedido);
    return { message: `Pedido ${id} eliminado` };
  }
}
