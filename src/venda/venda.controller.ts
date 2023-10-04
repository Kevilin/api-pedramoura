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

    const vendaCadastrada = this.vendaService.criaVenda(venda);

    return {
      mensagem: 'venda cadastrada com sucesso',
    };
  }

  @Get('/listar')
  async listaTodos() {
    return this.vendaService.listaVendas();
  }

}
