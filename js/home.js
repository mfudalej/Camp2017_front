const getSummary = (endpoint, containers) => {

// (function(){
    const balance = document.querySelector(containers.balance);
    const funds = document.querySelector(containers.funds);
    const payments = document.querySelector(containers.payments);

    $.get("https://efigence-camp.herokuapp.com/api/" + endpoint, data => {
        const balanceValue = data.content[0].balance;
        const fundsValue = data.content[0].funds;
        const paymentsValue = data.content[0].payments;

        balance.innerText = balanceValue;
        funds.innerText = fundsValue;
        payments.innerText = paymentsValue;
    });
// }());
};

const containers = {
    balance: '#balance-box',
    funds: '#available-box',
    payments: '#scheduled-payments-box'
};

getSummary("data/summary", containers);

// Products



// const getProducts = () => {
//
//     const type = document.querySelector(productsContainers.type);
//     const amount = document.querySelector(productsContainers.amount);
//     const currency = document.querySelector(productsContainers.currency);
//
//
//     $.get("https://efigence-camp.herokuapp.com/api/data/products" + endpoint, data => {
//         const typeValue = data.content[0].value;
//         const amountValue = data.content[0].amount;
//         const paymentsCurrency = data.content[0].currency;
//
//         balance.innerText = balanceValue;
//         amount.innerText = amountValue;
//         currency.innerText = paymentsCurrency;
//     });
// };
//
// const productsContainers = {
//     type: '#type',
//     amount: '#amount',
//     currency: '#currency'
// };

const getProducts = () => {

    const productsContainer = document.querySelector('.products-box');

    $.get("https://efigence-camp.herokuapp.com/api/data/products", data => {

        const productsList = data.content;
        const productTemplate = (data) => {

            let icon;

            switch(data.type) {
                case "Wallet":
                    icon = "ikonka portfela";
                break;
                case "Deposit":
                    icon = "ikonka depozytu";
                break;
                case "Accounts":
                    icon = "ikonka Kont";
                break;
                case "Founds":
                    icon = "ikonka środków";
                break;
                default:
                    icon = "ikonka domyślna";
            }

            return `
            <div class="product${index}">
                    <div class="img-box">
                        <img src="img/wallet.png" alt="">${icon}
                    </div>
                    <div class="info-box">
                        <ul class="info">
                            <li id ="type">${element.type}</li>
                            <p><span id="amount"></span>${element.amount}<span id="currency"></span>${element.currency}</li>
                        </ul>
                    </div>
                </div>`;
        };

        productsList.forEach((element, index) => {
            console.log(`Iteracja: ${index}`, element);


            // productsContainer.innerHTML += productTemplate;
            $(".products-box").append('beforeend', productTemplate);
        });



        // console.log(data.content);
        //
        // for (let i = 0, l = data.content.length; i < l; i ++) {
        //     console.log(i, data.content[i])
        //
        // }
    });

};

const productsContainers = {
    type: '#type',
    amount: '#amount',
    currency: '#currency'
};

getProducts();

// <ul>
//     <li>Type: ${element.type}</li>
//     <li>Amount: ${element.amoint} ${element.currency}</li>
// </ul>
// const productTemplate = `
//                 <div class="product${index}">
//                     <div class="img-box">
//                         <img src="img/wallet.png" alt="">
//                     </div>
//                     <div class="info-box">
//                         <ul class="info">
//                             <li id ="type">${element.type}</li>
//                             <p><span id="amount"></span>${element.amount}<span id="currency"></span>${element.currency}</li>
//                         </ul>
//                     </div>
//                 </div>`;