import axios from 'axios';
import colors from 'colors';

let users = [
  "Jan",
  "Camilla",
  "Marco",
  "Manuel",
  "Sandra",
  "Barbara"
];

let dbUsers = [];

let wgs = [
  'Test'
];

const API_URL = 'http://localhost:1337/parse/';
const HEADERS = {
  'X-Parse-Application-Id': 'StudentWGPlanner',
  'X-Parse-Master-Key': 'asdf1234'
};
const OPTIONS = { headers: HEADERS };

async function resetDb() {
  let dbUsers = await axios.get(`${API_URL}users`, OPTIONS)
    .then((res) => {
      return res.data.results;
    })
    .catch((res) => {
      console.log('catch', res);
      return [];
    });


  for (let user of dbUsers) {
    await axios.delete(`${API_URL}users/${user.objectId}`, OPTIONS);
  }
  dbUsers = [];

  let dbWgs = await axios.get(`${API_URL}classes/wgs`, OPTIONS)
    .then((res) => {
      return res.data.results;
    })
    .catch((res) => {
      console.log('catch', res);
      return [];
    });

  for (let wg of dbWgs) {
    await axios.delete(`${API_URL}classes/wgs/${wg.objectId}`, OPTIONS);
  }
  dbWgs = [];
}

export async function startImport() {
  console.log(colors.green('Deleting db...'));
  console.time('delete');
  await resetDb();
  console.timeEnd('delete');

  console.log(colors.green('\nImporting dummy data...'));
  console.log(colors.green('\nStart inserting users...\n'));
  console.time('users');
  for (let user of users) {
    await axios.post("http://localhost:1337/parse/users", {
      username: user,
      password: user
    }, { headers: { 'X-Parse-Application-Id': 'StudentWGPlanner' }})
      .then((res) => {
        dbUsers[dbUsers.length] = { name: user, id: res.data.objectId };
        console.log(user, 'inserted');
      })
      .catch((res) => {
        console.log(user, res.data.error);
      });
  }
  console.timeEnd('users');

  console.log(colors.green('\nStart inserting wgs...\n'));
  console.time('wgs');
  for (let wg of wgs) {
    let users = [];
    while(users.length < 2 && dbUsers.length > 0) {
      let user = dbUsers.pop();
      users[users.length] = user.id;
    }
    await axios.post("http://localhost:1337/parse/classes/wgs", {
      name: wg,
      users
    }, { headers: { 'X-Parse-Application-Id': 'StudentWGPlanner' }})
      .then((res) => {
        console.log(wg, 'inserted');
      })
      .catch((res) => {
        console.log(wg, res.data.error);
      });
  }
  console.timeEnd('wgs');
}
