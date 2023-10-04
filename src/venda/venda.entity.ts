import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity({ name: 'vendas' })
export class VendaEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({name: 'qtdVendida', nullable: false})
    qtdVendida: number;

    @Column({name: 'dataVenda', nullable: false})
    dataVenda: Date;

    @Column({name: 'valorVenda', nullable: false, type: 'decimal'})
    valorVenda: number;

    @Column({name: 'vendedor', nullable: false})
    vendedor: string;

    @Column({name: 'cliente', nullable: false})
    cliente: string;

    @Column({name: 'observacao', nullable: true})
    observacao: string;
}