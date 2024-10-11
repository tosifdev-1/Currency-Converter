let BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


let Dropdowns= document.querySelectorAll("select");
let btn = document.querySelector("button");
let toCurr = document.querySelector(".To select");//access the To currency
let fromCurr = document.querySelector(".From select");// access the From currency

for(let select of Dropdowns){
    for(currCode in countryList){
   let newOption = document.createElement("option");
   newOption.innerText=currCode;
  select.prepend(newOption);
  //add condition to make dropdowns default
  if(select.name === "from" && currCode === "INR"){
newOption.selected = true;
  } else if(select.name === "to" && currCode === "USD"){
    newOption.selected = true;
  }
    }  
    //adding change event to the dropdowns
    select.addEventListener("change",(evt)=>{
 updatFlag(evt.target);
    });
}

const updatFlag = ((element)=>{
//extracting the countrylist from the select option
let countrycode = element.value; // access the value of countrycode from select tag
let courrCode = countryList[countrycode];
//change the flag using countryList variable
let imglink = `https://flagsapi.com/${courrCode}/flat/64.png`;
//access the img tag to change the flag
let img = element.parentElement.querySelector("img");
//add the countryimglink variable in image src 
img.src=imglink;
});

//add function to access the input value
btn.addEventListener("click",(event)=>{
    event.preventDefault();
let amount = document.querySelector("input");
let amountVal = parseFloat(amount.value);
console.log(toCurr ,fromCurr);
//add the reset function in button
let fromCurrency= document.querySelector(".From select").value;
console.log(amountVal);
if(amountVal === "" || amountVal < 1){
  console.log("invalid input");
  amount.value="1";
}
else{
  console.log("valid input");
}
let BASE = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

let getConvert = async()=>{
  let response = await fetch(BASE);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  console.log("exchange rate", rate)
  let finalAmount = rate * amountVal;
  let para = document.querySelector(".msg p");
  para.innerText = `${amountVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;
}

getConvert();

}


);

