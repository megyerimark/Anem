
const dowloadButton = document.querySelector('#dowloadButton');
const dolgozoktabla = document.querySelector('#dolgozoktabla');
const addButton = document.querySelector('#addButton');
const namee = document.querySelector("#name");
const salary = document.querySelector("#salary");
const city =document.querySelector("#city");
// let delBtn=document.querySelector("#delBtn");
var tbody =document.createElement('tbody');
dolgozoktabla.appendChild(tbody);



const host = "http://localhost:3000";

(()=>{
    getEmployees();

    //autómatikusan le fog futni , csak blokkban van !! EZ KELL!
})()



// dowloadButton.addEventListener('click',()=>{

// });

function getEmployees(){
    let endpoint ="employees";
    let url= host  + '/'+endpoint;
    


fetch(url)
.then(response => response.json())
.then(result=> {console.log(result[0].name);
    renderTable(result);
})


.catch(error=>{
    console.log("Hiba! A lekérdezés sikertelen")
    console.log(error)
})

}


function renderTable(employees) {
    tbody.innerHTML='';
    employees.forEach(employee => {
        console.log(employee.name)

        let tr = document.createElement("tr");
        let tdId = document.createElement("td");
        let tdName = document.createElement("td");
        let tdSalary = document.createElement("td");
        let tdcity = document.createElement("td");
        let tddel = document.createElement("td");
        let delBtn=makeDelButton(employee.id);
  
       
    
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdSalary);
        tr.appendChild(tdcity);
        tddel.appendChild(delBtn);
        tr.appendChild(tddel)
        tbody.appendChild(tr);
    
    
        tdId.innerHTML = employee.id;
        tdName.innerHTML = employee.name;
        tdSalary.innerHTML = employee.salary;
        tdcity.innerHTML = employee.city;
    })
    };
    // console.log(employees[1].name );

    function makeDelButton(id){
        let delBtn=document.createElement("button");
        // delBtn.classList.add('btn');
        // delBtn.classList.add('btn-primary');
        delBtn.textContent='Törlés';
        delBtn.addEventListener('click' ,()=>{
            let answer= confirm("Biztosan törölni szeretnéd?");
            if(answer){
                deleteEmployee (id);
                let actualTr= delBtn.parentElement.parentElement;
                actualTr.parentNode.removeChild(actualTr);
            }
    
           
        });
        return delBtn;

    }

   



addButton.addEventListener('click', ()=>{
   addEmployee();
});


function addEmployee(){
    let endpoint ='employees';
    let url = host +"/"+ endpoint;
    let employee = {
        
        name:namee.value,
        salary:salary.value,
        city:city.value //itt veszi ki az input elemből beírt adatot
    };
    fetch(url,{
        method:'post',  //mindig post petódussal történik a hozzáadás 
        body:JSON.stringify(employee),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(response => response.json())
    .then(result =>{
        console.log(result);
        namee.value="";
        addEmployeToTable(result);
    })
    
};

function addEmployeToTable(employee){
let tr =document.createElement('tr');
let tdId =document.createElement('td');
let tdname =document.createElement('td');
let tdSalary =document.createElement('td');
let tdCity =document.createElement('td');
let tdButton =document.createElement('td');


tdId.textContent = employee.id;
tdname.textContent = employee.name;
tdSalary.textContent = employee.salary;
tdCity.textContent= employee.city;


tr.appendChild(tdId);
tr.appendChild(tdname);
tr.appendChild(tdSalary);
tr.appendChild(tdCity);
tr.appendChild(tdButton);

let delButton= makeDelButton(employee.id);
tdButton.appendChild(delButton);
tbody.appendChild(tr);

}

function deleteEmployee(id){
    console.log(id);
    let endpoint ="employees";
    let url = host + '/' +endpoint +'/' +id;

    fetch(url,{ 
        method: "delete"})
    .then(response => response.json)
    .then(result =>{
        console.log(result);
    })
}



