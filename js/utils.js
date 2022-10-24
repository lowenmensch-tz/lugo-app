function formatCurrency(value){
    let format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    return format;
}


function splitName(username){
    let split = username.split(' ');
    let firstName = split[0];
    let lastName = split[1];
    return {
        firstName: firstName, 
        lastName: lastName
    };
}


function convertTextToNumber(text){
    return parseFloat(text);
}



function activateModal(id){
    $(`#${id}`).modal({show:true});
}