function formatCurrency(value){
    let format = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    return format;
}