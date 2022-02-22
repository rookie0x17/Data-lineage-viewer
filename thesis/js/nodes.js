class Nodes{
    constructor(id ){
        this.id = id;
    }
}

class Datasource extends Nodes {
    constructor(id ){
        super(id);
        
    }
}

class Table extends Nodes {
    constructor(id , columns){
        super(id);
        this.columns = columns;
    }
}

class View extends Nodes {
    constructor(id ){
        super(id );
    }
}

class Entity extends Nodes {
    constructor(id , name , type ){
        super(id);
        this.name = name
        this.type = type

    }
}

class Edge{
    constructor(id , from , to){
        this.id = id
        this.from = from;
        this.to = to;
    }
}

class Edge_ds_tb extends Edge {
    constructor(id, from , to){
        super(id , from, to)
    }
}

class Edge_tb_vw extends Edge {
    constructor(id , from , to){
        super(id ,from, to)
    }
}

class Edge_vw_en extends Edge {
    constructor(id , from , to ){
        super(id, from , to)
        
    }
}

