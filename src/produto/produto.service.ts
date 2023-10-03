import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaProdutoDTO } from './dto/ListaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(produtoEntity: ProdutoEntity) {
    await this.produtoRepository.save(produtoEntity);
  }

  async listProdutos() {
    const produtosSalvos = await this.produtoRepository.find();
    const produtosLista = produtosSalvos.map(
      (produto) => new ListaProdutoDTO(produto.id, produto.nome),
    );
    return produtosLista;
  }
}
