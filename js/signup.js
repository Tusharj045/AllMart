let cu = document.querySelector('#cust_open_button')
let se = document.querySelector('#sell_open_button')

document.querySelector('#signup_customer').style.display="none"
document.querySelector('#signup_seller').style.display = "none"

cu.addEventListener('click', (e) => {
    document.querySelector('#signup_customer').style.display = "block"
    document.querySelector('#signup_seller').style.display = "none"
})

se.addEventListener('click', (e) => {
    document.querySelector('#signup_customer').style.display = "none"
    document.querySelector('#signup_seller').style.display = "block"
})

document.querySelector('#login_button_cust').addEventListener('click',(e)=>{
    let p1 = document.querySelector('#a66').value
    let p2 = document.querySelector('#a77').value
    if(p1!==p2){
        alert("Password and confirm password are different")
    }
    else{
        let a1 = document.querySelector('#a11').value
        let a2 = document.querySelector('#a22').value
        let a3 = document.querySelector('#a33').value
        let a4 = document.querySelector('#a44').value
        let a5 = document.querySelector('#a55').value
        let a6 = document.querySelector('#a66').value

        let new_cu={name:a1,city:a3,zip_code:a4,contact:a5}
        let new_user={username:a2,password:a6,type:'customer',name:a1}

        console.log(new_cu)
        console.log(new_user)

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
                request.open('POST', `https://polar-hamlet-81127.herokuapp.com/customers`, true)

                request.setRequestHeader('Content-type', 'application/json');

                let data = JSON.stringify(new_cu)
                request.send(data)
            })
        }

        ge().then((doc) => {
            console.log(doc)

            let gge = function () {
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
                    request.open('POST', `https://polar-hamlet-81127.herokuapp.com/users`, true)

                    request.setRequestHeader('Content-type', 'application/json');

                    let data = JSON.stringify(new_user)

                    request.send(data)
                })
            }

            gge().then((doc) => {
                console.log(doc)
                window.location = "all_after_login.html"
            }, (err) => {
                console.log(err)
            })
        }, (err) => {
            console.log(err)
        })
    }
})

document.querySelector('#login_button_sell').addEventListener('click', (e) => {
    let p1 = document.querySelector('#a5').value
    let p2 = document.querySelector('#a6').value
    if (p1 !== p2) {
        alert("Password and confirm password are different")
    }
    else {
        let a1 = document.querySelector('#a1').value
        let a2 = document.querySelector('#a2').value
        let a3 = document.querySelector('#a3').value
        let a4 = document.querySelector('#a4').value
        let a5 = document.querySelector('#a5').value

        let new_se = { name: a1, address: a3, contact: a4 }
        let new_user = { username: a2, password: a5, type: 'seller', name: a1 }

        console.log(new_se)
        console.log(new_user)

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
                request.open('POST', `https://polar-hamlet-81127.herokuapp.com/sellers`, true)

                request.setRequestHeader('Content-type', 'application/json');

                let data = JSON.stringify(new_se)
                request.send(data)
            })
        }

        ge().then((doc) => {
            console.log(doc)

            let gge = function () {
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
                    request.open('POST', `https://polar-hamlet-81127.herokuapp.com/users`, true)

                    request.setRequestHeader('Content-type', 'application/json');

                    let data = JSON.stringify(new_user)

                    request.send(data)
                })
            }

            gge().then((doc) => {
                console.log(doc)
                window.location = window.location = "all_after_login.html"
            }, (err) => {
                console.log(err)
            })
        }, (err) => {
            console.log(err)
        })
    }
})