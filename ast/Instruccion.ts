import { Nodo } from "./Nodo"
import { TYPES } from "./Nodo"
import { Operation } from "./Operation"
import { sym } from "../analisis/sym"
import { Expresion } from "./Expresion"

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

    execute(tabla_simbolos: import("../analisis/sym_table").sym_table): any {

        let operation:Operation
        operation = new Operation()
 
        let exp: any, exp2: any
        let i: number = 0
        let ins: sym

        switch(this.getType()){

            case TYPES.IF:
                
            return operation.IF(this.hijos, tabla_simbolos)
                    
            case TYPES.ELSE:
                //execute ELSEnode statements 
                exp = this.hijos[0].execute(tabla_simbolos)
            return operation.ELSE(exp)

            case TYPES.DECLARE:

            return operation.DECLARE(this.hijos, tabla_simbolos)

            case TYPES.ADD:
                exp = this.hijos[0].execute(tabla_simbolos)
                exp2 = this.hijos[1].execute(tabla_simbolos)
                
            return operation.ADD(exp, exp2)

            case TYPES.PRINT:
                
                while(i < this.hijos.length){
                    exp = this.hijos[i++].execute(tabla_simbolos)
                    if(exp.getType() == TYPES.ERROR)
                        return exp
                    console.log(exp.getValue())
                }
            return null
        
            case TYPES.SCOPE:
                
                while(i < this.hijos.length){
                    exp = this.hijos[i++].execute(tabla_simbolos)
                    if(exp != null)
                        if(exp.getType() == TYPES.ERROR)
                            //ADD exp to SYM_TABLE Array<Node_types_error>
                            break
                }
            return null

            default:
                return new Expresion('ERR>> Nodo no definido', TYPES.ERROR)
        }
    }
    getSize(): number {
        return this.hijos.length
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
