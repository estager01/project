$(document).ready(function () {
    document.getElementById('newContactOutput').style.display = 'none'
    document.getElementById('contactDetailsOutput').style.display = 'none'
    document.getElementById('editOutput').style.display = 'none'
    document.getElementById('newButtonn').style.display = 'none'
})


$(document).ready(function () {
    $.ajax({
        type: 'GET', 
        url: 'api/user', 
        dataType: 'json',
    })
    .done(successHandler)
    .fail(errorHandler)

   
    // process the form input
    $('#sendButton').click(() => {

        // getting the form data
        const formData = {
            name: $('input[name=name]').val(),
            email: $('input[name=email]').val(),
            phone: $('input[name=phone]').val(),
        }
            // hide table, show new user form
            document.getElementById('newContactOutput').style.display = 'none'
            document.getElementById('output').style.display = 'none'
            document.getElementById('contactDetailsOutput').style.display = 'block'
    
            //alert(phoneDetails) 
            document.getElementById('contactNameDetails').innerHTML = formData.name
            document.getElementById('contactEmailDetails').innerHTML = formData.email
            document.getElementById('contactPhoneDetails').innerHTML = formData.phone
            // test to see if phone number is correct
            let phoneLength = formData.phone.length
            let firstChar = formData.phone.charAt(0)
            
            
            // new record criteria. if bump, reload page
                if ((phoneLength < 10) || (phoneLength > 10)) {
                    alert('Phone number must be 10 digits long')
                    window.location.reload()
                }
                else if ((firstChar == 0) || (firstChar == 1)) {
                    alert('Phone number must begin with a digit other than 0 or 1')
                    window.location.reload()
                }
                else {
                    const requestData = JSON.stringify(formData)    
                    $.ajax({
                            type: 'POST', 
                            url: 'api/user', 
                            data: requestData,
                            dataType: 'json',
                            contentType: 'application/json',
                        })
                        .done(successHandler)
                        .fail(errorHandler)
                    }
    })
    // edits record and updates data
    $('#editDetailsButton').click(() => {
        const formData = {
            name: $('input[name=name]').val(),
            email: $('input[name=email]').val(),
            phone: $('input[name=phone]').val(),
        }
        // show output, check a
        document.getElementById('editOutput').style.display = 'block'
        document.getElementById('contactDetailsOutput').style.display = 'none'
        // fill in input
        document.getElementById('editName').value = formData.name
        document.getElementById('editEmail').value = formData.email
        document.getElementById('editPhone').value = formData.phone
    }) 

    // replace edited data into storage
    $('#submitEditMenu').click(() => {
        // check all conditions, edit record in data
        const formData = {
            name: $('input[name=name1]').val(),
            email: $('input[name=email1]').val(),
            phone: $('input[name=phone1]').val(),
        }
        
        let phoneLength = formData.phone.length
        let firstChar = formData.phone.charAt(0)
        // edit record criteria. if bump, reload page
            if ((phoneLength < 10) || (phoneLength > 10)) {
                alert('Phone number must be 10 digits long')
                window.location.reload()
            }
            else if ((firstChar == 0) || (firstChar == 1)) {
                alert('Phone number must begin with a digit other than 0 or 1')
                window.location.reload()
            }
            else {
                const requestData = JSON.stringify(formData)    
                $.ajax({
                        type: 'POST', 
                        url: 'api/user', 
                        data: requestData,
                        dataType: 'json',
                        contentType: 'application/json',
                    })
                    //.done(successHandler)
                    //.fail(errorHandler)
                alert('record has been updated')
                }
                
    }) 
    $('#newButtonn').click(() => {
        
            const formData = {
                name: $('input[name=name]').val(),
                email: $('input[name=email]').val(),
                phone: $('input[name=phone]').val(),
            }
            alert(formData.name)
            //document.getElementById('contactNameDetails').innerHTML = formData.name
            //document.getElementById('contactEmailDetails').innerHTML = formData.email
            //document.getElementById('contactPhoneDetails').innerHTML = formData.phone
            // test to see if phone number is correct
            let phoneLength = formData.phone.length
            let firstChar = formData.phone.charAt(0)
            
            // new record criteria. if bump, reload page
            if ((phoneLength < 10) || (phoneLength > 10)) {
                alert('Phone number must be 10 digits long')
                window.location.reload()
            }
            else if ((firstChar == 0) || (firstChar == 1)) {
                alert('Phone number must begin with a digit other than 0 or 1')
                window.location.reload()
            }
            else {
                const requestData = JSON.stringify(formData)    
                $.ajax({
                        type: 'GET', 
                        url: 'api/user', 
                        data: requestData,
                        dataType: 'json',
                        contentType: 'application/json',
                    })
                    .done(success)
                    function success(users) {
                        
                        let name = users[newId].name
                        let email = users[newId].email
                        let phone = users[newId].phone
                        // get rid of that record!!!!!!!!!!!!!
                    }
                }
        })
})
///////// OK so the way in which the function above works is this, i use app2, which chops off
//index by 1 so that after the new input checks out, it replaces the one that was 
// just made. HOWEVER. for delete edit buttons i need to use the id as a parameter, then
// POST, DELETE, or call from that place in users object
function successHandler(users) {
    console.log(`Response has ${users.length} users`)
    var $table = $( "<table border='1'><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th></th><th></th><th></th></table>" );
    for ( let index = 0; index < users.length; index++ ) {
        const user = users[index]
        const $line = $( "<tr></tr>" )
        $line.append( $( "<td></td>" ).html( user.id ) )
        $line.append( $( "<td></td>" ).html( user.name ) )
        $line.append( $( "<td></td>" ).html( user.email ) )
        $line.append( $( "<td></td>" ).html( user.phone ) )
        $line.append( $( "<td><button id=" + user.id + ".details onclick = detailsThis(this.id)>Details</button></td>" ) )
        $line.append( $( "<td><button id=" + user.id + ".edit onclick = editThis(this.id)>Edit</button></td>" ) )
        $line.append( $( "<td><button id=" + user.id + ".delete onclick = deleteThis(this.id)>Delete</button></td>" ) )
        $table.append( $line )
    }

    $('#output').empty()
    $table.appendTo( $('#output') )
}

function errorHandler(jqXHR, textStatus, error) {
    $('#output').val("textStatus: " + textStatus + ". server error: " + error)
}

function newContact() {
    document.getElementById('newContactOutput').style.display = 'block'
    document.getElementById('output').style.display = 'none'
    document.getElementById('contactDetailsOutput').style.display = 'none' 
    document.getElementById('editOutput').style.display = 'none' 
}

function homeButton() {
    window.location.reload()
}

function detailsThis(button_id) {
    let thisId = button_id.split('.')
    let newId = thisId[0] -1
    // we got the ID#, now we need to get it to display from data
    $.ajax({
        type: 'GET', 
        url: 'api/user', 
        dataType: 'json',
    })
    .done(successDetails)

    document.getElementById('newContactOutput').style.display = 'none'
    document.getElementById('output').style.display = 'none'
    document.getElementById('contactDetailsOutput').style.display = 'block' 

    // function uses data from ajax and id from button to display record
    function successDetails(users) {
    let name = users[newId].name
    let email = users[newId].email
    let phone = users[newId].phone
    document.getElementById('contactNameDetails').innerHTML = name
    document.getElementById('contactEmailDetails').innerHTML = email
    document.getElementById('contactPhoneDetails').innerHTML = phone
    document.getElementById('editDetailsButton').style.display = 'none' //hide buttons
    document.getElementById('deleteDetailsButton').style.display = 'none'
    document.getElementById('newContactButton').style.display = 'none'
    }
}



function editThis(button_id) {
    let thisId = button_id.split('.')
    let newId = thisId[0] -1
    //alert(newId)
    $.ajax({
        type: 'GET', 
        url: 'api/user', 
        dataType: 'json',
    })
    .done(successEdit)
        document.getElementById('newContactOutput').style.display = 'block'
        document.getElementById('output').style.display = 'none'
        document.getElementById('contactDetailsOutput').style.display = 'none'
    function successEdit(users) {
         
        let name = users[newId].name
        let email = users[newId].email
        let phone = users[newId].phone
        document.getElementById('inputName').value = name
        document.getElementById('inputEmail').value = email
        document.getElementById('inputPhone').value = phone
        document.getElementById('sendButton').style.display = 'none'
        document.getElementById('newButtonn').style.display = 'block'
        
    }
    // also needs a new edit page that submits but replaces ID
    // OR submit button needs to find out how to do that with values
    // in input box
}
function deleteThis(button_id) {
    //alert(button_id)
    let thisId = button_id.split('.')
    let newId = thisId[0] -1
    //alert(newId)
    $.ajax({
        type: 'DELETE', 
        url: 'api/user/',
        contentType: "application/json",
        success: function() {
            bootbox.alert("Proposal deleted successfully.");
            ReloadGrid();
        },
        error: function() {
        }
    })
   //needs to find # and remove from data and reload page
   $(event.target || event.srcElement).parents('tr').hide();
}


