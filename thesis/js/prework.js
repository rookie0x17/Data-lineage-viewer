

var edges_ds_tb = []
var edges_tb_vw = []
var edges_vw_en= []
var node_datasources = []
var node_tabelle = []
var node_views = []
var node_entity = []

function estraiDati(){

    lista_tabelle = []

    datasources_and_tables.forEach(datasource => {
        node_datasources.push(new Datasource(datasource))

        n=1
        datasource.tables.forEach(tabella => {
            lista_tabelle.push(tabella.name)
            node_tabelle.push(new Table(tabella.name , tabella.columns));
            edges_ds_tb.push(new Edge_ds_tb( "ds-tb" + n ,datasource , tabella))
            n+=1
        });
    });
    

    n=1
    views_json.sqlViews.forEach( vista => {
        index = vista.sqlViewCode.replace("\n" , " ").split(/\s*[ \n.]+\s*/).indexOf("FROM")
        whereindex = vista.sqlViewCode.replace("\n" , " ").split(/\s*[ \n.]+\s*/).indexOf("WHERE")
        if (whereindex != -1){
            ref_x_vista = vista.sqlViewCode.replace("\n" , " ").split(/\s*[ \n.]+\s*/).splice(index + 1 , whereindex)
        } else {
            ref_x_vista = vista.sqlViewCode.replace("\n" , " ").split(/\s*[ \n.]+\s*/).splice(index + 1 )
        }
        node_views.push(new View(vista.sqlViewID ))
        n+=1
        ref_x_vista.forEach(head_tb =>{
            if (lista_tabelle.includes(head_tb)){
                edges_tb_vw.push(new Edge_tb_vw("tb-vw" + n ,head_tb , vista.sqlViewID))  
                n+=1              
            }
            
        })

    });

    assertions_json.forEach(assertion => {
        mapping_id = assertion.id
        entity_id = assertion.currentEntity.entityID
        entity_name = assertion.currentEntity.entityRemainder
        entity_type =  assertion.currentEntity.entityType
        if (entity_type == "DATA_PROPERTY" ||  entity_type == "OBJECT_PROPERTY"){
            return
        }
        from_vista = [] 
        assertion.mappingBody.viewAtoms.forEach( da_vista => {
            from_vista.push(da_vista.name)
        })

        from_vista.forEach( vista => {
            edges_vw_en.push( new Edge_vw_en(mapping_id , vista , entity_name ))
        })

        node_entity.push(new Entity(entity_id , entity_name , entity_type))

    })

    console.log(edges_ds_tb)
    console.log(edges_tb_vw)
    console.log(edges_vw_en)
    console.log(node_datasources)
    console.log(node_tabelle)
    console.log(node_views)
    console.log(node_entity)
}