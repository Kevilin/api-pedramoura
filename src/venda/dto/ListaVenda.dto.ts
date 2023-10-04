export class ListaVendaDTO {
  constructor(
    readonly id: string, 
    readonly qtdVendida: number,
    readonly dataVenda: Date,
    readonly valorVenda: number,
    readonly vendedor: string,
    readonly cliente: string,
    readonly observacao: string,
    ) 
    {}
}