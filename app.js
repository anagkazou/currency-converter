//console.log(data);
let dropdown1 = document.getElementById("convert-from");
let dropdown2 = document.getElementById("convert-to");
let amount = document.getElementById("amount");
let convertButton = document.getElementById("convert-button");

var UIController = (() => {
  //Populate <select/> dropdown options
  (function populateSelectTag() {
    let option;

    for (let i = 0; i < myData.length; i++) {
      option = document.createElement("option");
      let obj = myData[i];
      option.text = obj.name;
      option.value = obj.code;

      dropdown1.appendChild(option);
      let itm = dropdown1.lastChild;
      let cln = itm.cloneNode(true);
      dropdown2.appendChild(cln);
    }
  })();

  let output = {
    initialValue: document.getElementById("initial-amount"),
    initialCurrency: document.getElementById("initial-currency"),
    finalValue: document.getElementById("final-amount"),
    finalCurrency: document.getElementById("final-currency"),
    summary: document.getElementById("summary"),
    checkSign: document.getElementById("check-sign"),
  };
  let dataCntrl = dataController;

  return {
    //These are returned to make them accessible
    // to the other modules of the app.
    getAmount: function () {
      return amount.value;
    },
    getBaseValue: () => {
      return dropdown1.value;
    },

    getBaseCurrency: function () {
      if (Number(this.getAmount()) > 1) {
        return dropdown1.options[dropdown1.selectedIndex].text + "s";
      } else {
        return dropdown1.options[dropdown1.selectedIndex].text;
      }
    },

    getTargetValue: () => {
      return dropdown2.value;
    },

    getFinalCurrency: function () {
      if (Number(dataController.data.finalValue) > 1) {
        return dropdown2.options[dropdown2.selectedIndex].text + "s";
      } else {
        return dropdown2.options[dropdown2.selectedIndex].text;
      }
    },

    findCurrencySymbol: (data) => {
      for (let i = 0; i < myData.length; i++) {
        if (myData[i].code === data) {
          return myData[i].symbol_native;
        }
      }
    },

    //Display output to the screen
    displayResult: function () {
      output.initialValue.textContent =
        this.findCurrencySymbol(this.getBaseValue()) +
        " " +
        dataController.data.initialValue;
      output.initialCurrency.textContent = this.getBaseCurrency();
      output.finalValue.textContent =
        this.findCurrencySymbol(this.getTargetValue()) +
        " " +
        dataController.data.finalValue;
      output.finalCurrency.textContent = this.getFinalCurrency();
      output.summary.textContent =
        dataController.data.initialValue +
        " (" +
        this.findCurrencySymbol(this.getTargetValue()) +
        ") = " +
        dataController.data.finalValue +
        " (" +
        this.findCurrencySymbol(this.getBaseValue()) +
        ")";
      output.checkSign.style.visibility = "visible";
    },
  };
})(dataController);

var appController = (function () {
  let uiCntrl = UIController;

  function convert() {
    var fixer =
      "https://prime.exchangerate-api.com/v5/5bdbc7c39658f1b8d871e4e8/latest/" +
      uiCntrl.getBaseValue();

    //Fetch API data
    fetch(fixer).then(function (response) {
      let dataCntrl = dataController;

      response.json().then(function (apiData) {
        let conversionRates = apiData.conversion_rates;
        let amount = uiCntrl.getAmount();

        dataCntrl.data.initialValue = Number(amount).toFixed(2);
        dataCntrl.data.finalValue = Number(
          amount * conversionRates[uiCntrl.getTargetValue()]
        ).toFixed(2);
        uiCntrl.displayResult();
      });
    });
  }
  convertButton.addEventListener("click", convert);
})();

//Holds Data
var dataController = (function () {
  return {
    data: {
      initialValue: 0,
      initialCurrency: "",
      finalValue: 0,
      finalCurrency: "",
    },
  };
})();
