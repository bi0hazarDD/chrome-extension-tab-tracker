let myLeads = []
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const inputEl = document.getElementById("input-el")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
// leadsFromLocalStorage will contain the array converted from the string stored in the localStorage as a JSON object, therefore an array will be entered into the condition thus a true value is passed in this case.
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}
// Reusable render function
function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]}
        </a>
      </li>
      <div class='break'></div>
      `
    // const li = document.createElement("li")
    // li.textContent = myLeads[i]
    // ulEl.append(li)
  }
  ulEl.innerHTML = listItems
  console.log(listItems)
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs[0].url)
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })
})
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value)
  inputEl.value = ""
  // Save the myLeads array to localStorage
  // Note: localStorage only supports strings
  const myLeadsString = JSON.stringify(myLeads)
  localStorage.setItem("myLeads", myLeadsString)
  render(myLeads)
})
