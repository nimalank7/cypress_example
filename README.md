# What is the application

Project consists of microservice architecture with 2 Express applications.

## Endpoints
1. **Index**
    - **Request:**
      ```
      GET /
      ```
    - **Response**
      ```
      200 OK

      Hello to: John
      ```
2. **Hello World**
    - **Request:**
      ```
      GET /helloworld
      ```
    - **Response**
      ```
      200 OK

      <!DOCTYPE html>
      <html lang="en">
        ...
      </html>
      ```

## How the application works

- `/` in `index.js` calls `/data` in `microservice.js` and returns `Hello to: John`. This setup is tested using Cypress
- `helloworld` returns the `hello.njk` view. This is tested using the template tests

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

## How the template tests work

Template tests are a lighter touch than the Cypress tests as they don't involve starting the express app and just assert on the HTML elements.

`nunjucks` is used to load the view with `render` passing in the data. `Cheerio` to load the HTML from the view. A custom `Chai` plugin is defined with custom assertions (e.g. `containSelector('#msg')`).

## How to run the Cypress tests

1. Start up Mountebank:
```
npm run cypress:server
```

2. Start up Cypress:
```
npm run cypress:open
```

## How to run the template tests

```
npm run test
```
