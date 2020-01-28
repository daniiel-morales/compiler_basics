import { Instruccion } from "./ast/Instruccion"
import { Expresion } from "./ast/Expresion"
import { TYPES } from "./ast/Nodo"
import { sym_table } from "./analisis/sym_table"

function test_print(){
        let global: Instruccion = new Instruccion()
        global.type(TYPES.SCOPE)

        let inner: Instruccion = new Instruccion()
        inner.type(TYPES.PRINT)
        
        inner.add(new Expresion('INICIANDO', TYPES.STRING))
        inner.add(new Expresion(true, TYPES.BOOLEAN))

        global.add(inner)

        let inner_in: Instruccion = new Instruccion()
        inner_in.type(TYPES.PRINT)
        
        inner_in.add(new Expresion(3, TYPES.NUM))
        inner_in.add(new Expresion(2.0, TYPES.NUM))
        inner_in.add(new Expresion('1', TYPES.NUM))

        global.add(inner_in)

        global.execute(null)
}

function test_add(){

        let inner: Instruccion = new Instruccion()
        inner.type(TYPES.ADD)
        
        inner.add(new Expresion(1, TYPES.NUM))
        inner.add(new Expresion(1.0, TYPES.NUM))

        let inner_in: Instruccion = new Instruccion()
        inner_in.type(TYPES.ADD)
        
        inner_in.add(new Expresion('Hola', TYPES.STRING))
        inner_in.add(inner)

        return inner_in.execute(null)
}

let tabla_simbolos: sym_table

function test_sym_table(){

        let inner: Instruccion = new Instruccion()
        inner.type(TYPES.DECLARE)
        
        inner.add(new Expresion('var1', TYPES.ID))
        inner.add(new Expresion(3, TYPES.NUM))
        inner.add(new Expresion('int', TYPES.NUM))

        let inner_in: Instruccion = new Instruccion()
        inner_in.type(TYPES.ADD)
        
        inner_in.add(new Expresion('T', TYPES.STRING))
        inner_in.add(new Expresion('var1', TYPES.ID))

        tabla_simbolos = new sym_table()
        inner.execute(tabla_simbolos)
        return inner_in.execute(tabla_simbolos)
}

function test_if_else(){

        let inner: Instruccion = new Instruccion()
        inner.type(TYPES.IF)
        
        //set TRUE / FALSE for test just IFnode
        inner.add(new Expresion(false, TYPES.BOOLEAN))

        let print: Instruccion = new Instruccion()
        print.type(TYPES.PRINT)

        print.add(new Expresion('FAIL', TYPES.STRING))

        inner.add(print)

        let else_if: Instruccion = new Instruccion()
        else_if.type(TYPES.IF)
        
        //set TRUE to test ELSE_IFnode or FALSE to test ELSEnode
        else_if.add(new Expresion(false, TYPES.BOOLEAN))

        print = new Instruccion()
        print.type(TYPES.PRINT)

        let add: Instruccion = new Instruccion()
        add.type(TYPES.ADD)

        add.add(new Expresion('FAIL', TYPES.STRING))
        add.add(new Expresion(2, TYPES.NUM))

        print.add(add)
        else_if.add(print)

        inner.add(else_if)

        let _else: Instruccion = new Instruccion()
        _else.type(TYPES.ELSE)
        
        print = new Instruccion()
        print.type(TYPES.PRINT)

        print.add(new Expresion('test_if_else>> Success', TYPES.STRING))

        _else.add(print)

        inner.add(_else)

        tabla_simbolos = new sym_table()
        inner.execute(tabla_simbolos)
}

function test_switch(){

        let inner: Instruccion = new Instruccion()
        inner.type(TYPES.SWITCH)
        
        //set value for match CASEnode
        inner.add(new Expresion(5, TYPES.NUM))


        //first CASEnode
        let c1: Instruccion = new Instruccion()
        c1.type(TYPES.CASE)

        c1.add(new Expresion(1, TYPES.NUM))

        let c1_inst: Instruccion = new Instruccion()
        c1_inst.type(TYPES.SCOPE)

        let print: Instruccion = new Instruccion()
        print.type(TYPES.PRINT)

        print.add(new Expresion('case 1', TYPES.STRING))

        c1_inst.add(print)

        c1_inst.add(new Expresion('', TYPES.BREAK))

        c1.add(c1_inst)

        inner.add(c1)

        //second CASEnode
        let c2: Instruccion = new Instruccion()
        c2.type(TYPES.CASE)

        c2.add(new Expresion(2, TYPES.NUM))

        print = new Instruccion()
        print.type(TYPES.PRINT)

        print.add(new Expresion('case 2', TYPES.STRING))

        c2.add(print)

        inner.add(c2)

        //default CASEnode
        let c3: Instruccion = new Instruccion()
        c3.type(TYPES.DEFAULT)

        print = new Instruccion()
        print.type(TYPES.PRINT)

        print.add(new Expresion('test_switch>> Success', TYPES.STRING))

        c3.add(print)

        inner.add(c3)

        inner.execute(null)
}

function ASTester(){
        let result_exp: any
        
        test_print()

        result_exp = test_add()
        if(result_exp.getValue() == 'Hola2'){
                console.log('test_add>> Success')
        }else{
                console.log('test_add>> FAILED')
        }

        result_exp = test_sym_table()
        if(result_exp.getValue() == 'T3'){
                console.log('test_sym_table>> Success')
        }else{
                console.log('test_sym_table>> FAILED')
        }

        test_if_else()

        test_switch()
        
}

ASTester()
