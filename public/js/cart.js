const rmProducts = document.querySelectorAll('.rm-btn');

rmProducts.forEach((product) => {
    product.addEventListener('click', async () => {
        const response = await fetch(`/api/productCart/${product.getAttribute('data-id')}`, {
            method: 'delete',
        })
        document.location.reload();
    })
})

const quantityInputs = document.querySelectorAll('.quantity-input');

quantityInputs.forEach((input) => {
    input.addEventListener('change', async () => {
        if(input.value == 0){
            const response = await fetch(`/api/productCart/${input.getAttribute('data-id')}`, {
                method: 'delete',
            })
        }else{
            if(+input.value > +input.getAttribute('max')){
                input.value = input.getAttribute('max');
            }
            const response = await fetch(`/api/productCart/${input.getAttribute('data-cart-id')}`, {
                method: 'put',
                body: JSON.stringify({ 
                    quantities: input.value, 
                }),
                headers: {'Content-Type': 'application/json'},
            })
        }
        setTimeout(document.location.reload(), 1500);
        
    })

})

const totals = document.querySelectorAll('.total');
let subtotal = 0;
totals.forEach((total) => {
    subtotal += +total.textContent.split('$ ')[1]
})
const subtotalEl = document.querySelector('.subtotal');
if(subtotalEl){
    subtotalEl.textContent = `Subtotal: $ ${subtotal}`;
}


const checkoutBtn = document.querySelector('#checkout-btn');
checkoutBtn.addEventListener('click', async () => {
    const cartProducts = document.querySelectorAll('.product-details');
    // console.log(cartProducts)
    let body = [];
    cartProducts.forEach((product) => {
        obj = {
            name: product.getAttribute('data-product-name'),
            price: product.getAttribute('data-product-price'),
            quantities: product.getAttribute('data-product-quantity')
        };
        // console.log(obj);
        body.push(obj);
    })
    console.log(body);
    const response = await fetch(`/api/productCart/checkout`, {
        method: 'delete',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'},
    })
})