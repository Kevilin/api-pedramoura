import {Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({name: 'nome', length: 100, nullable: false})
    nome: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
}