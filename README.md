# Todos API

API for Todos application.

Test URL:  ec2-54-174-161-46.compute-1.amazonaws.com/api/v1/todos

## Requests

| Method | Params | Body | Response |
|--------|--------|------|----------|
|GET     |-   	  |-     |Array<Todo>|
|GET     |id: Alphanumeric|-	|Todo|
|POST     |-|name: string<br/> description: string<br/> status: PENDING or DONE	|id: string|
|PUT     |id: Alphanumeric|name: string<br/> description: string<br/> status: PENDING or DONE	|-|
|DELETE     |id: Alphanumeric|-	|-|

## Types

### Todo

| Attribute | Type |
|--------|--------|
|id     |String   	  |
|name     |String|
|description     |String|
|status     |PENDING or DONE|

## Usage

### Getting started

#### Requirements

- Git
- Node v18

#### Clone the repository
```sh
git clone https://github.com/BadinhoCornejo/todos.git
```

#### Install dependencies
```sh
cd todos/todos-api && npm install
```

#### Run application in development
```sh
npm run dev
```

#### For Production
```sh
npm run build && npm start
```

# Comming soon (Todos v2.0.0)

- Lists: Create lists to group your to-do's.
- Todos UI: A high-performance SPA to manage your to-do's.