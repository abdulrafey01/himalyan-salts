const B2 = require("backblaze-b2");

const b2 = new B2({
  applicationKeyId: "c83ea7ef14c2",
  applicationKey: "00578457f6c2c7a44821a85f8af41a89fb0e06a1c1",
});

b2.authorize()
  .then(() => {
    console.log("Authorized backblaze b2");
  })
  .catch((error) => {
    console.log("Error authorizing b2");
  });

module.exports = b2;
