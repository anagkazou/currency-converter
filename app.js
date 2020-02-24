//fixer.set({ accessKey: "f55c077520a68d26b62470b34aa3b0b5" });
const fixer = require("fixer-api");
const data = await fixer.latest({
  access_key: "<f55c077520a68d26b62470b34aa3b0b5>"
});
console.log(data);
