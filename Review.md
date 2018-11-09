# Review Questions

## What is Node.js?
Node.js is an open source server environment. It was created to meet the increasing demands of a dynamic web environment. 

## What is Express?
Express is a web application framework developed for Node.js which enables use of the HTTP verbs (GET, POST, PUT, DELETE,), as well as other common tasks in web-development. 

## Mention two parts of Express that you learned about this week.
Middleware, or set of built in functions, which can change the request or response, but doesn’t have to.

Routing - provides a way for the request handler function to execute based on the URL and gives you the ability to break an application into smaller parts based on the route.

## What is Middleware?
Middleware is generally thought to be software that can be used to fill in the developers need gaps with the environment they are developing in and what they need to accomplish in their application. Middleware is often provided by 3rd party providers but can be custom written by a developer. In it's most simple form middleware can simply be thought of as a function that processes data before it reaches the rest of your code. 

## What is a Resource?
A resource is whatever thing is at the endpoint of a URI. It is typically an object holding data. 

## What can the API return to help clients know if a request was successful?
An HTTP code, the most common one for a successful completion of a request is 200.

## How can we partition our application into sub-applications?
By using routers much like in React or Redux. 

## What is express.json() and why do we need it?
Is a method available through the Express middleware, which adds support for parsing JSON content out of the request body.