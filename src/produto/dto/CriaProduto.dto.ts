import {
  ArrayMinSize,
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID
} from 'class-validator';
import { Decimal128 } from 'typeorm';


export class CriaProdutoDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
  nome: string;

  @IsDecimal()
  @IsNotEmpty({ message: 'Produto precisa ter um valor' , })
  valor: string;
}
