import { Nodo } from "./Nodo"
import { Expresion } from "./Expresion"
import { TYPES } from "./Nodo"

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
}