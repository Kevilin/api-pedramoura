import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { VendaEntity } from './venda.entity';
import { CriaVendaDTO } from './dto/CriaVenda.dto';
import { VendaService } from './venda.service';
import { VendasProdutosEntity } from './vendas-produtos.entity';

@Controller('vendas')
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  @Post('/criar')
  async criaNovo(@Body() dadosVenda: CriaVendaDTO) {
    try {
      const venda = new VendaEntity();

      venda.dataVenda = dadosVenda.dataVenda;
      venda.valorVenda = dadosVenda.valorVenda;
      venda.vendedor = dadosVenda.vendedor;
      venda.cliente = dadosVenda.cliente;
      venda.observacao = dadosVenda.observacao;

      const vendaCadastrada = await this.vendaService.criaVenda(venda); //vendas

      let idVenda = parseInt(vendaCadastrada.id);

      const jsonString = JSON.stringify(dadosVenda.produtosVendas);
      const array = JSON.parse(jsonString);

      array.map((produtovenda) => {
        var vendasProdutos = new VendasProdutosEntity();
        vendasProdutos.idProduto = produtovenda.idProduto;
        vendasProdutos.quantidade = produtovenda.quantidade;
        vendasProdutos.idVenda = idVenda;

        this.vendaService.criaVendasProdutos(vendasProdutos);
      });

      return {
        mensagem: `venda ${idVenda} cadastrada com sucesso`,
      };
    } catch (error) {
      return error;
    }
  }

  @Get('/listar')
  async listaTodos() {
    return this.vendaService.listaVendas();
  }
}
