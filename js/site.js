

function getData(){
    let amount = parseInt(document.getElementById("loanAmt").value);

    let term = parseInt(document.getElementById("term").value);

    let intRate = parseFloat(document.getElementById("intRate").value);

    let data = createObj(amount, term, intRate);

    displayData(data,term);

}

function calculateMonthlyPayment(amount, term, rate){

        let monthlyPayment = ((amount)*(rate/1200))/(1-Math.pow((1+rate/1200),-term));

        return monthlyPayment;
}

function interest(previousRemainingBalance,rate){
    let interestPayment = previousRemainingBalance*(rate/1200);
    return interestPayment;
}

function principle(totalMonthly,interestPayment){
    let principlePayment = totalMonthly - interestPayment;
    return principlePayment;
}

function remainingBalance(previousRemainingBalance, principlePayment){
    let remainingBalance = previousRemainingBalance - principlePayment;
    return remainingBalance;
}

function createObj(amount, term, rate){

    let tableObj = {};
    let balance = amount;
    
    for (let index = 0; index < term; index++) {
        tableObj[index] = [];
        tableObj[index].month=index+1;
        tableObj[index].payment = calculateMonthlyPayment(amount,term,rate);
        if(index == 0){
            balance = amount;
            tableObj[index].totalInterest = interest(balance,rate);
        }else{
            balance = tableObj[index-1].balance;
            tableObj[index].totalInterest = interest(balance,rate)+tableObj[index-1].totalInterest;
        }
        tableObj[index].principle=principle(tableObj[index].payment, interest(balance,rate));
        tableObj[index].interest = interest(balance,rate);
        tableObj[index].balance = remainingBalance(balance,tableObj[index].principle);

    }

    return tableObj;

}

function displayData(createObj,term){
    let dataTemplate = document.getElementById("data-template");
    let dataBody = document.getElementById("infoBody");
    dataBody.innerHTML = "";
    let monthly = document.getElementById("monthlyPayment");
    monthly.innerHTML = createObj[0].payment.toLocaleString();

    let totalPrinciple = 0;
    let totalInterest = createObj[term-1].totalInterest;
    let totalCost = (createObj[term-1].month)*createObj[0].payment;
    for(let i = 0; i < term;i++){
        totalPrinciple += createObj[i].principle;
    }
    document.getElementById("totalPrincipal").innerHTML=totalPrinciple.toLocaleString(
        "en-US",{
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );
    document.getElementById("totalInterest").innerHTML = totalInterest.toLocaleString(
        "en-US",{
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );
    document.getElementById("totalCost").innerHTML = totalCost.toLocaleString(
        "en-US",{
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

    

    for (let index = 0; index < term; index++) {
        
        let dataNode = document.importNode(dataTemplate.content, true);

        let dataItems = dataNode.querySelectorAll("td");

        dataItems[0].textContent = createObj[index].month.toLocaleString();
        dataItems[1].textContent = createObj[index].payment.toLocaleString(
            "en-US",{
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
        dataItems[2].textContent = createObj[index].principle.toLocaleString(
            "en-US",{
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
        dataItems[3].textContent = createObj[index].interest.toLocaleString(
            "en-US",{
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
        dataItems[4].textContent = createObj[index].totalInterest.toLocaleString(
            "en-US",{
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
        dataItems[5].textContent = createObj[index].balance.toLocaleString(
            "en-US",{
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

        dataBody.appendChild(dataNode);
        
    }

}