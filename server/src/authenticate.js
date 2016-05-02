const API_URL = 'http://localhost:1337/parse/';
const HEADERS = {
  'X-Parse-Application-Id': 'StudentWGPlanner',
  'X-Parse-Master-Key': 'asdf1234'
};
const OPTIONS = { headers: HEADERS };

async function helloWorld()
{
  console.log("hello world on server.");
}
