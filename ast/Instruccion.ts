import { Nodo } from "./Nodo"
import { TYPES } from "./Nodo"
import { Operation } from "./Operation"
import { sym } from "../analisis/sym"
import { sym_table } from "../analisis/sym_table"
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

            case TYPES.DECLARE:
                //check if instance not exists
                ins = this.hijos[0].execute(tabla_simbolos)
                if(ins == null){
                    //get value for the new instance
                    exp = this.hijos[1].execute(tabla_simbolos).getValue()
                    //get type for the new instance
                    //need to fix if type doesnot exists and need to add that type
                    i = this.hijos[2].getType()

                    ins = new sym(this.hijos[0].getValue(), exp, i, false)
                    tabla_simbolos.addSym(ins)

                    return null
                }
            return new Expresion('DECLARAR>> Ya existe la variable <'+ins.getID()+'>', TYPES.ERROR)

            case TYPES.ADD:
                exp = this.hijos[0].execute(tabla_simbolos)
                exp2 = this.hijos[1].execute(tabla_simbolos)
                
            return operation.ADD(exp, exp2)

            case TYPES.PRINT:
                
                while(i < this.hijos.length){
                    exp = this.getChild(i++).execute(tabla_simbolos)
                    if(exp.getType() == TYPES.ERROR)
                        return exp
                    console.log(exp.getValue())
                }
            return null
        
            case TYPES.SCOPE:
                
                while(i < this.hijos.length){
                    exp = this.getChild(i++).execute(tabla_simbolos)
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
