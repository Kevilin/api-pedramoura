import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaVendaDTO } from './dto/ListaVenda.dto';
import { VendaEntity } from './venda.entity';
import { Repository } from 'typeorm';
import { VendasProdutosEntity } from './vendas-produtos.entity';

@Injectable()
export class VendaService {
  constructor(
    @InjectRepository(VendaEntity)
    private readonly vendaRepository: Repository<VendaEntity>,
    
    @InjectRepository(VendasProdutosEntity)
    private readonly vendasProdutosRepository: Repository<VendasProdutosEntity>,
  ) {}

  async criaVenda(vendaEntity: VendaEntity) {
    const vendaCriada = await this.vendaRepository.save(vendaEntity);
    return vendaCriada;
  }

  async criaVendasProdutos(vendasProdutosEntity: VendasProdutosEntity) {
    await this.vendasProdutosRepository.save(vendasProdutosEntity);
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
