import { Nodo } from "./Nodo"
import { TYPES } from "./Nodo"
import { Operation } from "./Operation"

export class Instruccion implements Nodo {

    log: string
    tipo: number
    hijos:Array<Nodo>
    operation:Operation

    constructor(){
        this.log = ''
        this.hijos = new Array<Nodo>()
    }

    add(n: Nodo): void {
        this.hijos.push(n)
    }    
    execute(): any {
        this.operation = new Operation()
        let exp, exp2: any
        let i: number = 0

        switch(this.getType()){

            case TYPES.ADD:
                exp = this.hijos[0].execute()
                exp2 = this.hijos[1].execute()
                
            return this.operation.ADD(exp,exp2)

            case TYPES.PRINT:
                
                while(i < this.hijos.length){
                    exp = this.getChild(i++).execute()
                    if(exp.getType() == TYPES.ERROR)
                        return exp
                    console.log(exp.getValue())
                }
            return null
        
            case TYPES.SCOPE:
                
                while(i < this.hijos.length){
                    exp = this.getChild(i++).execute()
                    if(exp != null)
                        if(exp.getType() == TYPES.ERROR)
                            //ADD exp to SYM_TABLE Array<Node_types_error>
                            break
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
