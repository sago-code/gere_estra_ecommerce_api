import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePagoDto } from '../modules/pago.dto.js';
import { ClienteEntity } from '../repository/entities/cliente.entity.js';
import { MetodoPagoEntity } from '../repository/entities/metodo-pago.entity.js';
import { PagoFacturaEntity } from '../repository/entities/pago-factura.entity.js';

@Injectable()
export class PagoFacturaService {
  constructor(
    @InjectRepository(PagoFacturaEntity)
    private readonly repo: Repository<PagoFacturaEntity>,
    @InjectRepository(ClienteEntity)
    private readonly clienteRepo: Repository<ClienteEntity>,
    @InjectRepository(MetodoPagoEntity)
    private readonly metodoRepo: Repository<MetodoPagoEntity>,
  ) {}

  async findAll(limit = 50, offset = 0) {
    const [items, total] = await this.repo.findAndCount({
      relations: { cliente: { usuario: true }, metodo_pago: true },
      order: { created_at: 'DESC' },
      take: limit,
      skip: offset,
    });
    return { items, total, limit, offset };
  }

  async findOne(id: number) {
    const pago = await this.repo.findOne({
      where: { id },
      relations: { cliente: { usuario: true }, metodo_pago: true },
    });
    if (!pago) {
      throw new NotFoundException(`Pago ${id} no encontrado`);
    }
    return pago;
  }

  async create(dto: CreatePagoDto) {
    const cliente = await this.clienteRepo.findOne({
      where: { id: dto.cliente_id },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente ${dto.cliente_id} no encontrado`);
    }

    const metodo = await this.metodoRepo.findOne({
      where: { id: dto.metodo_pago_id },
    });
    if (!metodo) {
      throw new NotFoundException(
        `Método de pago ${dto.metodo_pago_id} no encontrado`,
      );
    }

    const pago = this.repo.create({
      fecha_pago: new Date(dto.fecha_pago),
      valor_pago: dto.valor_pago,
      cliente,
      metodo_pago: metodo,
    });

    return this.repo.save(pago);
  }
}
