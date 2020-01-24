import { Expresion } from "../ast/Expresion"

export class sym{

    id: string
	valor: any
    tipo: number
    arreglo: boolean
    
    constructor(i:string, v:any, t:number, a:boolean){

        this.id = i
        this.valor = v
        this.tipo = t
        this.arreglo = a

    }
    getID():string{
        return this.id
    }
    updateValue(v:Expresion, a:boolean):boolean{
        //check if type is ok
        if(v.getType() == this.tipo && a == this.arreglo){
            this.valor = v
            return true
        }
        return false
    }
    getValue():any{
        return this.valor
    }
    getType():number{
        return this.tipo
    }
}
