# Wallaclone

(/anuncios) of the methods (this link works only if you run the project)

Api for the iOS/Android apps.

## Deploy

### Install dependencies

    npm install

### Configure

Review lib/connectMongoose.js to set database configuration

### Init database

    npm run installDB

## Start

To start a single instance:

npm start

To start in development mode:

    npm run dev (including nodemon & debug log)

## Test

    npm test (pending to create, the client specified not to do now)

## JSHint & JSCS

    npm run hints

## API v1 info

## Authentication

// POST /api/usuarios/authenticate
{
username: string,
email: string,
password:string
}

returns:{token: string}

### Base Path

The API can be used with the path:
[API V1](/api/anuncios)

GET/api/anuncios

### Error example

    {
      "ok": false,
      "error": {
        "code": 401,
        "message": "This is the error message."
      }
    }

### GET /anuncios

**Input Query**:

start: {int} skip records
limit: {int} limit to records
sort: {string} field name to sort by
includeTotal: {bool} whether to include the count of total records without filters
tag: {string} tag name to filter
venta: {bool} filter by venta or not
precio: {range} filter by price range, examples 10-90, -90, 10-
nombre: {string} filter names beginning with the string

Input query example: ?start=0&limit=2&sort=precio&includeTotal=true&tag=mobile&venta=true&precio=-90&nombre=bi

**Result:**

    {
      "ok": true,
      "result": {
        "rows": [
          {
            "_id": "55fd9abda8cd1d9a240c8230",
            "nombre": "iPhone 3GS",
            "descripcion": "Aqui va la descripción del iphone",
            "venta": false,
            "precio": 5000,
            "foto": "iphone.png",
            "tags": ["lifestyle", "mobile"],
            "username": "pepetrabas",
            "url": "iphone-3gs",
            "dateCreation": "2019/10/07"
          }
        ],
        "total": 1
      }
    }

### GET /anuncios/tags

Return the list of available tags for the resource anuncios.

**Result:**

    {
      "ok": true,
      "allowed_tags": [
        "work",
        "lifestyle",
        "motor",
        "mobile"
      ]
    }

### GET /api/anuncios/:id

### GET /api/anuncio/username

### GET /api/anuncio/url

### PUT /api/anuncios

### DELETE /api/anuncio

## Autenticación de la API con JWT

## Internacionaización

## Subida de Imagen
