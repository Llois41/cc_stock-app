'use strict'

async function sendRequest(){
    let equity = document.getElementById('equity').value;
    let equityEndpoint = makeRequest(equity)
    let response = await callEndpoint(equityEndpoint);
    console.log('response' + response)
    var resDiv = document.createElement("div"); 
    var newContent = document.createTextNode(response); 
    resDiv.appendChild(newContent);
    var currentDiv = document.getElementById("div1"); 
    document.body.insertBefore(resDiv, currentDiv); 
}

function makeRequest(equity){
  let equityEndpoint = 'http://localhost:3000/equities/' + equity
  return equityEndpoint
}

async function callEndpoint(endpointUrl){    
  const response = await fetch(endpointUrl, {
        method: 'GET',
      });
  console.log('apiRes: ' + response)
  return response
}