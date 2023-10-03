import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ProdutoEntity } from 'src/produto/produto.entity';

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      // Somente para teste
      type: 'mysql',
      host: 'mysql.kmr.dev.br',
      port: 3306,
      username: 'kmr02',
      password: 'pos123',
      database: 'kmr02',
      entities: [ProdutoEntity],
      synchronize: true,
    };
  }
}