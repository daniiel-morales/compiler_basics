export interface Nodo {

    //function_id (parameter: type_parameter, ...) : type_return
    add(n: any): void
    execute(t: import("../analisis/sym_table").sym_table): any
    getSize(): number
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
    BREAK,
    //root
    DECLARE,
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
