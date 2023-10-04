import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity({ name: 'vendas_produtos' })
export class VendasProdutosEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({name: 'idVenda', nullable: false})
    idVenda: number;

    @Column({name: 'idProduto', nullable: false})
    idProduto: number;

    @Column({name: 'quantidade', nullable: false})
    quantidade: number;
}