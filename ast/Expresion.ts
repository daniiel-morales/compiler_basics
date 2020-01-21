import { Nodo } from "./Nodo"

export class Expresion implements Nodo {
    
    valor: any
    tipo: number

    constructor(v:any, t:number){
        this.valor = v
        this.tipo = t
    }

    add(n: Nodo): void {
        throw new Error("Not supported Method")
    }
    execute(): any {
        return this
    }
    getChild(i: number): Nodo {
        throw new Error("Not supported Method")
    }
    getSize(): number {
        return 0
    }
    value(lex: any): void {
        this.valor = lex
    }
    type(c: number): void {
        this.tipo = c
    }
    getValue(): any {
        return this.valor
    }
    getType(): number {
        return this.tipo
    }
}
