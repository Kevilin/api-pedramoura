import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaVendaDTO } from './dto/ListaVenda.dto';
import { VendaEntity } from './venda.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VendaService {
  constructor(
    @InjectRepository(VendaEntity)
    private readonly vendaRepository: Repository<VendaEntity>,
  ) {}

  async criaVenda(vendaEntity: VendaEntity) {
    await this.vendaRepository.save(vendaEntity);
  }

  async criaVendasProdutos(vendasProdutosEntity: VendasProdutosEntity) {
    await this.vendaRepository.save(vendasProdutosEntity);
  }

  async listaVendas() {
    try {
      const vendasSalvas = await this.vendaRepository.find();
    } catch (error) {
      return error;
    }
    const vendasSalvas = await this.vendaRepository.find();
    const vendasLista = vendasSalvas.map(
      (venda) => new ListaVendaDTO(venda.id, venda.qtdVendida,venda.dataVenda,venda.valorVenda,venda.vendedor,venda.cliente,venda.observacao),
    );
    return vendasLista;
  }
}
