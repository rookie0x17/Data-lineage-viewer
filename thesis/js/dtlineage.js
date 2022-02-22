var cy = cytoscape({
    container: document.getElementById('cy'),

    elements: [ // list of graph elements to start with
       
      ],
    
      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': function( ele ){ 
              if (ele.data('type')== 'ds'){
                return 'red'
              } else if (ele.data('type')== 'tb') {
                return 'blue'
              } else if (ele.data('type')== 'vw') {
                return 'green'
              } else if (ele.data('type')== 'en'){
                return 'yellow'
              } else {
                return 'black'
              } 
             },
            'label': function( ele ){ return ele.data('id') } ,
            'border-width' : '3px', 
            'text-margin-y' : '-3px'
          }
        },
    
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
    
      layout: {
        name: 'grid',
        rows: 1
      }

});


var cyto_btn = document.getElementById("cyto-btn");


cyto_btn.onclick = function(){draw_graph()};

function draw_graph(){
  
  y_aug = 60

  y_var = 0
  node_datasources.forEach(ds => {
    cy.add({
      group: 'nodes' , 
      data: { id : ds.id.id , type: 'ds'} ,
      position: { x : 100, y : 200 + 200 }
    })

    y_var = y_var + y_aug
  })

  y_var = 0
  node_tabelle.forEach(tb => {
    cy.add({
      group: 'nodes' , 
      data: { id : tb.id , type: 'tb'} ,
      position: { x : 400 , y : 200 + y_var }
    })

    y_var = y_var + y_aug 
  })

  edges_ds_tb.forEach(coll => {
    cy.add({
      group: 'edges' , 
      data: { id : coll.id , source: coll.from.id , target: coll.to.name} ,
    })
  })

  y_var = 0

  node_views.forEach(ds => {
    cy.add({
      group: 'nodes' , 
      data: { id : ds.id , type: 'vw'} ,
      position: { x : 700, y : 200 + y_var }
    })

    y_var = y_var + y_aug
  })

  edges_tb_vw.forEach(coll => {
    cy.add({
      group: 'edges' , 
      data: { id : coll.id , source: coll.from , target: coll.to} ,
    })
  })
  y_var1 = 0
  y_var2 = 0
  node_entity.forEach(ds => {
    x_plus = 0
    if(ds.type == "DATA_PROPERTY" || ds.type == "OBJECT_PROPERTY"){

      cy.add({
        group: 'nodes' , 
        data: { id : ds.id} ,
        position: { x : 1000 + x_plus, y : 100 + y_var2 }
      })
      y_var2 = y_var2 + y_aug

    } else {

      cy.add({
        group: 'nodes' , 
        data: { id : ds.name , type: 'en'} ,
        position: { x : 1000 + x_plus, y : 100 + y_var1 }
      })

      y_var1 = y_var1 + y_aug
    }
  })

  edges_vw_en.forEach(coll => {
    cy.add({
      group: 'edges' , 
      data: { id : coll.id , source: coll.from , target: coll.to} ,
    })
  })
  

  document.getElementById("numero-ds").innerHTML = node_datasources.length
  document.getElementById("numero-tb").innerHTML = node_tabelle.length
  document.getElementById("numero-vw").innerHTML = node_views.length
  document.getElementById("numero-en").innerHTML = node_entity.length


    
}

cy.on('tap', 'node', function(evt){
    var node = evt.target;
    console.log( 'tapped ' + node.id() );
     
    
  });