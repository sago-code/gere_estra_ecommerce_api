import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoPedidoDto } from '../modules/producto-pedido.dto.js';
import { PedidoEntity } from '../repository/entities/pedido.entity.js';
import { ProductoEntity } from '../repository/entities/producto.entity.js';
import { ProductoPedidoEntity } from '../repository/entities/producto-pedido.entity.js';

@Injectable()
export class ProductoPedidoService {
  constructor(
    @InjectRepository(ProductoPedidoEntity)
    private readonly repo: Repository<ProductoPedidoEntity>,
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepo: Repository<PedidoEntity>,
    @InjectRepository(ProductoEntity)
    private readonly productoRepo: Repository<ProductoEntity>,
  ) {}

  async findByPedido(pedidoId: number) {
    return this.repo.find({
      where: { pedido: { id: pedidoId } },
      relations: { producto: { categoria: true } },
      order: { id: 'ASC' },
    });
  }

  async create(dto: CreateProductoPedidoDto) {
    const pedido = await this.pedidoRepo.findOne({
      where: { id: dto.pedido_id },
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido ${dto.pedido_id} no encontrado`);
    }

    const producto = await this.productoRepo.findOne({
      where: { id: dto.producto_id },
    });
    if (!producto) {
      throw new NotFoundException(`Producto ${dto.producto_id} no encontrado`);
    }

    const item = this.repo.create({
      pedido,
      producto,
      cantidad: dto.cantidad,
      precio_unitario: dto.precio_unitario,
    });

    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`ProductoPedido ${id} no encontrado`);
    }
    await this.repo.softRemove(item);
    return { message: `ProductoPedido ${id} eliminado` };
  }
}
