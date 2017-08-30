$(document).ready(function() {

    function getData() {
        $.get("https://efigence-camp.herokuapp.com/api/data/history", data => {

            const historyList = data.content;
            var currentBalance = document.querySelector('#balance-box').innerText;
            var sum = 0;

            historyList.forEach((el, i) => {

                var kwota = el.amount;

                if (el.status === 'outcome') {  // Konwersja formatu kwoty.
                    kwota = parseInt('-' + el.amount);
                }
                sum += kwota;     // Obliczenie sumy przychodów i wydatków.
            });

            var startBalance = currentBalance - sum;
            var suma = 0;

            data = historyList.map(function(el, i) {

                if (el.status === 'outcome') {  // Konwersja formatu kwoty.
                    el.amount = parseInt('-'+ el.amount);
                }
                el.date = el.date.slice(-5).replace("-", ".");    // Konwersja formatu daty.

                suma += el.amount;

                el.balance = startBalance + suma;

                el.x = el.date;
                el.value = el.balance;
            });

            function areaChart() {
                //areaChart
                let areaChart = anychart.area();

                // turn on chart animation
                areaChart.animation(true);

                // Labels position
                areaChart.xAxis().labels().offsetY(-30);
                areaChart.xAxis().ticks().position("inside");

                areaChart.yAxis().labels().offsetX(60).offsetY(10);
                areaChart.yAxis().drawFirstLabel(false);
                areaChart.yAxis().ticks().position("inside");

                // chart grid
                areaChart.grid(1);

                let series = areaChart.splineArea(historyList);
                series.color('Gold 0.5');
                series.type('circle')
                    .hoverMarkers().enabled(false);
                series.tooltip().enabled(false);
                //                .hoverLabels(false);

                areaChart.padding().left(-35)
                    .right(10)
                    .top(5)
                    .bottom(-20);

                // set container id for the chart
                areaChart.container('chart');

                // initiate chart drawing
                areaChart.draw();
            }
            areaChart();

            function balanceDonut() {

                // data
                let incomeSum = 0;
                let outcomeSum = 0;
                let data;

                historyList.map(function(el, i) {

                    if (el.status === "income") {
                        incomeSum += el.amount;
                    } if (el.status === "outcome") {
                        outcomeSum += el.amount;
                    }
                });

                data = ([
                    ['Income', incomeSum],
                    ['Outcome', Math.abs(outcomeSum)]
                ]);

                let chart = anychart.pie(data);

                var background = chart.background();
                background.fill("#ffffff", 0);
                chart.innerRadius("50%");
                chart.labels().position('outside');
                chart.labels().fontFamily("roboto_condensedlight");
                chart.labels().fontSize(18);
                chart.labels().format("{%X}");
                chart.labels().hAlign("center");
                chart.connectorStroke({color: "#000"});
                chart.legend(false);
                chart.container("balance-chart");
                chart.animation(true);
                chart.draw();

                let balance = document.querySelector('.balance-amount');
                balance.innerText = currentBalance + ' PLN';
            }
            balanceDonut();

            function expencesDonut() {

                // data
                let cashSum = 0, gasSum = 0, foodSum = 0, data;

                historyList.map(function(el, i) {

                    if (el.status === 'outcome' && el.category === "Cash") {
                        cashSum += el.amount;
                    } if (el.status === 'outcome' && el.category === "Gas") {
                        gasSum += el.amount;
                    } if (el.status === 'outcome' && el.category === "Food") {
                        foodSum += el.amount;
                    }
                });

                data = ([
                    ['Cash', Math.abs(cashSum)],
                    ['Gas', Math.abs(gasSum)],
                    ['Food', Math.abs(foodSum)]
                ]);

                let chart = anychart.pie(data);

                var background = chart.background();
                background.fill("#ffffff", 0);
                chart.innerRadius("50%");
                chart.labels().position('outside');
                chart.labels().fontFamily("roboto_condensedlight");
                chart.labels().fontSize(18);
                chart.labels().format("{%X}");
                chart.labels().hAlign("center");
                chart.connectorStroke({color: "#000"});
                chart.legend(false);
                chart.container("expences-chart");
                chart.animation(true);
                chart.draw();
                let expenceAmount = cashSum + gasSum + foodSum;

                let expences = document.querySelector('.expences-summary-amount');
                expences.innerText =  expenceAmount +' PLN';
            }
            expencesDonut();

            function incomeDonut() {

                // data
                let cashSum = 0, gasSum = 0, foodSum = 0, data;

                historyList.map(function(el, i) {

                    if (el.status === 'income' && el.category === "Cash") {
                        cashSum += el.amount;
                    } if (el.status === 'income' && el.category === "Gas") {
                        gasSum += el.amount;
                    } if (el.status === 'income' && el.category === "Food") {
                        foodSum += el.amount;
                    }
                });

                data = ([
                    ['Cash', cashSum],
                    ['Gas', gasSum],
                    ['Food', foodSum]
                ]);

                let chart = anychart.pie(data);

                var background = chart.background();

                // Set fill with opacity.
                background.fill("#ffffff", 0);
                chart.innerRadius("50%");
                chart.labels().position('outside');
                chart.labels().fontFamily("roboto_condensedlight");
                chart.labels().fontSize(18);
                chart.labels().format("{%X}");
                chart.labels().hAlign("center");
                chart.connectorStroke({color: "#000"});
                chart.legend(false);
                chart.animation(true);
                chart.container("income-chart");

                let incomeAmount = cashSum + gasSum + foodSum;

                let income = document.querySelector('.income-summary-amount');
                income.innerText =  incomeAmount +' PLN';

                chart.draw();
            }
            incomeDonut();

            // const income = $('.income-chart');
            // const expence = $('.expences-chart');
            // const balance = $('.balance-chart');
            //
            // console.log(box);
            //
            // $('.income-button').click(function () {
            //     incomeDonut();
            // });
            //
            // $('.expences-button').click(function () {
            //     // expencesDonut();
            // });
            //
            // $('.balance-button').click(function() {
            //     // balanceDonut();
            // });
        });
    }
    getData();
});