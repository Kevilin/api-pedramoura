import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConfigService } from './config/mysql.config.service';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    ProdutoModule,
    TypeOrmModule.forRootAsync({
      useClass: MysqlConfigService,
      inject: [MysqlConfigService],
    }),
  ],
})

export class AppModule {}