import { Module } from '@nestjs/common';
import { VendaController } from './venda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendaEntity } from './venda.entity'
import { VendaService } from './venda.service';
import { VendasProdutosEntity } from './vendas-produtos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VendaEntity, VendasProdutosEntity])],
  controllers: [VendaController],
  providers: [VendaService],
})
export class VendaModule {}
