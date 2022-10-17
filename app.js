const bill = document.getElementById('bill-input');
const billBtns = document.querySelectorAll('.tip');
const custom = document.getElementById('btn-input');
const people = document.getElementById('people-input');
const errorMsg = document.querySelector('.error-msg')
const result = document.querySelectorAll('.value')
const resetBtn = document.querySelector('.reset');


bill.addEventListener('input', setBillValue);


billBtns.forEach(btn => {
    btn.addEventListener('click',handleClick);
})

custom.addEventListener('input',setCustom);

people.addEventListener('input',SetPeopleValue);

resetBtn.addEventListener('click',reset)


/* Default Values */
let billvalue = 0.0;
let tipValue = 0.15;
let peopleValue = 1;


function validateFloat(s){
    const rgx= /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInp(s){
    const rgx= /^[0-9]*$/;
    return s.match(rgx);
}

function setBillValue(){
    if(bill.value.includes(',')){
        bill.value = bill.value.replace(',','.');
    }

    if(!validateFloat(bill.value)){
        bill.value = bill.value.substring(0,bill.value.length-1);
        
    }
    billvalue = parseFloat(bill.value);
    calculatorTip();
}


/* BTN function */

function handleClick(event){
    billBtns.forEach(btn => {
        btn.classList.remove('active');
        if(event.target.innerHTML == btn.innerHTML){
            btn.classList.add('active');
            tipValue = parseFloat(btn.innerHTML)/100;
        }
    });

    custom.value = '';

    calculatorTip();
    
}

/* Custom Value function */

function setCustom(){
    if(!validateInp(custom.value)){
        custom.value = custom.value.substring(0, custom.value.length -1);
    }
    tipValue = parseFloat(custom.value/100)
    
    billBtns.forEach(btn => {
        btn.classList.remove('active')
    });

    if(custom.value !== ''){
        calculatorTip()
    }
}

/* People Value Function */

function SetPeopleValue(){
    if(!validateInp(people.value)){
        people.value = people.value.substring(0, people.value.length -1);
    }
    peopleValue = parseFloat(people.value);

    if(peopleValue <= 0){
        errorMsg.classList.add('show-error-msg');
        setTimeout(function(){
            errorMsg.classList.remove('show-error-msg')
        }, 3000);
    }

    calculatorTip();
}


/* Calculator function */ 

function calculatorTip(){
    if(peopleValue >=1){
        let tipAmount = billvalue * tipValue / peopleValue;
        let total = billvalue *(tipValue + 1 )/ peopleValue;
        result[0].innerHTML = '$' + tipAmount.toFixed(3);
        result[1].innerHTML = '$' + total.toFixed(3);
    }
}

/* Reset Function */

function reset(){
    bill.value = '0.0';
    setBillValue();

    billBtns[2].click();

    peopleValue = '1';
    SetPeopleValue();
}