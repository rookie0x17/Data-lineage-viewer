class Nodes{
    constructor(id ){
        this.id = id;
    }
}

class Datasource extends Nodes {
    constructor(id){
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
    constructor(id , columns){
        super(id );
        this.columns = columns;
    }
}

class Entity extends Nodes {
    constructor(id , name , type , template){
        super(id);
        this.name = name
        this.type = type
        this.template = template

    }
}

class Relation extends Nodes {
    constructor(id , name , type , iri){
        super(id);
        this.name = name
        this.type = type
        this.iri = iri
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

class Edge_en_re extends Edge {
    constructor(id , from , to ){
        super(id, from , to)
        
    }
}

