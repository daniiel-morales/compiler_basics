import { sym } from "./sym"

export class sym_table{

    cubo:Array<Record<string,sym>>

    constructor(){
        //init array of scopes with tables
        this.cubo = Array<Record<string,sym>>()
        //0 index for global sym
        this.addScope()
    }
    addSym(s:sym):boolean{

        let actual_table: Record<string,sym> = {}
        actual_table = this.cubo[this.cubo.length-1]

        //check if exists in local or global scope
        if(actual_table[s.getID()] == null && this.cubo[0][s.getID()] ==null){
            actual_table[s.getID()] = s
            return true
        }
        return false
    }
    getSym(id:string):sym{
        let s:sym
        s=this.cubo[this.cubo.length-1][id]

        if(s==null)
            return this.cubo[0][id]
        
        return s
    }
    addScope(){
        let ambito: Record<string, sym> = {}
        this.cubo.push(ambito)
    }
    removeScope(){
        this.cubo.pop()
    }
}
