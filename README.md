# How the application works

Project consists of microservice architecture where `index.js` exposes an API endpoint at '/'. This calls `microservice.js` at `/data` and the user is presented with `Hello to: John`. This setup is tested using Cypress.

## How Cypress works

Cypress is used to test whether the HTML `<body>` element contains `Hello to: John`. Mountebank is used to mock out the `/data` endpoint. As part of the test the `MICROSERVICE_URL` is set to the Mountebank server from `test.env`.

## How the Stubs Work

Mountebank listens on `localhost:2525`. To create a stub we have to send the following request:

```js
POST /imposters
{
  "port": 8000,
  "protocol": "http",
  "stubs": [{
    "predicates": [{
      "equals": {
        "path": "/data",
        "method": "GET"
      }
    }],
    "responses": [{
      "is": {
        "statusCode": 200,
        "headers": { 
          Content-Type: "application/json" 
        },
        "body": { 
          name: 'John', 
          age: 25, 
          subject: 'History' 
        }
      }
    }]
  }]
}
```

Now `GET localhost:8000/data` will return a stubbed response.

## How to run the tests

1. Start up Mountebank:
```
npm run cypress:server
```

2. Start up Cypress:
```
npm run cypress:open
```
