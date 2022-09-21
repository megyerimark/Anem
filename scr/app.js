// const { result } = require("lodash");
const dowloadButton=document.querySelector('#dowloadButton')
var url = "http://localhost:3000/employees";

dowloadButton.addEventListener('click',()=>{
    console.log('működik');
})


fetch(url)
.then(  (response)=>
    response.json()
.then(result=> console.log(result[0].name))
.catch(error=>{
    console.log('Hiba! A lekérdezés sikertelen');
    console.log(error);
})

);


// .then( result => result.json())
// .then( data => {
//     console.log(data);
// });