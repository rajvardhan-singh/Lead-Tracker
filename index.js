
let myLeads =[]

const inputEl =document.getElementById("input--el")
const inputBtn = document.getElementById("input--btn")
const ulEl = document.getElementById("ul--el")
const deleteBtn = document.getElementById("delete--btn")
const tabBtn = document.getElementById("tab--btn")


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

//show list on refreshing
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


// take action when new item added to list by clicking buttom
inputBtn.addEventListener("click", function(){
    //code for button behaviour on get clicked
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    
})


// render the list on extension screen
function render(leads){
 let listItem =[]
 for(let i=0;i<leads.length;i++){
   listItem += "<li><a target='_blank' href=' "+leads[i]+ "'/>"+leads[i] + "</a></li>"
 }
 ulEl.innerHTML =listItem

}

/* Delete All List From Tracker List and from Local Storage and Delete DOM*/
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)

})

// saving current tab url to list
tabBtn.addEventListener("click",function(){
    //grab url
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
         // use `url` here inside the callback because it's asynchronous!
    });

    
})