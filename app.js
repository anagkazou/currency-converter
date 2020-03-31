

//console.log(data);
let dropdown1 = document.getElementById("convert-from");
let dropdown2 = document.getElementById("convert-to");
let amount = document.getElementById("amount");
let convertButton = document.getElementById("convert-button")
//  "https://api.exchangeratesapi.io/latest?base=USD ";
//"http://data.fixer.io/api/latest?access_key=5b2d17c9e871b87d91f00c86244fc91d";


var UIController = (() => {

  //Populate DropDown menus
  (function populateSelectTag() {
    let option;

    for (let i = 0; i < myData.length; i++) {
      option = document.createElement("option");
      var obj = myData[i];
      option.text = obj.name;
      option.value = obj.code;
      //console.log(option.value)
      dropdown1.appendChild(option);
      let itm =dropdown1.lastChild;
      let cln = itm.cloneNode(true);
      dropdown2.appendChild(cln);
    }
  })();

  // populateSelectTag();
})();



var dataController = (function() {
  //var baseValue = dropdown1.value;
//console.log(baseValue);

function getBaseValue(){
  return dropdown1.value;
}

function getTargetValue(){
  return dropdown2.value;
}

function getAmount(){
return amount.value;
}
 


  

  function convert(){
    var fixer =
    "https://prime.exchangerate-api.com/v5/5bdbc7c39658f1b8d871e4e8/latest/" + getBaseValue();
    console.log(fixer)
    fetch(fixer).then(function(response){
    // targetCurrency = getTargetValue();
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;}
        
        response.json().then(function (apiData){
          let conversionRates = apiData.conversion_rates;
          let amount = getAmount();
         console.log(amount * conversionRates[getTargetValue()]);
         
        })
    })
  }
  convertButton.addEventListener('click', convert )
})();
var controller = (function(dataCtrl) {

  //console.log(data);
})();
