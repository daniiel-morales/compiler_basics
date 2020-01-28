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
    
    SWITCH(hijos:Array<Nodo>, tabla_simbolos:sym_table): any{

        let exp: any, exp2: any
        let i: number = 0

        // value for match CASEnode
        exp = hijos[0].execute(tabla_simbolos);
        if (exp.getType() < 6) {
            i = 1;
            while (i < hijos.length) {
                // value for match SWITCHnode value
                exp2 = hijos[i];
                if (exp2.getType() != TYPES.DEFAULT){
                    //NO evaluate CASEnode match value
                    //it has matched in a previous CASEnode without BREAKnode
                    if(exp != true)
                        exp2 = exp2.getChild(0).execute(tabla_simbolos)

                    if (exp == true || exp.getValue() == exp2.getValue()) {
                        exp2 = hijos[i].getChild(1).execute(tabla_simbolos)
                        if (exp2 != null) {
                            if (exp2.getType() == TYPES.BREAK)
                                return null
                            return exp2
                        }
                        // NO break so can execute the next cases without evaluate it
                        exp = true
                    }
                //only for languajes that DEFAULTnode is the final case option
                }else{
                    exp2 = hijos[i].getChild(0).execute(tabla_simbolos)
                    if (exp2 != null) {
                        if (exp2.getType() == TYPES.BREAK)
                            return null
                        return exp2
                    }
                    //exits SWITCH even if exists more CASEnodes of SWITCH
                    break
                }
                i++
            }
        }else
            return new Expresion('SWITCH>> valor <'+exp.getValue()+'> no primitivo', TYPES.ERROR)
        return null
    }

}