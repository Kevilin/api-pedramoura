import { Module } from '@nestjs/common';
import { VendaController } from './venda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendaEntity } from './venda.entity'
import { VendaService } from './venda.service';

@Module({
  imports: [TypeOrmModule.forFeature([VendaEntity])],
  controllers: [VendaController],
  providers: [VendaService],
})
export class VendaModule {}
