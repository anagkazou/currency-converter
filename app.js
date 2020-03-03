// let demo = () => {
//   let rate = fx(1)
//     .from("GBP")
//     .to("USD");
//   alert("£1 = $" + rate.toFixed(4));
// };
const fixer =
  "http://data.fixer.io/api/latest?access_key=5b2d17c9e871b87d91f00c86244fc91d";

// !(async function() {
//   let data = await fetch(fixer)
//     .then(response => response.json())
//     .then(data => populateSelect(data))
//     .catch(error => console.error(error));
// })();
(function populateSelect() {
  var x;
  for (x in myData) console.log(myData[x].name);
})();
//console.log(data);
