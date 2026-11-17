import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaEntity } from '../repository/entities/categoria.entity.js';
import { ClienteEntity } from '../repository/entities/cliente.entity.js';
import { EstadoPedidoEntity } from '../repository/entities/estado-pedido.entity.js';
import { MetodoPagoEntity } from '../repository/entities/metodo-pago.entity.js';
import { ProductoEntity } from '../repository/entities/producto.entity.js';

@Injectable()
export class CatalogosService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRepo: Repository<ProductoEntity>,
    @InjectRepository(CategoriaEntity)
    private readonly categoriaRepo: Repository<CategoriaEntity>,
    @InjectRepository(EstadoPedidoEntity)
    private readonly estadoRepo: Repository<EstadoPedidoEntity>,
    @InjectRepository(MetodoPagoEntity)
    private readonly metodoRepo: Repository<MetodoPagoEntity>,
    @InjectRepository(ClienteEntity)
    private readonly clienteRepo: Repository<ClienteEntity>,
  ) {}

  async getProductos(limit = 100, offset = 0) {
    const [items, total] = await this.productoRepo.findAndCount({
      relations: { categoria: true },
      order: { id: 'ASC' },
      take: limit,
      skip: offset,
    });
    return { items, total, limit, offset };
  }

  async getCategorias() {
    return this.categoriaRepo.find({ order: { nombre: 'ASC' } });
  }

  async getEstadosPedido() {
    return this.estadoRepo.find({ order: { id: 'ASC' } });
  }

  async getMetodosPago() {
    return this.metodoRepo.find({ order: { id: 'ASC' } });
  }

  async getClientes(limit = 100, offset = 0) {
    const [items, total] = await this.clienteRepo.findAndCount({
      relations: { usuario: { ciudad: true, rol: true } },
      order: { id: 'ASC' },
      take: limit,
      skip: offset,
    });
    return { items, total, limit, offset };
  }
}
