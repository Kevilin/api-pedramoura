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
      mensagem: 'produto cadastrado com sucesso',
      produto: produto.nome,
    };
  }

  @Get('/listar')
  async listaTodos() {
    return this.produtoService.listProdutos();
  }

}
