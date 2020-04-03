

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
      let obj = myData[i];
      option.text = obj.name;
      option.value = obj.code;
      //console.log(option.value)
      dropdown1.appendChild(option);
      let itm =dropdown1.lastChild;
      let cln = itm.cloneNode(true);
      dropdown2.appendChild(cln);
    }
   })();

   let output = {
    initialValue: document.getElementById("initial-amount"),
    initialCurrency:document.getElementById('initial-currency'),
    finalValue: document.getElementById('final-amount'),
    finalCurrency: document.getElementById('final-currency') 
    }
    let dataCntrl = dataController;

  return{
     getBaseValue: ()=>{
      return dropdown1.value;
    },

    getBaseCurrency: ()=>{
      return dropdown1.options[dropdown1.selectedIndex].text;
    },
    
    getTargetValue: ()=>{
      return dropdown2.value;
    },

    getFinalCurrency: ()=>{
      return dropdown2.options[dropdown2.selectedIndex].text;
    },
    
     getAmount: ()=>{
    return amount.value;
    },

     findCurrencySymbol: (data)=>{
      for (let i = 0; i < myData.length; i++) {
        if (myData[i].code === data) {
          return myData[i].symbol_native;
        }
      }
    },

    displayResult: function(){
      output.initialValue.textContent = this.findCurrencySymbol(this.getBaseValue()) + " " + dataController.data.initialValue;
      output.initialCurrency.textContent = this.getBaseCurrency();
      output.finalValue.textContent = this.findCurrencySymbol(this.getTargetValue()) + " " +  dataController.data.finalValue;
      output.finalCurrency.textContent= this.getFinalCurrency();
    }
  }
})(dataController);



var controller = (function() {
  //var baseValue = dropdown1.value;
//console.log(baseValue);

    let uiCntrl = UIController;


  

  function convert(){
    var fixer =
    "https://prime.exchangerate-api.com/v5/5bdbc7c39658f1b8d871e4e8/latest/" + uiCntrl.getBaseValue();
    console.log(fixer)
    fetch(fixer).then(function(response){
    // targetCurrency = getTargetValue();
    let dataCntrl = dataController;
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;}
        
        response.json().then(function (apiData){
          let conversionRates = apiData.conversion_rates;
          let amount =uiCntrl.getAmount();
         console.log();
         
         
                 
        
        dataCntrl.data.initialValue=Number(amount).toFixed(2);
        dataCntrl.data.finalValue = Number(amount * conversionRates[uiCntrl.getTargetValue()]).toFixed(2);
         uiCntrl.displayResult();

        })
    })
  }
  convertButton.addEventListener('click', convert )
})(dataController, UIController);


var dataController = (function(dataCtrl) {

  return{  data : {
    initialValue:0,
    initialCurrency: "",
    finalValue:0,
    finalCurrency:""

  }
  }
  //console.log(data);
})(UIController);
