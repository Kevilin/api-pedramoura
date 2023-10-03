export class ListaProdutoDTO {
  constructor(
    readonly id: string, 
    readonly nome: string,
    readonly valor: string,
    readonly created_at: string,
    readonly updated_at: string,
    ) 
    {}
}