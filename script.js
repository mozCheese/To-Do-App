// Selecting Input
let input = document.querySelector("input");

// List-Section
let section = document.querySelector(".list-section");

// Filter button
let allTasks = document.querySelector('.all');
let active = document.querySelector('.active');
let completed = document.querySelector('.completed');
let clear = document.querySelector('.clear');

// Default value of active class
let activeTag = 'all'; 

// DataBase to hold to do list
let data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];

// Input handle function
function handleInput(event) {
  if (event.keyCode === 13 && event.target.value !== "") {
    data.push({ task: event.target.value, strike: false });

    // To remove the existing text from input
    event.target.value = "";

    // Stop the repeatition of task in UI
    ui();
    
    localStorage.setItem('data',JSON.stringify(data));
  }
}

// Function for List of UI
function ui(eachList = data) {
  section.innerHTML = "";
  eachList.forEach((element, index) => {
    let div = document.createElement("div");
    div.classList = "component";
    div.setAttribute("data-number", index);

    let para = document.createElement("p");
    para.innerText = `${element.task}`;

    // Persists the striked off tasks
    if (element.strike) {
      para.style.textDecoration = "line-through";
      para.style.textDecorationThickness = "2px";
      para.style.textDecorationColor ="red";
    }

    let anchorOne = document.createElement("a");
    let anchorTwo = document.createElement("a");

    let iconTick = document.createElement("i");
    iconTick.classList = "fas fa-check";

    let iconCross = document.createElement("i");
    iconCross.classList = "fas fa-times";

    anchorOne.append(iconTick);
    anchorTwo.append(iconCross);

    div.append(anchorOne, para, anchorTwo);
    section.append(div);
    localStorage.setItem('data',JSON.stringify(data));

  });
}

// Funtion to handle delete and strike-through
function handleDeleteStrike(event) {
  let selectedComponent =
    event.target.parentElement.parentElement.dataset.number;
  // handles the delete function of any component
  if (event.target.classList[1] === "fa-times") {
    delete data[selectedComponent];
    ui();
    localStorage.setItem('data',JSON.stringify(data));
  }
  // Handles the strike through
  if (event.target.classList[1] === "fa-check") {
    if (!data[selectedComponent].strike) {
      event.target.parentElement.nextSibling.style.textDecoration =
        "line-through";
      event.target.parentElement.nextSibling.style.textDecorationThickness = '2px'; 
      event.target.parentElement.nextSibling.style.textDecorationColor = 'red';   
      data[selectedComponent].strike = !data[selectedComponent].strike;
    } else {
      event.target.parentElement.nextSibling.style.textDecoration = "none";
      data[selectedComponent].strike = !data[selectedComponent].strike;
    }
  }
  localStorage.setItem('data',JSON.stringify(data));
}


allTasks.addEventListener('click',()=>{
  ui();
  localStorage.setItem('data',JSON.stringify(data));
  addActiveClass('all');
  activeTag = 'all'; 
  addActiveClass();

})

// Adding eventlistener to Active tasks
active.addEventListener('click',() =>{
  let activeTasks = data.filter(element => !element.strike);
  ui(activeTasks);
  activeTag = 'active'; 
  addActiveClass();
});

// Addding eventlistener to completed tasks
completed.addEventListener('click',() =>{
  let completedTasks = data.filter(element => element.strike);
  ui(completedTasks);
  activeTag = 'completed'; 
  addActiveClass();
})

// Adding eventlistener to clear completed tasks
clear.addEventListener('click',() => {
  data = data.filter(element => !element.strike);
  activeTag = 'all';
  addActiveClass();
  ui();
  localStorage.setItem('data',JSON.stringify(data));
});

function addActiveClass(btn = activeTag){

  allTasks.classList.remove('active-tag');
  active.classList.remove('active-tag');
  completed.classList.remove('active-tag');

  if(btn === "all"){
    allTasks.classList.add('active-tag');
  }

  if(btn === "active"){
    active.classList.add('active-tag');
  }

  if(btn === "completed"){
    completed.classList.add('active-tag');
  }
}

addActiveClass(activeTag);

// Event Listener for Tick to srike off text
section.addEventListener("click", handleDeleteStrike);

// Event Listener on Input
input.addEventListener("keyup", handleInput);


ui();