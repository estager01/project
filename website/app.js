// create main prompt
let menuArray = ["1. Show messages \n", "2. Add a message \n", "3. Delete a message \n", "0. Quit"]
// modify prompt menu to display as list
let menuList = ""
for (i = menuArray.length - 1; i >= 0; i--){
    menuList = menuArray[i]+menuList
}
// prompt for user input using menu list
let userInput = prompt(menuList)

//
// create message list 
let messages = ["message 01", "message 02", "message 03", "message 04"]
//
// function covertArray converts parameter array into numbered list
let currentMessages = ""
function convertArray(myList) {
    for (i = 0; i < myList.length; i++){
        currentMessages = currentMessages + (i+1) + ". " + myList[i] + "\n"
    }
    return "The current messages are: \n" + currentMessages
}
    
 
// respond to user input when input is 1, show messages
if (userInput == 1) {
    document.getElementById("output").innerHTML = convertArray(messages)
}
// when input is 2, add user input message, print messages
else if ( userInput == 2) {
    let newMessage = prompt("Enter a new message")
    messages.push(newMessage)
    document.getElementById("output").innerHTML = convertArray(messages)
}
//input is 3, remove selected indexed message
else if (userInput == 3){
    let newMessage = prompt("Enter the message index between 1 and " + messages.length)
    messages.splice(newMessage - 1, 1)
    //alert(messages)
    document.getElementById("output").innerHTML = convertArray(messages)
}
//input is 4, quit
else if (userInput == 4){
    document.getElementById("output").innerHTML = "Good Bye" 
}
//throw error for all other inputs
else {
    document.getElementById("output").innerHTML = "Please refresh and select a correct command"
}
