var userNumber = prompt('Please enter a number between 2 and 10');

//If user input is not in range, ask to reload, otherwise continue
if ((userNumber > 10) || (userNumber < 2)) {
    document.getElementById("failure").innerHTML = "Your input was " + userNumber + ". The valid input number is between 2 and 10. Please reload this page and try again";
    document.getElementById("stars").style.display = 'none' 
}
else {
    // First line, repeat what number was entered
    document.getElementById("correct").innerHTML = "Your number is " + userNumber;
    
    // Second line, calculate number of times input number has to be divided by 2 to get one millionth
    let divideNumber = userNumber
    let i = 0
    while (divideNumber > .000001) {
        divideNumber = divideNumber / 2
        i = i + 1
    }
    document.getElementById("division").innerHTML = "The number of times to divide the number " + userNumber + " by 2 to get a value less that one millionth is " + i;
     
    // Third element, prints number of stars in a decreasing order per line
    let star = "*"
    for (i = 1; i < userNumber; i++) {
        star = star + "*"
    }
    // Above block makes string = * times number
    //Below string prints *'s then cuts one, prints again
    let text1 = ""
    for (i = 0; i < userNumber; i++) {
        star = star.slice(0, userNumber - i)
        text1 += (star) +"<br>"
    }
    document.getElementById("stars").innerHTML = text1
}

    

