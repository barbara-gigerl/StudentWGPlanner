jest.unmock('../pages/login/login'); // unmock to use the actual implementation of sum
jest.unmock('../pages/wg/SearchWG');
jest.unmock('../pages/wg/ShoppingList');
jest.unmock('../pages/wg/CreateShoppinglist')

import Login from '../pages/login/login';
import JoinWg from '../pages/wg/SearchWG';
import ShoppingList from "../pages/wg/ShoppingList";
import CreateShoppinglist from "../pages/wg/CreateShoppinglist";

let urls = [
  "http://10.0.2.2:1337/parse/login/",
  "http://10.0.2.2:1337/parse/classes/wgs/",
  "http://10.0.2.2:1337/parse/classes/shoppinglist/",
  "http://10.0.2.2:1337/parse/classes/shoppinglistitem/"
]

let params = [
  "",
]

function mock_login(data)
{
  if(data.params.username === '')
    return Promise.reject({ "data" : {"code":200,"error":"username is required."}})
  if(data.params.password === '')
    return Promise.reject({"data" : {"code":201,"error":"password is required."}})
  if(data.params.username === "CorrectUsername" &&
     data.params.password === "CorrectPassword")
    return Promise.resolve({"data" : {

        "ACL": {
          "*": {
            "read": true
          },
          "e2R5FTHl3Q": {
            "read": true,
            "write": true
          }
        },
        "username": "CorrectUsername",
        "email": "correct@cor.co",
        "updatedAt": "2016-06-08T11:25:26.046Z",
        "createdAt": "2016-06-08T11:25:26.046Z",
        "objectId": "e2R5FTHl3Q",
        "sessionToken": "r:1a587e298b9b69b5b2b2ba47a12e9a67"
    }})
  else
    return Promise.reject({"data" : {"code":201,"error":"Invalid username/password."}})
}

function mock_shoppinglist(data)
{
  if(data.params.name === '')
    return Promise.reject({ "data" : {"code":300,"error":"elementname is required."}})
  if(data.params.shoppinglistid === '')
    return Promise.reject({"data" : {"code":301,"error":"shoppinglist is required."}})
  if(data.params.name === "newElement" &&
     data.params.shoppinglistid === "CorrectID")
    return Promise.resolve({"data" : {

        "ACL": {
          "*": {
            "read": true
          },
          "e2R5FTHl3Q": {
            "read": true,
            "write": true
          }
        },
        "name": "newElement",
        "shoppinglistid": "CorrectID",
        "updatedAt": "2016-06-08T11:25:26.046Z",
        "createdAt": "2016-06-08T11:25:26.046Z",
        "objectId": "e2R5FTHl3Q",
        "sessionToken": "r:1a587e298b9b69b5b2b2ba47a12e9a67"
    }})
  else
    return Promise.reject({"data" : {"code":301,"error":"Invalid shoppinglist/element."}})
}

function mock_shoppinglistitem(data)
{
  if(data.params.name === '')
    return Promise.reject({ "data" : {"code":400,"error":"elementname is required."}})
  if(data.params.shoppinglistid === '')
    return Promise.reject({"data" : {"code":401,"error":"shoppinglist is required."}})
  if(data.params.name === "newElement" &&
     data.params.shoppinglistid === "CorrectID")
    return Promise.resolve({"data" : {
        "ACL": {
          "*": {
            "read": true
          },
          "ji90Rxs0EB": {
            "read": true,
            "write": true
          }
        },
        "name": "newElement",
        "state": "0",
        "shoppinglistid": "CorrectID",
        "updatedAt": "2016-06-08T11:25:26.046Z",
        "createdAt": "2016-06-08T11:25:26.046Z",
        "objectId": "ji90Rxs0EB",
        "sessionToken": "r:1a587e298b9b69b5b2b2ba47a12e9a67"
    }})
  else
    return Promise.reject({"data" : {"code":401,"error":"Invalid element."}})
}

function mock_wg(data)
{
  if(data.params.where.objectId == 'ABC') {
    return Promise.resolve({"results": [ {"users": [
    {
       "id": "w6IWnikUqm",
       "username": "abc",
       "email": "abc@abc"
     } ] } ] } );
  }
  else if(data.params.where.objectId == 'DEF') {
     return Promise.resolve({"data" : {"results": [ {"users": [ ] } ] } } );
  }
  else if(data.params.where.name === '')
    return Promise.reject({ "data" : {"code":400,"error":"name is required."}})
  else if(data.params.name === "correctName"){
    console.log("YEYEYEE")
    return Promise.resolve(
      {"data":
        {"results":
          [{
            "name": "mywg",
            "objectId": "1234",
            "users":
            [{
              "id": "w6IWnikUqm",
              "username": "abc",
              "email": "abc@abc"
            }]
          }]
        }
      }
    )

  }
  else
    return Promise.reject({"data" : {"code":401,"error":"Invalid element."}})
}

function mock_post_shoppinglist(data)
{
  if(data.name === '')
    return Promise.reject({ "data" : {"code":400,"error":"name is required."}})
  if(data.wgid === '')
    return Promise.reject({"data" : {"code":401,"error":"wg is required."}})
  if(data.name === "newWG" &&
     data.wgid === "wg123")
    return Promise.resolve(
      {"data": { "objectId" : "correctListID"}}
    )
  else
    return Promise.reject({"data" : {"code":401,"error":"Invalid element."}})
}

module.exports = {
  get: function(url,data){
    switch(url)
    {
      case urls[0]: return mock_login(data);
      case urls[1]: return mock_wg(data);
      case urls[2]: return mock_shoppinglist(data);
      case urls[3]: return mock_shoppinglistitem(data);

      //If you want to add another request url, add a case here and a function above ;)
    }
  },
  post: function(url,data){
    switch(url)
    {
      //case urls[0]: return mock_login(data);
      //case urls[1]: return mock_wg(data);
      case urls[2]: return mock_post_shoppinglist(data);
      //case urls[3]: return mock_post_shoppinglistitem(data);

      //If you want to add another request url, add a case here and a function above ;)
    }
  }
}
