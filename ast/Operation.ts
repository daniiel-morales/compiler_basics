import { Nodo } from "./Nodo"
import { Expresion } from "./Expresion"
import { TYPES } from "./Nodo"
import { sym_table } from "../analisis/sym_table"
import { sym } from "../analisis/sym"

export class Operation {
    
    ADD(exp: Nodo, exp2: Nodo):any{
        if (exp == null || exp2 == null || exp.getType() == TYPES.NULL || exp2.getType() == TYPES.NULL)
            exp = null
        else if ((exp.getType() == TYPES.STRING || exp2.getType() == TYPES.STRING))
            exp = new Expresion(exp.getValue()+''+exp2.getValue(), TYPES.STRING) 
        else if((exp.getType() == TYPES.NUM && exp2.getType() == TYPES.NUM))
            exp = new Expresion(exp.getValue()+exp2.getValue(), TYPES.NUM)
        else
            //ERROR SUMA
            exp = new Expresion('ADD>> Error al operar <'+exp.getValue()+'> + <'+exp2.getValue()+'>', TYPES.ERROR)
        return exp
    }

    DECLARE(hijos:Array<Nodo>, tabla_simbolos:sym_table):any{

        let exp: any
        let i: number = 0
        let ins: sym

        //check if instance not exists
        ins = hijos[0].execute(tabla_simbolos)
        if(ins == null){
            //get value for the new instance
            exp = hijos[1].execute(tabla_simbolos).getValue()
            //get type for the new instance
            //need to fix if type doesnot exists and need to add that type
            i = hijos[2].getType()

            ins = new sym(hijos[0].getValue(), exp, i, false)
            tabla_simbolos.addSym(ins)

            return null
        }
        return new Expresion('DECLARAR>> Ya existe la variable <'+ins.getID()+'>', TYPES.ERROR)
    }

    IF(hijos:Array<Nodo>, tabla_simbolos:sym_table):any{

        let exp: any, exp2: any
        let i: number = 0

        //execute IFnode condition
        exp = hijos[0].execute(tabla_simbolos)
        exp2 = null;

        if (exp.getType() == TYPES.BOOLEAN) {
            if (exp.getValue()) {
                exp = hijos[1].execute(tabla_simbolos)
                if(exp != null)
                    return exp
                return new Expresion("", TYPES.BREAK)
            } else {
                i = 2
                while (i < hijos.length){
                    //execute else-if
                    exp2 = hijos[i++].execute(tabla_simbolos)
                    
                    if(exp2 != null){
                        //one of all if-else enter successfully
                        //just verify if it has RETURNnode value
                        if(exp2.getType() == TYPES.BREAK)
                            return null
                        return exp2
                    }
                }
                //finish IF-ELSEnode execution
                return null
            }
        } else
            return new Expresion('IF>> condicion <' + exp.getValue() + '> no booleana', TYPES.ERROR)
    }

    ELSE(exp: Expresion):any{
        //returns RETURN value
        if (exp != null)
            return exp
        
        return new Expresion('', TYPES.BREAK)
    }

}