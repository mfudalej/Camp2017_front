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

        let noElements;

        if (element.elements === 0) {
            noElements = 'hide';
        } else {
            noElements = '';
        }

            const productTemplate = `
                <div class="product product${index}">
                    <div class="img-box">
                        <span class="icon icon-${iconName}">
                            <span class="elements-info ${noElements}">${element.elements}</span>
                        </span>
                    </div>
                    <div class="info-box">
                        <ul class="info">
                            <li id ="type">${element.type}</li>
                            <p class="amount-paragraph"><span id="amount"></span>${element.amount}<span id="currency"></span> ${element.currency}</li>
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
                <li class="history-list-el">
                     <span class="date">${historyDate}</span>
                     <span class="info-box">
                         <span class="info-text">${element.description}</span>
                         <select class="info-type" name="type">
                             <option value="${element.category}">${element.category}</option> 
                             <option value="gas">Gas</option>
                             <option value="cash">Cash</option>
                             <option value="salary">Salary</option>
                             <option value="food">Food</option>
                             <option value="fun">Fun</option>
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
    $('.graph-box').toggleClass('hide');
    $('.analysis-box').toggleClass('hide');
});

// ANALYSIS MENU
function chartSwitch(chartShow, chartHide, chartHide2) {
    if (chartShow.hasClass('hide')) {
        chartShow.removeClass('hide');
        if (!(chartHide.hasClass('hide'))) {
            chartHide.addClass('hide');
        }
        if (!chartHide2.hasClass('hide')) {
            chartHide2.addClass('hide');
        }
    }
}

const income = $('.income-chart');
const expence = $('.expences-chart');
const balance = $('.balance-chart');

$('.income-button').click(function () {
    chartSwitch(income, expence, balance);
});

$('.expences-button').click(function () {
    chartSwitch(expence, income, balance);
});

$('.balance-button').click(function() {
    chartSwitch(balance, income, expence);
});

// SEARCH INPUT

$('.home-search-input').blur(function(){
    $(this).val('');
});

// FOUNDATION

$(document).foundation();

// STICKY NAV

$('.title-bar').on('sticky.zf.stuckto:top', function(){
    $(this).addClass('shrink');
}).on('sticky.zf.unstuckfrom:top', function(){
    $(this).removeClass('shrink');
});

// CHARTS
