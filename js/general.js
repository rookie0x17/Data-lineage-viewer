// MASTRO CONNECTION TO REST SERVER

var conn_btn = document.getElementById("mastro-connection");

console.log(conn_btn);

conn_btn.onclick = function(){try_conn()};

var token;

function try_conn() {
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', "http://localhost:8989/mws/rest/mwsx/login")
    xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"));
    var status = 2;
    xhr.onload = () => {
        //const data = JSON.parse(xhr.response);
        token = xhr.getResponseHeader("X-MONOLITH-SESSION-ID")
        console.log(xhr.getResponseHeader("X-MONOLITH-SESSION-ID"));
        console.log("il token è: " + token);
        console.log("lo status è: " + xhr.status);
        status = xhr.status;

        if(status == 200){
            document.getElementById("mastro-connection").setAttribute("class" , "d-none d-sm-inline-block btn btn-sm btn-success shadow-sm");
            document.getElementById("mastro-connection").innerHTML = "<i class='fas fa-exclamation-circle fa-sm text-white-50'  ></i> Mastro connected";
        } else {
            document.getElementById("mastro-connection").setAttribute("class" , "d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm");
            document.getElementById("mastro-connection").innerHTML = "<i class='fas fa-exclamation-circle fa-sm text-white-50'  ></i> Connection refused";
        }
    };

    xhr.send();
   
}