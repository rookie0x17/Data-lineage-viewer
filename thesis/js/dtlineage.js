

var cy = cytoscape({
    container: document.getElementById('cy'),

    minZoom:1-0.9,
    maxZoom:1+1,

    elements: { // list of graph elements to start with
                nodes: [
                  { data: { id: 'Datasources' , type : 'ds'} }, 
                  { data: { id: 'Tables' , type : 'tb'} },
                  { data: { id: 'Views' , type : 'vw'} } , 
                  { data: { id: 'Ontology' , type : 'en'} }, 
                ],
       
              },
    
      style: [
         // the stylesheet for the graph

         {
          selector: '.highlighted' ,
          style :{
            'background-color': '#61bffc',
            'line-color': '#61bffc',
            'target-arrow-color': '#61bffc',
            'transition-property': 'background-color, line-color, target-arrow-color',
            'transition-duration': '0.01s',
            'width' : '10',
            'arrow-scale': 2,
          } ,
         } ,

         {
          selector: '.clickato' ,
          style :{
            'background-color': 'black',
            'transition-property': 'background-color, shape',
            'transition-duration': '0.01s',
            'width': '35' ,
            'height': '10',
            
          } ,
         } ,
        {
          selector: 'node',
          style: {
            'background-color': function( ele ){ 
              if (ele.data('type')== 'ds'){
                return 'red'
              } else if (ele.data('type')== 'tb') {
                return 'green'
              } else if (ele.data('type')== 'vw') {
                return '#2659ec'
              } else if (ele.data('type')== 'en'){
                return 'yellow'
              } else if (ele.data('type')== 'rl'){
                return 'black'
              } else {
                return 'black'
              } 
             },

             'shape': function( ele ){ 
              if (ele.data('type')== 'ds'){
                return 'round-tag'
              } else if (ele.data('type')== 'tb') {
                return 'bottom-round-rectangle'
              } else if (ele.data('type')== 'vw') {
                return 'rectangle'
              } else if (ele.data('type')== 'en'){
                return 'rectangle'
              } else if (ele.data('type')== 'rl'){
                return 'diamond'
              } else {
                return 'rectangle'
              } 
             },
             'background-opacity' : 0.7,
            'label': function( ele ){ return ele.data('id') } ,
            'width': '350' ,
            'height': '100',
            'border-width' : '3px', 
            'text-margin-y' : '-6px',
            'font-size' : '34px',
            'font-weight' : 'bold',
            'text-valign' : 'center',
            'text-max-width' : '10',
            'color' : function( ele ){ 
              if (ele.data('type')== 'rl'){
                return 'white'
              } else {
                return 'black'
              } 
            } ,
           
          },
        },

        {
          selector: ':parent',
          style: {
            'background-color': function( ele ){ 
              if (ele.data('type')== 'ds'){
                return 'red'
              } else if (ele.data('type')== 'tb') {
                return 'green'
              } else if (ele.data('type')== 'vw') {
                return '#2659ec'
              } else if (ele.data('type')== 'en' || ele.data('type')== 'rl' ){
                return 'yellow'
              } else {
                return 'black'
              } 
             },
            'background-opacity' : 0.4,
            'font-size' : '50px',
            'text-margin-y' : '-10px',
            'text-valign' : 'top',
          }
        },
    
        {
          selector: 'edge',
          style: {
            'curve-style': 'taxi',
            'taxi-direction': function( ele ) {
              if(ele.data('type') == 'rl'){
                return 'upward'
              } else {
                return 'rightward'
              }
            },
            'target-arrow-shape': 'triangle',
            'arrow-scale': 3,
            }
        }
      ], 

});

var options = {

    name: 'dagre',
    fit:true ,
    rankDir: "LR", 
    rankSep: 400,
    nodeSep:50, 
    align: "UR",
    
};

var cyto_btn = document.getElementById("cyto-btn");
cyto_btn.onclick = function(){draw_graph()};

function draw_graph(){
  
  
  node_datasources.forEach(ds => {
    cy.add({
      group: 'nodes' , 
      data: { id : ds.id.id , type: 'ds' , parent: 'Datasources'} ,   
    })

   
  })

  
  node_tabelle.forEach(tb => {
    cy.add({
      group: 'nodes' , 
      data: { id : tb.id , type: 'tb' , parent: 'Tables' , columns: tb.columns} ,
      
    })

    
  })

  edges_ds_tb.forEach(coll => {
    cy.add({
      group: 'edges' , 
      data: { id : coll.id , source: coll.from.id , target: coll.to.name} ,
    })
  })

 
  node_views.forEach(ds => {
    cy.add({
      group: 'nodes' , 
      data: { id : ds.id , type: 'vw' , parent: 'Views' , columns:ds.columns } ,
      
    })

  })

  edges_tb_vw.forEach(coll => {
    cy.add({
      group: 'edges' , 
      data: { id : coll.id , source: coll.from , target: coll.to} ,
    })
  })
  
  node_entity.forEach(ds => {
    
    if(ds.type == "DATA_PROPERTY" || ds.type == "OBJECT_PROPERTY"){

      
      

    } else {

      cy.add({
        group: 'nodes' , 
        data: { id : ds.name , type: 'en' , parent: 'Ontology' , template: ds.template} ,
        
      })

     
    }
  })

  edges_vw_en.forEach(coll => {
    cy.add({
      group: 'edges' , 
      data: { id : coll.id , source: coll.from , target: coll.to}  ,
    })
  })

  node_relation.forEach(ds => {
    cy.add({
      group: 'nodes' , 
      data: { id : ds.name , type: 'rl' , parent: 'Ontology' , iri : ds.iri} ,
      
    })

  })

  edges_en_re.forEach(coll => {
    cy.add({
      group: 'edges' , 
      data: { id : coll.id , source: coll.from , target: coll.to , type: 'rl'}  ,
    })
  })
  

  document.getElementById("numero-ds").innerHTML = node_datasources.length
  document.getElementById("numero-tb").innerHTML = node_tabelle.length
  document.getElementById("numero-vw").innerHTML = node_views.length
  document.getElementById("numero-en").innerHTML = node_entity.length

  

  var lay = cy.layout(options);
  lay.run();
  
  

}

cy.on('tap', 'node', function(evt){
    var node = evt.target;
    if (node.className() == 'clickato' ){
      node.removeClass('clickato');
    } else {
      node.addClass('clickato');
    }
    console.log( 'Passa per' + node.id() + node.className() );

    var bfs = cy.elements().bfs('#' +node.id(), function(){}, true);

    var i = 1;
    var highlightNextEle = function(){
      if( i < bfs.path.length ){
        if ( bfs.path[i].className() != 'highlighted'){
          bfs.path[i].addClass('highlighted');
        } else {
          bfs.path[i].removeClass('highlighted');
        }
        i++;
        setTimeout(highlightNextEle, 1);
      }
    };

    
    // kick off first highlight
    highlightNextEle();

  });

  
tippyList=[]
  cy.on('mouseover', 'node', function(event) {
    var node = event.target;
    console.log(node.data())
    console.log(node.id() )
    if(node.id() != "Datasources" && node.id() != "Tables" && node.id() != "Views" && node.id() != "Ontology" ){
      
      node.qtip({
       content: {
        title: node.id() ,
        text: function( ){ 
          if (node.data('type')== 'ds'){
            return 'Tipo: MySQL db'
          } else if (node.data('type')== 'tb' || node.data('type')== 'vw') {
            let str = ''
            node.data('columns').forEach(colonna => 
              {
                str = str + colonna + '</br>'
              })
            return str 
          } else if (node.data('type')== 'en'){
            return  node.data('template')
          } else if (node.data('type')== 'rl'){
            return node.data('iri')
          } else {
            return ''
          } 
         }
        ,
         
       },
        style: {classes: 'qtip-light',
          
      },
      position: {
        my: 'top left',  // Position my top left...
        at: 'bottom right', // at the bottom right of...
        target: $(this) // my target
    },
        show: {
           event: event.type,
           ready: true
        },
        hide: {
           event: 'mouseout unfocus'
        }
   }, event);

  

    

    } 
});

cy.on('mouseout', 'node', function(event) {

  
});


