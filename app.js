let demo = () => {
  let rate = fx(1)
    .from("GBP")
    .to("USD");
  alert("£1 = $" + rate.toFixed(4));
};

const fixer =
  "http://data.fixer.io/api/latest?access_key=5b2d17c9e871b87d91f00c86244fc91d";

fetch(fixer)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    data = json;
    console.log(data);
  });
