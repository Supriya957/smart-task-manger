/* ==========================
      DOM ELEMENTS
========================== */


const taskInput = document.getElementById("taskInput");

const dueDate = document.getElementById("dueDate");

const priority =
document.getElementById("priority");


const addTaskBtn =
document.getElementById("addTask");


const taskList =
document.getElementById("taskList");


const searchInput =
document.getElementById("searchInput");


const progressFill =
document.getElementById("progressFill");


const progressPercent =
document.getElementById("progressPercent");


const dateElement =
document.getElementById("date");


const timeElement =
document.getElementById("time");


const greetingElement =
document.getElementById("greeting");


const quoteElement =
document.getElementById("quote");


const themeSelector =
document.getElementById("themeSelector");


const themeBtn =
document.getElementById("themeBtn");


const notification =
document.getElementById("notification");


const loader =
document.getElementById("loader");



/* ==========================
      GLOBAL DATA
========================== */


let tasks = [];


let currentTheme = "default";


let currentSearch = "";


let currentFilter = "All";


let editMode = false;


let editTaskId = null;



/* ==========================
      QUOTES
========================== */


const quotes = [

"Small progress every day leads to big results.",

"Success begins with one task.",

"Focus today, celebrate tomorrow.",

"Dream big. Start small.",

"Discipline creates success.",

"One task at a time."

];



/* ==========================
      START APPLICATION
========================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


    initializeApp();


});



function initializeApp(){


    loadTasks();


    loadTheme();


    firstTimeSetup();


    updateClock();


    startClock();


    updateGreeting();


    showRandomQuote();


    hideLoader();


    renderTasks();


}




/* ==========================
      LOCAL STORAGE
========================== */


function saveTasks(){


    localStorage.setItem(

        "smartTasks",

        JSON.stringify(tasks)

    );


}



function loadTasks(){


    const saved =

    localStorage.getItem(
        "smartTasks"
    );


    if(saved){

        tasks = JSON.parse(saved);

    }

    else{

        tasks=[];

    }


}



/* ==========================
      FIRST TIME USER
========================== */


function firstTimeSetup(){


const user =
localStorage.getItem(
"smartUser"
);



if(!user){


localStorage.setItem(

"smartUser",

"true"

);


showToast(
"👋 Welcome to Smart Task Manager!"
);


}



}




/* ==========================
      DATE DEFAULT
========================== */


function setTodayDate(){


if(!dueDate)
return;


const today =
new Date()
.toISOString()
.split("T")[0];


dueDate.value=today;


}





/* ==========================
      THEME SYSTEM
========================== */


function changeTheme(theme){



document.body.className="";



if(theme !== "default"){


document.body.classList.add(theme);


}



currentTheme=theme;



localStorage.setItem(

"smartTheme",

theme

);



}



if(themeSelector){


themeSelector.addEventListener(

"change",

()=>{


changeTheme(

themeSelector.value

);


}


);


}




function loadTheme(){


const savedTheme =

localStorage.getItem(
"smartTheme"
);



if(savedTheme){


changeTheme(savedTheme);



if(themeSelector){

themeSelector.value=savedTheme;

}


}


}




if(themeBtn){


themeBtn.addEventListener(

"click",

()=>{


if(currentTheme==="dark"){


changeTheme("default");


}

else{


changeTheme("dark");


}


}


);


}






/* ==========================
      LIVE CLOCK
========================== */


function startClock(){


setInterval(

updateClock,

1000

);


}



function updateClock(){


const now =
new Date();



if(dateElement){


dateElement.textContent =

now.toLocaleDateString(
"en-US",
{

weekday:"long",

year:"numeric",

month:"long",

day:"numeric"

}

);


}



if(timeElement){


let hours =
now.getHours();



let minutes =
String(
now.getMinutes()
)
.padStart(2,"0");


let seconds =
String(
now.getSeconds()
)
.padStart(2,"0");



let period="AM";



if(hours>=12){

period="PM";

}



hours =
hours%12 || 12;



timeElement.textContent =

`${hours}:${minutes}:${seconds} ${period}`;


}



}




/* ==========================
      GREETING
========================== */


function updateGreeting(){


if(!greetingElement)
return;



const hour =
new Date()
.getHours();



let message;



if(hour<12){


message="🌅 Good Morning";


}

else if(hour<17){


message="☀️ Good Afternoon";


}

else if(hour<21){


message="🌇 Good Evening";


}

else{


message="🌙 Good Night";


}



greetingElement.textContent=

message+", Buddy!";



}





/* ==========================
      RANDOM QUOTE
========================== */


function showRandomQuote(){


if(!quoteElement)
return;



const index =
Math.floor(

Math.random()*quotes.length

);



quoteElement.textContent =

quotes[index];



}






/* ==========================
      LOADER
========================== */


function hideLoader(){


if(loader){


setTimeout(()=>{


loader.classList.add(
"hide"
);


},1000);



}



}







/* ==========================
      TOAST MESSAGE
========================== */


let toastTimer;


function showToast(message){


if(!notification)
return;



notification.textContent=message;


notification.classList.add(
"show"
);



clearTimeout(toastTimer);



toastTimer=setTimeout(()=>{


notification.textContent="";


notification.classList.remove(
"show"
);



},3000);



}




/* ==========================
      EMPTY RENDER PLACEHOLDER
========================== */


function renderTasks(){


if(!taskList)
return;


taskList.innerHTML="";


if(tasks.length===0){


taskList.innerHTML=`

<div class="empty">

<i class="fa-solid fa-clipboard-list"></i>

<h2>No Tasks Yet</h2>

<p>Add your first task and stay productive!</p>

</div>

`;


}

}




/* =====================
   ADD TASK
===================== */


function addTask(){


const title =
taskInput.value.trim();



if(title === ""){

showToast("⚠️ Please enter a task");

return;

}



/* UPDATE EXISTING TASK */

if(editMode){


tasks =
tasks.map(task=>{


if(task.id === editTaskId){


task.title = title;

task.priority =
priority.value;


task.dueDate =
dueDate.value;


}


return task;


});



editMode=false;

editTaskId=null;


addTaskBtn.textContent="Add Task";


showToast(
"✏️ Task updated"
);


}



/* CREATE NEW TASK */

else{


const newTask = {


id: Date.now(),


title:title,


priority:
priority.value,


dueDate:
dueDate.value,


completed:false,


important:false,


createdAt:
new Date().toISOString()


};



tasks.push(newTask);



showToast(
"✅ Task added successfully"
);


}




saveTasks();

renderTasks();

resetTaskInput();


}




/* =====================
   RESET INPUT
===================== */


function resetTaskInput(){


    taskInput.value = "";


    // Reset priority dropdown
    priority.value = "Sort Priorty";


    // Reset sort priority dropdown
    const sortPriority =
    document.getElementById("sortPriority");


    if(sortPriority){

        sortPriority.value = "default";

        sortMode = "default";

    }


    // Clear date so browser shows mm/dd/yyyy
    dueDate.value = "";


}





/* =====================
   SHOW TASKS
===================== */


function renderTasks(){


    taskList.innerHTML="";
    
    
    if(tasks.length===0){
    
    
    taskList.innerHTML=`
    
    <div class="empty">
    
    <h2>No Tasks Yet</h2>
    
    <p>Add your first task 🚀</p>
    
    </div>
    
    `;
    
    return;
    
    }
    
    
    
    tasks.forEach(task=>{
    
    
    const li=document.createElement("li");
    
    
    li.className="task";
    
    
    if(task.completed){
    
    li.classList.add("completed");
    
    }
    
    
    
    li.innerHTML = `
    
    
    <div class="task-info">
    
    
    <h3>${task.title}</h3>
    
    
    <p>
    📅 ${task.dueDate || "No Date"}
    </p>
    
    
    <span class="priority-tag">
    ${task.priority}
    </span>
    
    
    </div>
    
    
    
    <div class="task-actions">
    
    
    <button class="complete-btn"
    onclick="completeTask(${task.id})">
    ✔
    </button>
    
    
    <button class="edit-btn"
    onclick="editTask(${task.id})">
    ✏️
    </button>
    
    
    <button class="delete-btn"
    onclick="deleteTask(${task.id})">
    🗑️
    </button>
    
    
    </div>
    
    
    `;
    
    
    taskList.appendChild(li);
    
    
    });
    
    
    }





/* =====================
   COMPLETE TASK
===================== */


function completeTask(id){


tasks =
tasks.map(task=>{


if(task.id===id){


task.completed =
!task.completed;



if(task.completed){


task.completedAt =
new Date()
.toISOString();


}

else{


task.completedAt=null;


}


}



return task;


});



saveTasks();

renderTasks();


if(typeof updateDashboard==="function"){

updateDashboard();

}


}





/* =====================
   EDIT TASK
===================== */


function editTask(id){


const task =
tasks.find(
t=>t.id===id
);



if(!task)
return;



taskInput.value =
task.title;


priority.value =
task.priority;


dueDate.value =
task.dueDate;



editMode=true;


editTaskId=id;



addTaskBtn.textContent =
"Update Task";


showToast(
"✏️ Editing task"
);


}





/* =====================
   DELETE TASK
===================== */


function deleteTask(id){


const confirmDelete =
confirm(
"Delete this task?"
);



if(!confirmDelete)
return;



tasks =
tasks.filter(
task=>task.id!==id
);



saveTasks();


renderTasks();



if(typeof updateDashboard==="function"){

updateDashboard();

}



showToast(
"🗑️ Task deleted"
);


}





/* =====================
   BUTTON CLICK
===================== */


addTaskBtn.addEventListener(

"click",

addTask

);




/* =====================
   ENTER KEY ADD
===================== */


taskInput.addEventListener(

"keydown",

function(e){


if(e.key==="Enter"){


addTask();


}


}

);




/* =====================
   SEARCH
===================== */

if(searchInput){


searchInput.addEventListener(
"input",
()=>{


currentSearch =
searchInput.value.toLowerCase();



renderTasks();


});


}





/* =====================
   FILTER SYSTEM
===================== */


const filterButtons =
document.querySelectorAll(".filter");






filterButtons.forEach(button=>{


button.addEventListener(
"click",
()=>{


filterButtons.forEach(btn=>
btn.classList.remove("active")
);



button.classList.add("active");



currentFilter =
button.textContent.trim();



renderTasks();



});


});





/* =====================
   PRIORITY SORT
===================== */


const prioritySort =
document.getElementById("priority");



if(prioritySort){


prioritySort.addEventListener(
"change",
()=>{


renderTasks();


});


}





/* =====================
   FILTER LOGIC
===================== */


function getFilteredTasks(){


let result=[...tasks];



/* SEARCH */


if(currentSearch){


result =
result.filter(task=>

task.title
.toLowerCase()
.includes(currentSearch)

);


}



/* FILTER BUTTONS */


switch(currentFilter){



case "Pending":


result =
result.filter(task=>
!task.completed
);


break;




case "Completed":


result =
result.filter(task=>
task.completed
);


break;




case "Important":


result =
result.filter(task=>
task.important
);


break;




case "Today":


let today =
new Date()
.toISOString()
.split("T")[0];


result =
result.filter(task=>
task.dueDate===today
);


break;




case "Overdue":


let now =
new Date();



result =
result.filter(task=>


task.dueDate &&

new Date(task.dueDate)<now &&

!task.completed


);


break;


}




/* PRIORITY SORT */


if(prioritySort){


let value =
prioritySort.value;



if(value!=="default"){


result.sort((a,b)=>{


return priorityValue(b.priority)
-
priorityValue(a.priority);


});


}


}



return result;


}





function priorityValue(level){


if(level==="High")
return 3;


if(level==="Medium")
return 2;


return 1;


}






/* =====================
   UPDATE RENDER FUNCTION
===================== */


const oldRenderTasks =
renderTasks;



renderTasks=function(){


taskList.innerHTML="";



let filtered =
getFilteredTasks();



if(filtered.length===0){


taskList.innerHTML=`

<div class="empty">

<h2>No Tasks Found</h2>

<p>Try another filter</p>

</div>

`;

return;

}



filtered.forEach(task=>{


let li =
document.createElement("li");


li.className="task";



if(task.completed){

li.classList.add("completed");

}




li.innerHTML=`

<div>


<h3>${task.title}</h3>


<p>
📅 ${task.dueDate || "No Date"}
</p>


<span>
${task.priority}
</span>


</div>



<div>


<button onclick="completeTask(${task.id})">
✔
</button>


<button onclick="editTask(${task.id})">
✏️
</button>


<button onclick="deleteTask(${task.id})">
🗑️
</button>


</div>

`;



taskList.appendChild(li);


});


};







/* =====================
   DASHBOARD
===================== */


function updateDashboard(){


const total =
tasks.length;



const completed =
tasks.filter(
task=>task.completed
).length;



const pending =
total-completed;



const important =
tasks.filter(
task=>task.important
).length;




const totalElement =
document.getElementById("totalTasks");


const completedElement =
document.getElementById("completedTasks");


const pendingElement =
document.getElementById("pendingTasks");


const importantElement =
document.getElementById("importantTasks");




if(totalElement)
totalElement.textContent=total;



if(completedElement)
completedElement.textContent=completed;



if(pendingElement)
pendingElement.textContent=pending;



if(importantElement)
importantElement.textContent=important;




updateProgress(
completed,
total
);



}






/* =====================
   PROGRESS BAR
===================== */


function updateProgress(done,total){


let percent=0;



if(total>0){


percent =
Math.round(
(done/total)*100
);


}



const fill =
document.getElementById("progressFill");


const text =
document.getElementById("progressPercent");



if(fill)
fill.style.width=
percent+"%";



if(text)
text.textContent=
percent+"%";



}




/* =====================
   EXPORT TASKS
===================== */


const exportBtn =
document.getElementById("exportTasks");



if(exportBtn){


exportBtn.addEventListener(
"click",
()=>{


const data =
JSON.stringify(
tasks,
null,
2
);



const blob =
new Blob(
[data],
{
type:"application/json"
}
);



const url =
URL.createObjectURL(blob);



const link =
document.createElement("a");


link.href=url;


link.download=
"smart-task-backup.json";


link.click();



URL.revokeObjectURL(url);



showToast(
"📦 Backup exported"
);



});


}






/* =====================
   IMPORT TASKS
===================== */


const importBtn =
document.getElementById("importBtn");


const importInput =
document.getElementById("importTasks");




if(importBtn){


importBtn.onclick=()=>{


importInput.click();


};


}





if(importInput){


importInput.addEventListener(
"change",
(e)=>{


const file =
e.target.files[0];



if(!file)
return;



const reader =
new FileReader();



reader.onload=function(){


try{


tasks =
JSON.parse(
reader.result
);



saveTasks();


renderTasks();


updateDashboard();



showToast(
"✅ Tasks imported"
);



}

catch{


showToast(
"❌ Invalid backup file"
);


}



};



reader.readAsText(file);



});


}





/* =====================
   CLEAR COMPLETED
===================== */


const clearCompleted =
document.getElementById("clearCompleted");



if(clearCompleted){


clearCompleted.onclick=()=>{


tasks =
tasks.filter(
task=>!task.completed
);



saveTasks();


renderTasks();


updateDashboard();



showToast(
"🧹 Completed tasks removed"
);



};


}





/* =====================
   DELETE ALL
===================== */


const clearAll =
document.getElementById("clearAll");



if(clearAll){


clearAll.onclick=()=>{


let confirmDelete =
confirm(
"Delete all tasks?"
);



if(confirmDelete){


tasks=[];


saveTasks();


renderTasks();


updateDashboard();



showToast(
"🗑️ All tasks deleted"
);


}


};


}





/* =================================
   GAMIFICATION SYSTEM
================================= */


let userXP =
Number(
localStorage.getItem("userXP")
)||0;



const levelNames=[

"Beginner",

"Task Master",

"Productivity Hero",

"Legend"

];





function addXP(points){


userXP += points;


localStorage.setItem(
"userXP",
userXP
);



updateLevel();


}






function updateLevel(){


let level=0;



if(userXP>=300){

level=3;

}

else if(userXP>=150){

level=2;

}

else if(userXP>=50){

level=1;

}



const levelElement =
document.getElementById("userLevel");

const xpElement =
document.getElementById("userXP");



if(levelElement)
levelElement.textContent=
levelNames[level];



if(xpElement)
xpElement.textContent=
userXP;


}





/* =====================
   COMPLETE ANIMATION
===================== */


const oldComplete =
completeTask;



completeTask=function(id){



let task =
tasks.find(
t=>t.id===id
);



if(!task)
return;



task.completed =
!task.completed;



if(task.completed){


task.completedAt =
new Date()
.toISOString();


addXP(10);


celebrate();


}


else{


task.completedAt=null;


}



saveTasks();


renderTasks();


updateDashboard();



};






/* =====================
   CONFETTI
===================== */


function celebrate(){



if(typeof confetti==="function"){


confetti({

particleCount:120,

spread:80,

origin:{
y:0.6
}

});


}



showAchievement(
"🎉 Great Job!",
"+10 XP Earned"
);



}






/* =====================
   ACHIEVEMENT POPUP
===================== */


function showAchievement(title,message){


const popup =
document.getElementById(
"achievementPopup"
);



if(!popup)
return;



document.getElementById(
"popupTitle"
).textContent=
title;



document.getElementById(
"popupMessage"
).textContent=
message;



popup.classList.add("show");



setTimeout(()=>{


popup.classList.remove("show");


},2500);



}





/* =====================
   LOADER
===================== */


window.addEventListener(
"load",
()=>{


const loader =
document.getElementById("loader");



if(loader){


setTimeout(()=>{


loader.classList.add("hide");


},1000);



}


});







/* =====================
   KEYBOARD SHORTCUTS
===================== */


document.addEventListener(
"keydown",
(e)=>{



/* New Task */


if(
e.ctrlKey &&
e.key.toLowerCase()==="n"
){


e.preventDefault();


taskInput.focus();


}






/* Search */


if(
e.ctrlKey &&
e.key.toLowerCase()==="f"
){


e.preventDefault();


searchInput.focus();


}





/* Escape */


if(e.key==="Escape"){


taskInput.value="";


}



});
