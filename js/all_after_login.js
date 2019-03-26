let get_all_seller_and_show=(seller)=>{
    let ge = function () {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest()

            request.addEventListener('readystatechange', function (e) {
                if (e.target.status === 200 && e.target.readyState === 4) {
                    let data = JSON.parse(e.target.responseText)
                    resolve(data)
                }
                else if (e.target.readyState === 4) {
                    reject('something went wrong')
                }
            })
            request.open('GET', `https://polar-hamlet-81127.herokuapp.com/products`, true)
            request.send()
        })
    }

    ge().then((doc) => {
        document.querySelector('#all_products').innerHTML = ''
        doc.products.forEach((val, ind) => {
            if (val.seller === seller){
            let new_div = document.createElement('div')

            new_div.innerHTML = `<div class="product z-depth-4">
                                    <h3 class="name">${val.name}</h3>
                                    <h5 class="brand">${val.brand}</h5>
                                    <p class="desc">${val.desc}</p>
                                    <button onclick="delete_me('${val.name}','${seller}')" class="prod_del">Delete</button>
                                    <button onclick="update_me('${val.name}','${val.brand}','${val.desc}','${val.price}','${seller}')" class="prod_up">Update</button>
                                    <p class="price">Rs. <span class="amount">${val.price}</span></p>
                                </div><br><br>`

            document.querySelector('#all_products').appendChild(new_div)
            }
        })

    }, (err) => {
    })

}

let delete_me=(e,seller)=>{
    console.log("Kaha",e)

    let del_this = function () {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest()

            request.addEventListener('readystatechange', function (e) {
                if (e.target.status === 200 && e.target.readyState === 4) {
                    let data = JSON.parse(e.target.responseText)
                    resolve(data)
                }
                else if (e.target.readyState === 4) {
                    reject('something went wrong')
                }
            })
            request.open('DELETE', `https://polar-hamlet-81127.herokuapp.com/products/${e}`)

            request.send()
        })
    }

    del_this().then((doc)=>{
        console.log(doc)
        get_all_seller_and_show(seller)
    }).catch(err=>{
        console.log(err)
        get_all_seller_and_show(seller)
    })
}

let update_me=(a1,a2,a3,a4,seller)=>{
    console.log('sdfsdf')
    let modal = document.querySelector('#updateProduct')
    modal.style.display = "block";
    document.querySelector('#up_name').value=a1
    document.querySelector('#up_brand').value=a2
    document.querySelector('#up_desc').value=a3
    document.querySelector('#up_price').value=a4

    document.querySelector('#cancel').onclick = function () {
        modal.style.display = "none";
    }

    document.querySelector('#updated').addEventListener("click", (e) => {
        let name = document.querySelector('#up_name').value
        let brand = document.querySelector('#up_brand').value
        let desc = document.querySelector('#up_desc').value
        let price = document.querySelector('#up_price').value

        let up_data = JSON.stringify({ name, brand, desc, price, seller })

        let del_this = function () {
            return new Promise(function (resolve, reject) {
                let request = new XMLHttpRequest()

                request.addEventListener('readystatechange', function (e) {
                    if (e.target.status === 200 && e.target.readyState === 4) {
                        let data = JSON.parse(e.target.responseText)
                        resolve(data)
                    }
                    else if (e.target.readyState === 4) {
                        reject('something went wrong')
                    }
                })
                request.open('DELETE', `https://polar-hamlet-81127.herokuapp.com/products/${name}`)

                request.send()
            })
        }

        del_this().then((doc) => {
        }).catch(err => {

            let updel = function () {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest()

                    request.addEventListener('readystatechange', function (e) {
                        if (e.target.status === 200 && e.target.readyState === 4) {
                            let data = JSON.parse(e.target.responseText)
                            resolve(data)
                        }
                        else if (e.target.readyState === 4) {
                            reject('something went wrong')
                        }
                    })
                    request.open('POST', `https://polar-hamlet-81127.herokuapp.com/products`, true)

                    request.setRequestHeader('Content-type', 'application/json');

                    request.send(up_data)
                })
            }

            updel().then((doc)=>{
                get_all_seller_and_show(seller)
                modal.style.display = "none";
            }).catch(err=>{
                get_all_seller_and_show(seller)
                modal.style.display = "none";
            })
        })
    })
}

let get_all_prod=()=>{
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest()

            request.addEventListener('readystatechange', function (e) {
                if (e.target.status === 200 && e.target.readyState === 4) {
                    let data = JSON.parse(e.target.responseText)
                    resolve(data)
                }
                else if (e.target.readyState === 4) {
                    reject('something went wrong')
                }
            })
            request.open('GET', `https://polar-hamlet-81127.herokuapp.com/products`, true)
            request.send()
        })
}

let get_all_orders=()=>{
    return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest()

            request.addEventListener('readystatechange', function (e) {
                if (e.target.status === 200 && e.target.readyState === 4) {
                    let data = JSON.parse(e.target.responseText)
                    resolve(data)
                }
                else if (e.target.readyState === 4) {
                    reject('something went wrong')
                }
            })
            request.open('GET', `https://polar-hamlet-81127.herokuapp.com/orders`, true)
            request.send()
        })
}

let get_all_customer_and_show=(customer)=>{

    get_all_prod().then((doc)=>{
        document.querySelector('#cust_heading').innerHTML +=`<h3 id="name_of_customer">${customer}</h3>`
        let all=doc.products
        all.forEach((val, ind) => {
            let new_div = document.createElement('div')

            new_div.innerHTML = `<div id="product${ind + 1}" class="product z-depth-4">
                                            <div class="product_info">
                                                <h3 class="name">${val.name}</h3>
                                                <h5 class="brand">${val.brand}</h5>
                                                <p class="desc">${val.desc}</p>
                                                <p class="price">Rs. <span class="amount">${val.price}</span></p>
                                                <p class="seller">Seller: ${val.seller}</p>
                                            </div>
                                            <div class="cart_adding">
                                                <div class="count"><i class="fa fa-minus"></i>0<i class="fa fa-plus"></i><br></div>
                                                <button>Add to cart</button>
                                            </div>
                                        </div>`

            document.querySelector('#all').appendChild(new_div)
        })

        let cart_buttons = document.querySelectorAll('.cart_adding button')

        cart_buttons.forEach((button, ind) => {
            button.addEventListener('click', (e) => {
                let id = ind + 1
                let ch_button = document.querySelector(`#product${id} .cart_adding button`)
                if (ch_button.innerHTML === 'Add to cart'){
                ch_button.innerHTML = '<i class="fa fa-check"></i> Added'
                ch_button.style.backgroundColor = 'rgb(0, 150, 0)'
                }
                else{
                ch_button.innerHTML = 'Add to cart'
                ch_button.style.backgroundColor = 'rgb(0, 235, 0)'
                }

            })
        })

        let plus_buttons = document.querySelectorAll('.cart_adding .count .fa-plus')

        plus_buttons.forEach((button, ind) => {
            button.addEventListener('click', (e) => {
                e.preventDefault()
                let id = ind + 1
                let pl_button = document.querySelector(`#product${id} .cart_adding .count`)
                let now = Number(pl_button.innerHTML[27])
                pl_button.innerHTML = `<i class="fa fa-minus"></i>${now + 1}<i class="fa fa-plus"></i><br>`
            })
        })

        let minus_buttons = document.querySelectorAll('.cart_adding .count .fa-minus')

        minus_buttons.forEach((button, ind) => {
            button.addEventListener('click', (e) => {
                let id = ind + 1
                let mi_button = document.querySelector(`#product${id} .cart_adding .count`)
                let now = Number(mi_button.innerHTML[27])
                if (now !== 0)
                    mi_button.innerHTML = `<i class="fa fa-minus"></i>${now - 1}<i class="fa fa-plus"></i><br>`
            })
        })
    })

    let rev = document.querySelector('#review_button')

    rev.addEventListener('click', (e)=>{
        show_review_page(customer)
    })
    
}

let show_review_page=(cust_name)=>{
    document.querySelector('#customer_page').style.display="none"
    document.querySelector('#review_page').style.display = "block"

    get_all_orders().then((doc)=>{
        let orders=doc.orders
        orders.forEach((val,ind)=>{
            if(val.cust_name===cust_name){
                let bou_prod=val.products
                bou_prod.forEach((v,i)=>{
                    let new_div=`<div id="rev${i+1}" class="rev"><br>
                                    <h5>${v}</h5><br>
                                    <input class="rev_rev" type="text" placeholder="Enter review" /><br>
                                    <input class="rev_rate" type="number" placeholder="Enter rating" /><br>
                                    <button id="rev${i+1}b" class="up_rev">Submit</button>
                                </div>`
                    
                    document.querySelector('#all_to_review').innerHTML+=new_div
                })

            }
        })
        let rev_buttons = document.querySelectorAll('.up_rev')
        rev_buttons.forEach((value, index) => {
            value.addEventListener('click', (e) => {
                console.log(e.target.id)
                let idp = e.target.id.slice(0, e.target.id.length - 1);

                let fpro=document.querySelector(`#${idp} h5`).innerHTML
                let fpro_review=document.querySelector(`#${idp} .rev_rev`).value
                let fpro_rating=document.querySelector(`#${idp} .rev_rate`).value
                update_review(fpro,fpro_review,fpro_rating)
            })
        })
    })

    document.querySelector('#rev_all_done').addEventListener('click',(e)=>{
        document.querySelector('#customer_page').style.display = "block"
        document.querySelector('#review_page').style.display = "none"
    })
}

update_review=(product,review,rating)=>{
    let uprev = function () {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest()

            request.addEventListener('readystatechange', function (e) {
                if (e.target.status === 200 && e.target.readyState === 4) {
                    let data = JSON.parse(e.target.responseText)
                    resolve(data)
                }
                else if (e.target.readyState === 4) {
                    reject('something went wrong')
                }
            })
            request.open('POST', `https://polar-hamlet-81127.herokuapp.com/feedback`, true)

            request.setRequestHeader('Content-type', 'application/json');
            let obj={
                product_name:product,
                review,rating
            }
            let data=JSON.stringify(obj)
            request.send(data)
        })
    }

    uprev().then((doc) => {
    }).catch(err => {
    })
}

let get_all_users=()=>{
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest()

            request.addEventListener('readystatechange', function (e) {
                if (e.target.status === 200 && e.target.readyState === 4) {
                    let data = JSON.parse(e.target.responseText)
                    resolve(data)
                }
                else if (e.target.readyState === 4) {
                    reject('something went wrong')
                }
            })
            request.open('GET', `https://polar-hamlet-81127.herokuapp.com/users`)
            request.send()
        })
}

let new_product_add = function (name,brand,desc,price,seller) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest()

        request.addEventListener('readystatechange', function (e) {
            if (e.target.status === 200 && e.target.readyState === 4) {
                let data = JSON.parse(e.target.responseText)
                resolve(data)
            }
            else if (e.target.readyState === 4) {
                reject('something went wrong')
            }
        })
        request.open('POST', `https://polar-hamlet-81127.herokuapp.com/products`, true)

        request.setRequestHeader('Content-type', 'application/json');

        let data = JSON.stringify({ name, brand, desc, price, seller})
        request.send(data)
    })
}

let new_order_add = function(new_order){
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest()

        request.addEventListener('readystatechange', function (e) {
            if (e.target.status === 200 && e.target.readyState === 4) {
                let data = JSON.parse(e.target.responseText)
                resolve(data)
            }
            else if (e.target.readyState === 4) {
                reject('something went wrong')
            }
        })
        request.open('POST', `https://polar-hamlet-81127.herokuapp.com/orders`, true)

        request.setRequestHeader('Content-type', 'application/json');

        let data = JSON.stringify(new_order)
        request.send(data)
    })
}

let go_on_to_the_cart=(name,prod,quan)=>{
    document.querySelector('#customer_page').style.display="none"
    document.querySelector('#cart_page').style.display = "block"   

    let tp=0
    let tc=0
    get_all_prod().then((doc)=>{
        let all_products=doc.products
        prod.forEach((val,ind)=>{
                let des=all_products.find((pro)=>{
                    return pro.name===val
                })
                document.querySelector('#all_selected').innerHTML +=`<div id="product${ind+1}" class="product z-depth-4">
                                                                        <div class="product_info">
                                                                            <h3 class="name">${des.name}</h3>
                                                                            <h5 class="brand">${des.brand}</h5>
                                                                            <p class="price">Quantity <span class="amount">${quan[ind]}</span></p>
                                                                            <p class="price">Total: Rs. <span class="amount">${des.price*quan[ind]}</span></p>
                                                                        </div>
                                                                    </div>`
                tp=tp+des.price*quan[ind]
                tc=tc+quan[ind]
        })
        document.querySelector('#totals').innerHTML +=`<h3>Total price: <span class="total">${tp}</span></h3><br>
                                                       <h3>Total quantity: <span class="total">${tc}</span></h3><br>`


        document.querySelector('#go_to_ship').addEventListener('click', (e) => {
            document.querySelector('#cart_page').style.display="none"
            document.querySelector('#ship_page').style.display = "block"

            document.querySelector('#bas_kar').addEventListener('click',(e)=>{
                let ship_address=document.querySelector('#addr_ship').value

                let new_order={
                    cust_name:name,
                    quantity:tc,
                    price:tp,
                    ship_address,
                    products:prod
                }

                new_order_add(new_order)
            })
        })

    })
}

document.querySelector('#login_button').addEventListener('click',(e)=>{
    let flag=0

    get_all_users().then((doc) => {
        let users=doc.users
        let u = document.querySelector('#username').value
        let p = document.querySelector('#password').value
        users.forEach((val, ind) => {
            if (val.username === u && val.password === p && val.type==='customer') {
                flag = 1
                document.querySelector('#login_page').style.display="none"
                document.querySelector('#customer_page').style.display = "block"
                let cust_name=val.name
                //Customer

                get_all_customer_and_show(cust_name)

                document.querySelector('#go_to_cart').addEventListener('click',(e)=>{
                    let selected_products=[]
                    let quan=[]

                    let prod = document.querySelectorAll('.product')
                    prod.forEach((val, ind) => {
                        let c=document.querySelector(`#product${ind+1} .cart_adding .count`).textContent
                        let d = document.querySelector(`#product${ind + 1} .cart_adding button`).textContent.trim()
                        let n = document.querySelector(`#product${ind + 1} .product_info .name`).textContent
                        if(d==='Added' && Number(c)>0){
                            selected_products.push(n)
                            quan.push(Number(c))
                        }
                    })

                    go_on_to_the_cart(cust_name,selected_products,quan)
                })
            }
            if (val.username === u && val.password === p && val.type==='seller') {
                flag = 1
                document.querySelector('#login_page').style.display = "none"
                document.querySelector('#seller_page').style.display = "block"
                let sel_name=val.name
                document.querySelector('#sel_heading').innerHTML +=`<h3 id="name_of_seller">${sel_name}</h3>`
                get_all_seller_and_show(sel_name)
                //Seller
                let modal=document.querySelector('#addProduct')
                document.querySelector('#add_button').onclick = function () {
                    modal.style.display = "block";
                }
                document.querySelector('#cancel').onclick = function () {
                    modal.style.display = "none";
                }

                document.querySelector('#added').addEventListener("click", (e) => {
                    modal.style.display = "none";

                    let newee_name = document.querySelector('#new_name').value
                    let newee_brand = document.querySelector('#new_brand').value
                    let newee_desc = document.querySelector('#new_desc').value
                    let newee_price = document.querySelector('#new_price').value

                    new_product_add(newee_name, newee_brand, newee_desc, newee_price, sel_name).then((doc) => {
                        get_all_seller_and_show(sel_name)  
                    })
                })

            }
        })
        if (flag === 0) {
            alert("You don't have an account. Please sign up.")
        }
    }, (err) => {
    })
})


