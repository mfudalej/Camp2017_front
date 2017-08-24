// Summary

const getSummary = (endpoint, containers) => {

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
};

const containers = {
    balance: '#balance-box',
    funds: '#available-box',
    payments: '#scheduled-payments-box'
};

getSummary("data/summary", containers);

// Products

const getProducts = () => {

    $.get("https://efigence-camp.herokuapp.com/api/data/products", data => {

        const productsList = data.content;




        productsList.forEach((element, index) => {
            let iconName = element.type.toLowerCase().replace(/\s/g, '');

            const productTemplate = `
                <div class="product${index}">
                    <div class="img-box">
                        <span class="icon-${iconName}"></span>
                    </div>
                    <div class="info-box">
                        <ul class="info">
                            <li id ="type">${element.type}</li>
                            <p><span id="amount"></span>${element.amount}<span id="currency"></span> ${element.currency}</li>
                        </ul>
                    </div>
                </div>`;

            $(".products-box").append(productTemplate);
        });
    });
};

getProducts();

// History

const getHistory = () => {

    $.get("https://efigence-camp.herokuapp.com/api/data/history", data => {

        const historyList = data.content;

        historyList.forEach((element, index) => {

            let historyAmount = element.amount;
            if (element.status === 'outcome') {
                historyAmount = '-'+ historyAmount;
            }

            let historyDate = element.date.slice(-5);

            const historyTemplate = `
                <li>
                     <span class="date">${historyDate}</span>
                     <span class="info-box">
                         <span class="info-text">${element.description}</span>
                         <select class="info-type" name="type">
                             <option value="${element.category}">${element.category}</option> 
                             <option value="volvo">Gas</option>
                             <option value="saab">Cash</option>
                             <option value="fiat">Salary</option>
                             <option value="audi">Food</option>
                             <option value="audi">Fun</option>
                         </select>
                     </span>
                     <span class="price ${element.status}"><span class="bold-font">${historyAmount}</span> ${element.currency}</span>
                 </li>`;

            $(".history-list").append(historyTemplate);
        });
    });
};

getHistory();

// SWITCH BUTTON

$('.switch-paddle').click(function() {

    $('.img').toggleClass('hide');
    $('.chart-box').toggleClass('hide');


});