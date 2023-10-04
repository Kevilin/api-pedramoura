import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ProdutoEntity } from './produto.entity';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoService } from './produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(
    private readonly produtoService: ProdutoService,
  ) {}

  @Post('/criar')
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    const produto = new ProdutoEntity();

    produto.nome = dadosProduto.nome;
    produto.valor = dadosProduto.valor;

    const produtoCadastrado = this.produtoService.criaProduto(produto);

    return {
      mensagem: `Produto ${produto.nome} cadastrado com sucesso`,
    };
  }

  @Get('/listar')
  async listaTodos() {
    return this.produtoService.listaProdutos();
  }

  @Put('/atualizar/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto,
  ) {
    const produtoAlterado = await this.produtoService.atualizaProduto(
      id,
      dadosProduto,
    );

    return {
      mensagem: `produto ${id} atualizado com sucesso`,
      produto: produtoAlterado,
    };
  }

  @Delete('/deletar/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoService.deletaProduto(id);

    return {
      mensagem: `produto ${id} removido com sucesso`,
      produto: produtoRemovido,
    };
  }
}
