import { Nodo } from "./Nodo"
import { TYPES } from "./Nodo"

export class Instruccion implements Nodo {

    log: string
    tipo: number
    hijos:Array<Nodo>

    constructor(){
        this.log = ''
        this.hijos = new Array<Nodo>()
    }

    add(n: Nodo): void {
        this.hijos.push(n)
    }    
    execute(): any {

        let exp: any

        switch(this.getType()){
        
            case TYPES.SCOPE:
                let i: number = 0
                while(i < this.hijos.length){
                    exp = this.getChild(i++).execute()
                }
            return null

            default:
                return 'ERR>> Nodo no definido'
        }
    }
    getChild(i: number): Nodo {
        if(i<this.hijos.length)
			return this.hijos[i]
		else
			return null;
    }
    getSize(): number {
        return this.hijos.length
    }
    value(lex: any): void {
        throw new Error("Not supported Method")
    }
    type(c: number): void {
        this.tipo = c
    }
    getValue(): any {
        return null
    }
    getType(): number {
        return this.tipo
    }
}
