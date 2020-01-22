export interface Nodo {

    //function_id (parameter: type_parameter, ...) : type_return
    add(n: Nodo): void
    execute(): any
    getChild(i: number): Nodo
	getSize(): number
	value(lex: any): void
	type(c: number): void
	getValue(): any
    getType(): number
    
}

export enum  TYPES {
    //leaf
    ID, 
    NUM, 
    CHAR,
    BOOLEAN, 
    STRING,
    NULL,
    ERROR, 
    //root
    IF, 
    ELSE, 
    IF_ELSE,
    PRINT,
    ADD,
    SUB,
    MUL,
    DIV,
    POT,
    MOD,
    SCOPE
}
