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

  async listaProdutos() {
    const produtosSalvos = await this.produtoRepository.find();
    const produtosLista = produtosSalvos.map(
      (produto) => new ListaProdutoDTO(produto.id, produto.nome, produto.valor, produto.createdAt, produto.updatedAt),
    );
    return produtosLista;
  }

  async getValorProduto(idProduto) {
    try {
      const valor = await this.produtoRepository.findOneBy(idProduto);
      return valor;
    } catch (error) {
      return error;
    }
  }

  async atualizaProduto(id: string, novosDados) {
    const entityName = await this.produtoRepository.findOneBy({ id });
    Object.assign(entityName, novosDados);
    await this.produtoRepository.save(entityName);
  }

  async deletaProduto(id: string) {
    await this.produtoRepository.delete(id);
  }
}
