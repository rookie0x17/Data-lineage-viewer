var token;
var ontology = "Books"                  //sono già dentro all'ontologia e alla versione nel lineage
var version = "urn:absolute:1.0"
var mapping_vers;
//tabelle datasource
var datasources_json;
var tables_json;
var datasources = [];
var datasources_and_tables = []
//viste mapping
var views_json
var views_id = []
var views_spec = []
//entities ontologia
var assertions_json
var ontology_json





function exec_all(){
    conn_to_mastro();
}


function conn_to_mastro() {
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', "http://localhost:8989/mws/rest/mwsx/login")
    xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"));

    xhr.onload = () => {
        token = xhr.getResponseHeader("X-MONOLITH-SESSION-ID")
        get_datasources()   
        get_all_mappings()
             
    };

    xhr.send();
    
}

function get_datasources(){
    const xhr = new XMLHttpRequest();

    xhr.open('GET', "http://localhost:8989/mws/rest/mwsx/datasource")
    xhr.setRequestHeader("X-MONOLITH-SESSION-ID",  token);

    xhr.onload = () => {
        datasources_json = JSON.parse(xhr.response)
        datasources_json.forEach(datasource => {
            datasources.push(datasource.id )
        });
        get_datasource_tables();
    };

    xhr.send();
}

function get_datasource_tables() {

    datasources.forEach(datasource => {

    
        const xhr = new XMLHttpRequest();

        xhr.open('GET', "http://localhost:8989/mws/rest/mwsx/datasource/"+ datasource +"/tables")
        xhr.setRequestHeader("X-MONOLITH-SESSION-ID",  token);

        xhr.onload = () => {
            tables_json = JSON.parse(xhr.response)
            datasources_and_tables.push({id: datasource , tables: tables_json.tables})
        };

        xhr.send();
    })
}

function get_all_mappings() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', "http://localhost:8989/mws/rest/mwsx/owlOntology/"+ontology+"/version/mapping?version="+version)
    xhr.setRequestHeader("X-MONOLITH-SESSION-ID",  token);

    xhr.onload = () => {
        map = JSON.parse(xhr.response)
        mapping_vers = map.mappingList[0].mappingID
        get_views() 
        
    };

    xhr.send();
    
}

function get_views() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', "http://localhost:8989/mws/rest/mwsx/owlOntology/"+ontology+"/version/mapping/"+mapping_vers+"/views?version="+version)
    xhr.setRequestHeader("X-MONOLITH-SESSION-ID",  token);

    xhr.onload = () => {
        views_json = JSON.parse(xhr.response)
        views_json.sqlViews.forEach(vista => {
            views_id.push(vista.sqlViewID)
        })
        get_assertion()
    };

    xhr.send();
    
}
/*
function get_views_spec() {

    views_id.forEach(vista => {    
        const xhr = new XMLHttpRequest();

        xhr.open('GET', "http://localhost:8989/mws/rest/mwsx/owlOntology/"+ontology+"/version/mapping/"+mapping_vers+"/views/"+vista+"/?version="+version)
        xhr.setRequestHeader("X-MONOLITH-SESSION-ID",  token);

        xhr.onload = () => {
            //views_spec.push(JSON.parse(xhr.response))
            
        };

        xhr.send();
    })
    get_assertion();

    
}
*/
function get_assertion() {

      
    const xhr = new XMLHttpRequest();

    xhr.open('GET', "http://localhost:8989/mws/rest/mwsx/owlOntology/"+ontology+"/version/mapping/"+mapping_vers+"/assertions?version="+version)
    xhr.setRequestHeader("X-MONOLITH-SESSION-ID",  token);

    xhr.onload = () => {
        assertions_json = JSON.parse(xhr.response)
        get_ontology_json();
    };

    xhr.send();
    
}

function get_ontology_json() {

      
    const xhr = new XMLHttpRequest();

    xhr.open('GET', "http://localhost:8989/mws/rest/mwsx/owlOntology/"+ontology+"/version/entities/?version="+version)

    xhr.setRequestHeader("X-MONOLITH-SESSION-ID",  token);

    xhr.onload = () => {
        ontology_json = JSON.parse(xhr.response)
        get_classes()
        estraiDati()
    };

    xhr.send();
    
}

function get_classes(){
    const xhr = new XMLHttpRequest();

    xhr.open('GET', "http://localhost:8989/mws/rest/mwsx/owlOntology/"+ontology+"/version/alphabet/class/CL_3/logical?version="+version)
    xhr.setRequestHeader("X-MONOLITH-SESSION-ID",  token);

    xhr.onload = () => {
        class_json = JSON.parse(xhr.response);
        console.log(class_json);
    };

    xhr.send();
}
