var axios = require('axios');

console.log('Importing dummy data...');
var users = [
  "Jan",
  "Camilla",
  "Marco",
  "Manuel",
  "Sandra",
  "Barbara"
];

for (var user of users) {
  axios.post("http://localhost:1337/parse/users", {
    username: user,
    password: user
  }, { headers: { 'X-Parse-Application-Id': 'StudentWGPlanner' }})
    .then(function(response) {
      console.log(user + ' inserted');
    })
    .catch(function(res) {
      console.log(res.data.error);
    });
}
