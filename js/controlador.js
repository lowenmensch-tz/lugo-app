var dropdownObjects = [];

document.addEventListener('DOMContentLoaded', function(event) {
    if( !localStorage.getItem(userCollectionName) ){
    
        localStorage.setItem(userCollectionName, JSON.stringify(usuarios));
    
    } else if (!localStorage.getItem(categoryCollectionName)){
        
        localStorage.setItem(categoryCollectionName, JSON.stringify(categorias));
    
    }else{
        console.log('Ya existen datos en el localstorage');
        populateDropdownMenuUsers();
        populateDataCardCategory();
    }
});


function getUsers(){
    return  JSON.parse(localStorage.getItem(userCollectionName)); 
}


function getCategories(){
    return  JSON.parse(localStorage.getItem(categoryCollectionName)); 
}


function updateDropdownMenu(){

    const dropdownMenuUsers = document.getElementById('dropdownMenuUsers');
    dropdownMenuUsers.innerHTML = '';

    let deleteObj = dropdownObjects.filter( obj =>  obj.match(new RegExp(username, "gi")));
    let newDropdown = dropdownObjects.filter( obj => obj != deleteObj);

    newDropdown.forEach(element=> {
        dropdownMenuUsers.innerHTML += element
    });
}

var username;

function loadUsernameDropdown(username){
    
    this.username = username;
    const btnSeeOrders = document.getElementById('seeOrders');
    btnSeeOrders.disabled = false;

    const btnDropDownUser = document.getElementById('dropdownUsers');
    btnDropDownUser.innerHTML = '';
    btnDropDownUser.innerHTML = `${username}`;

    updateDropdownMenu();
    greeting();
}


function populateDropdownMenuUsers(){
    
    let userDB = getUsers(); 
    const dropdownMenuUsers = document.getElementById('dropdownMenuUsers');

    userDB.forEach(user => {
        let element = `<a class="dropdown-item" onClick="loadUsernameDropdown('${user.nombre} ${user.apellido}')" href="#">${user.nombre} ${user.apellido}</a>`;
        dropdownObjects.push( element );
        dropdownMenuUsers.innerHTML += element;
    });
}


function populateDataCardCategory(){
    
    let categoriesDB = getCategories();
    const categories = document.getElementById('categories');

    categoriesDB.forEach(category => {
        //category.nombreCategoria
        //category.color
        //category.icono
        //(category.empresas).length

        categories.innerHTML += `
            <div class="col-3 mt-4 ml-4 data-card-category" style="background-color: ${category.color}" data-toggle="modal" data-target="#categoryDataModal" onClick="populateDataModalCategory('${category.nombreCategoria}')"> 
                <i class="${category.icono} ml-4 mt-4"></i>
                <div class="card-body">
                    <div class="title card-title">${category.nombreCategoria}</div>
                    <p class="card-text paragraph card-title">${(category.empresas).length} Comercios</p>
                </div>
            </div>
        `;
    });

}


function populateDataModalCategory(nameCategory){

    let categoriesDB = getCategories();
    let category = (categoriesDB.filter( category => category.nombreCategoria === nameCategory ))[0];
    const categoryDataModalContent = document.getElementById('categoryDataModalContent');

    categoryDataModalContent.innerHTML = `
        <div class="modal-header" style="height: 4rem; width: 100%; background-color: #5c3287">
            <div>
                <h5 class="logo-title" style="font-size: 1.4rem;">${category.nombreCategoria}</h5>
            </div>
        </div>
        <div class="modal-body">

            <div class="container-fluid">
                <div class="row">
                    ${populateDataCardCompany(category.empresas)}                    
                </div>
            </div>

        </div>
        <div class="modal-footer">
        </div>
    `;
    
}


function populateDataCardCompany(companies){
    
    let companiesList = [];
    companies.forEach( company => {
        companiesList.push(
            `
            <div class="col-5 mt-4 ml-4 mb-4">
                <div class="card" style="width:20rem;">
                    <div>
                        <img src="${company.imagen}" class="card-img-top" alt="..." style="position: relative;">
                        <div class="ml-4 logo-title" style="position: absolute; font-size: 1.8em; top: 26%;">${company.nombreEmpresa}</div>
                    </div>
                    ${populateListGroupItemProduct(company.productos)}
                </div>
            </div>
            `
            )
    });
    
    return companiesList.join(' ');
}


function populateListGroupItemProduct(products){
    
    let productList = []

    const btnSeeOrders = document.getElementById('seeOrders');

    products.forEach(product => {
        productList.push(
            `
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div class="container">
                            <div class="row">
                                <div class="col-7 paragraph product-title">
                                    ${product.nombreProducto}
                                </div>

                                <div class="col-5">
                                    <button 
                                            class="btn paragraph"  
                                            style="background-color: #440f71; color: white; font-size: 0.8rem; border-radius: 1.2rem;" ${btnSeeOrders.disabled? 'disabled' : ''} data-toggle="modal" data-target="#processOrderDataModal" onClick="populateFormProcessOrder('${product.nombreProducto}', '${product.descripcion}', ${product.precio})">
                                        Pedir
                                    </button>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-8 paragraph" style="color: #5d5d5d; font-size: 0.85rem;">
                                    ${product.descripcion.substr(0, 27)}
                                </div>

                                <div class="col-4">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-7">
                                </div>

                                <div class="col-5 paragraph" style="color: #5d5d5d; font-weight: 900;">
                                    ${formatCurrency(product.precio)}
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            `
        )
    });

    return productList.join(' ');
}


function activateModal(id){
    $(`#${id}`).modal({show:true});
}


function populateFormProcessOrder(productName, productDescription, priceProduct){
    
    const modalContent = document.getElementById('processOrderModalContent'); 
    modalContent.innerHTML = `
    <div class="modal-header">
        <h5 class="modal-title paragraph" style="color: #5c2e87;">${productName}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">

        <div class="container">
            <div class="row">
                <div class="col-8 paragraph" style="color: #5d5d5d; font-size: 0.85rem;">
                    ${productDescription.substr(0, 27)}
                </div>

                <div class="col-4">
                </div>
            </div>

            <div class="row">
                <div class="col-7 paragraph">
                    Cantidad a solicitar: 
                </div>

                <div class="col-5 paragraph" >
                    <input class="form-control" type="number">
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-4 paragraph" style="color: #5d5d5d; font-weight: 900; text-align:right;">
                </div>
                <div class="col-8 paragraph" style="color: #5d5d5d; font-weight: 900; text-align:right;">
                    ${formatCurrency(priceProduct)}
                </div>
            </div>

        </div>

    </div>
    <div class="modal-footer">
        <button 
            class="btn paragraph"  
            style="background-color: #440f71; color: white; font-size: 0.8rem; border-radius: 1.2rem;">
            Procesar Orden
        </button>
    </div>
    `
}


function greeting(){

    const bodyGreeting = document.getElementById('greeting');
    bodyGreeting.innerHTML = '';
    bodyGreeting.innerHTML += `<div id="bodyGreeting" class="title body-greeting">¡Hola ${username.split(' ')[0]}!</div>`;
    bodyGreeting.innerHTML += `<p class="paragraph body-greeting">¿Qué necesitas?</p>`;
}

