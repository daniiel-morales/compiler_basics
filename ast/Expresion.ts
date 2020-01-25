import { Nodo, TYPES } from "./Nodo"

export class Expresion implements Nodo {
    
    valor: any
    tipo: number

    constructor(v:any, t:number){
        this.valor = v
        this.tipo = t
    }
    add(lex: any): void {
        this.valor = lex
    }
    execute(t: import("../analisis/sym_table").sym_table): any {
        if(this.tipo == TYPES.ID){
            let exp: import("../analisis/sym").sym
            exp = t.getSym(this.valor)
            if(exp !=null){
                return new Expresion(exp.getValue(), exp.getType())
            }
            return null
        }
        return this
    }
    getSize(): number {
        return 0
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
