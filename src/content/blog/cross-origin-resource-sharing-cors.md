---
author: 56kode
pubDatetime: 2024-09-05T18:00:00+02:00
modDatetime: 2024-09-05T18:00:00+02:00
title: "Cross-Origin Resource Sharing (CORS): A Comprehensive Guide"
slug: cross-origin-resource-sharing-cors
featured: false
draft: false
tags:
  - cors
description: "Detailed explanation of the CORS (Cross-Origin Resource Sharing) security mechanism. Covers the definition, importance, functionality, and common CORS errors with their solutions. Includes code examples for both server-side and client implementation. Comprehensive guide for developers dealing with cross-origin requests and associated security issues."
---

Have you ever encountered the frustrating `"Cross-Origin Request Blocked"` error when making frontend requests? This often happens due to a lack of understanding about Cross-Origin Resource Sharing (CORS).

I was in the same boat a few years ago until I decided to create a CakePHP plugin to delve deeper into CORS. You can check out the project here, even though it's archived: https://github.com/ozee31/cakephp-cors

Let's break down what CORS is and how it works.

## What is CORS?

**CORS** (Cross-Origin Resource Sharing) is a mechanism that allows a web browser to make requests to a server from a different domain than the one that served the webpage. This security feature prevents unauthorized access to external resources unless explicitly permitted by the server.

For example, if you try to make an XMLHttpRequest from your website at https://mydomain.com to https://google.com, you'll likely encounter an error like this:

```
Access to fetch at 'https://www.google.com/' from origin 'https://front-obat.traefik.me' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

## Why CORS is Essential in Web Applications

CORS is crucial in modern web applications because it:

- **Protects users:** Prevents malicious websites from making unauthorized requests to other domains, safeguarding sensitive user data like session information.
- **Controls access:** Allows servers to specify which origins (domains) are allowed to access their resources, ensuring that requests come from trusted sources.
- **Facilitates communication between services:** Enables applications hosted on different domains to interact securely.
- **Secures APIs:** Ensures that only authorized requests can access API resources, preventing abuse.

## Limitations of CORS

The Same-Origin Policy (SOP), which CORS is built upon, has a limitation: it doesn't protect against direct calls made using tools like curl or Postman. CORS is specifically designed to provide security within web browsers.

## How CORS Works

CORS manages cross-origin requests using specific HTTP headers. Here's a breakdown:

### HTTP Headers

- `Access-Control-Allow-Origin`: Specifies which origins are allowed to access the resource. Can be a specific domain or a wildcard `*`.
- `Access-Control-Allow-Methods`: Defines the HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, etc.) that are allowed.
- `Access-Control-Allow-Headers`: Lists the headers that the client is allowed to send in its request.
- `Access-Control-Allow-Credentials`: Indicates whether cookies or authentication information can be sent with the request.
- `Access-Control-Max-Age`: Specifies how long results from a preflight request can be cached.

### Simple Requests vs. Preflight Requests

- **Simple requests:** Meet specific criteria like using standard HTTP methods (`GET`, `POST`) and allowed headers. They don't require a preflight check.
- **Preflight requests:** Sent by the browser before a complex request to check if the server will allow the actual request. They use the `OPTIONS` method.

## Server-Side Configuration

To enable CORS on your server, you need to set the appropriate HTTP headers. Here's a basic example using Express.js:

```js
const express = require("express");
const cors = require("cors");
const app = express();

// Configure CORS
app.use(
  cors({
    origin: "https://example.com", // Access-Control-Allow-Origin
    methods: "GET, POST, PUT, DELETE", // Access-Control-Allow-Methods
    allowedHeaders: "Content-Type, Authorization", // Access-Control-Allow-Headers
  })
);
```

## Client-Side Implementation

If you're using fetch, CORS is handled automatically. However, you might need to include credentials for session cookies:

```js
fetch("https://api.example.com/data", {
  method: "GET",
  credentials: "include", // include cookies
}).then(response => {
  // ...
});
```

## Common CORS Errors and Solutions

### `"No 'Access-Control-Allow-Origin' header"`

This error indicates that the server is not sending the `Access-Control-Allow-Origin` header, which is necessary to allow requests from different origins. The browser blocks the request because the server hasn't specified which origins are allowed.

**Solution:** Ensure that the server includes the `Access-Control-Allow-Origin` header in its responses. You can configure this header to allow a specific origin or all origins using `*`.

```js
const corsOptions = {
  origin: "https://example.com", // or "*" for all origins
};

app.use(cors(corsOptions));
```

### `"The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the credentials flag is true."`

This error occurs when the server allows all origins (`*`) but the request includes credentials (like cookies or authorization headers). The wildcard `*` cannot be used with credentials for security reasons.

**Solution:** Configure the server to send a specific origin instead of `*` when credentials are involved.

```js
const corsOptions = {
  origin: "https://example.com", // Not use "*" with credentials
  credentials: true,
};

app.use(cors(corsOptions));
```

### `"Response to preflight request doesn't pass access control check: It does not have HTTP ok status."`

This error occurs when the preflight request (an `OPTIONS` request) doesn't receive a valid response from the server.

**Solution:** Ensure that the server responds correctly to preflight `OPTIONS` requests with an HTTP status of 200 and the necessary headers (`Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`).

### `"The 'Access-Control-Allow-Headers' header contains invalid values."`

This error occurs when custom headers sent in the request are not included in the `Access-Control-Allow-Headers` header of the response.

**Solution:** Make sure the server includes all custom headers used in the request within the `Access-Control-Allow-Headers` header.

```js
const corsOptions = {
  origin: "https://example.com",
  methods: "GET, POST, PUT",
  allowedHeaders: "Content-Type, Authorization", // List all allowed headers
};

app.use(cors(corsOptions));
```

### `"No 'Access-Control-Allow-Credentials' header"`

This error indicates that credentials (cookies, authorization headers, etc.) are being used in the request, but the server hasn't specified `Access-Control-Allow-Credentials: true`. This is necessary for including credentials in cross-origin requests.

**Solution:** Configure the server to include the `Access-Control-Allow-Credentials` header in its responses.

```js
const corsOptions = {
  origin: "https://example.com",
  credentials: true, // Enable credentials
};

app.use(cors(corsOptions));
```

### `"CORS policy: No 'Access-Control-Allow-Methods' header present on the requested resource."`

This error occurs when the HTTP methods used in the request aren't specified in the server's `Access-Control-Allow-Methods` header.

**Solution:** Ensure the server sends the `Access-Control-Allow-Methods` header with the allowed HTTP methods.

```js
const corsOptions = {
  origin: "https://example.com",
  methods: "GET, POST, PUT, DELETE", // List all allowed HTTP methods
};

app.use(cors(corsOptions));
```

### `"CORS policy: No 'Access-Control-Allow-Headers' header"`

This error occurs when the server doesn't send the `Access-Control-Allow-Headers` header in the preflight response, preventing the use of custom headers in the request.

**Solution:** Configure the server to include the `Access-Control-Allow-Headers` header with all allowed custom headers.

```js
const corsOptions = {
  origin: "https://example.com",
  allowedHeaders: "Content-Type, Authorization, X-Requested-With", // Add custom headers
};

app.use(cors(corsOptions));
```

You can find more information about CORS errors on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSDisabled).

## Conclusion

**Cross-Origin Resource Sharing (CORS)** is crucial for securing data exchange between different domains in modern web applications. It regulates how resources on a server can be accessed from domains other than the origin. By understanding CORS and configuring it correctly, you can ensure seamless cross-domain communication while protecting against unauthorized access.
