import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { VendaEntity } from './venda.entity';
import { CriaVendaDTO } from './dto/CriaVenda.dto';
import { VendaService } from './venda.service';
import { VendasProdutosEntity } from './vendas-produtos.entity';
import { log } from 'console';

@Controller('vendas')
export class VendaController {
  constructor(
    private readonly vendaService: VendaService,
  ) {}

  @Post('/criar')
  async criaNovo(@Body() dadosVenda: CriaVendaDTO) {
    const venda = new VendaEntity();

    venda.qtdVendida = dadosVenda.qtdVendida;
    venda.dataVenda = dadosVenda.dataVenda;
    venda.valorVenda = dadosVenda.valorVenda;
    venda.vendedor = dadosVenda.vendedor;
    venda.cliente = dadosVenda.cliente;
    venda.observacao = dadosVenda.observacao;

    const vendaCadastrada = await this.vendaService.criaVenda(venda); //vendas

    let idVenda = parseInt(vendaCadastrada.id)

    const vendasProdutos = new VendasProdutosEntity();

    vendasProdutos.idVenda =  idVenda;
    vendasProdutos.idProduto = dadosVenda.idProduto;
    vendasProdutos.quantidade = dadosVenda.qtdVendida;

    this.vendaService.criaVendasProdutos(vendasProdutos); //vendas-produtos

    return {
      mensagem: 'venda cadastrada com sucesso',
    };
  }
  
  @Get('/listar')
  async listaTodos() {
    return this.vendaService.listaVendas();
  }

}
