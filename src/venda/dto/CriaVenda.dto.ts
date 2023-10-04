import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CriaVendaDTO {
  @IsNotEmpty({ message: ''})
  idProduto: number;

  @IsNotEmpty({ message: ''})
  dataVenda: Date;

  @IsNotEmpty({ message: ''})
  valorVenda: number;

  @IsNotEmpty({ message: ''})
  vendedor: string;

  @IsNotEmpty({ message: ''})
  cliente: string;

  @IsNotEmpty({ message: ''})
  observacao: string;

  @IsNotEmpty({ message: ''})
  produtosVendas: string;
}