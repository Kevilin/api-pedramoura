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

  @Put('/atualizar/:id')
  async atualizaVenda(
    @Param('id') id: string,
    @Body() dadosProduto,
  ) {
    const produtoAlterado = await this.vendaService.atualizaVenda(
      id,
      dadosProduto,
    );

    return {
      mensagem: `venda ${id} atualizada com sucesso`,
      produto: produtoAlterado,
    };
  }

  @Delete('/deletar/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.vendaService.deletaVenda(id);

    return {
      mensagem: `venda ${id} removida com sucesso`,
      produto: produtoRemovido,
    };
  }
}
