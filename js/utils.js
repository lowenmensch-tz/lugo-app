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
    
    let value = parseFloat(text);
    return value ? value : 0.0;
}



function activateModal(id){
    $(`#${id}`).modal({show:true});
}


function selectRandomColor(){
    let colors = ['fadb54',
        '9cc1e6',
        '9482c4',
        'd98f6d',
        'f3adac',
        'cfb8ef',
        'f3adac',
        '60cfb0',
        'd7d5de',
        '8acefb',
        'f3ac85',
        '9be2e2'];
    
    
    return colors[
        Math.floor(getRandomArbitrary(0, colors.length-1))    
    ];
}


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

