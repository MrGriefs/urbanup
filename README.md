<h2 align="center">Urbanup</h2>

<p align="center">
<a href="https://patreon.com/yeen"><img alt="Patreon" src="https://img.shields.io/badge/patreon-donate?color=F77F6F&labelColor=F96854&logo=patreon&logoColor=ffffff"></a>
<a href="https://discord.gg/eazpsZNrRk"><img alt="Discord" src="https://img.shields.io/discord/368557500884189186?color=7389D8&labelColor=6A7EC2&logo=discord&logoColor=ffffff"></a>
<img alt="Travis (.org)" src="https://img.shields.io/travis/MrGriefs/urbanup">
<img alt="David" src="https://img.shields.io/david/MrGriefs/urbanup">
<img alt="node-current" src="https://img.shields.io/node/v/urbanup">
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/MrGriefs/urbanup">
<a href="https://npm.runkit.com/urbanup"><img alt="RunKit" src="https://img.shields.io/badge/Run-Kit-red"></a>
</p>

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
  - [Query](#e621-and-e926)
  - [Random](#furrybot)
  - [API Options](#api-options)

## Introduction

Urbanup is an up-to-date API wrapper for [urban dictionary](http://urbanup.com) with the aid of [axios](https://npmjs.org/package/axios) and ECMAScript 2017's [async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await).

## Installation

With npm:  

```bash
$ npm install urbanup
```

With yarn:  

```bash
$ yarn add urbanup
```

## Usage

Try me on [RunKit](https://npm.runkit.com/urbanup)  
<a href="https://discord.gg/eazpsZNrRk" target="_blank"><img alt="Discord" src="https://img.shields.io/discord/368557500884189186?color=7389D8&labelColor=6A7EC2&logo=discord&logoColor=ffffff"></a>  

Simply import the library and use whatever endpoint directly:

```javascript
const urbanup = require('urbanup') // CommonJS
import * as urbanup from "urbanup" // ES6

urbanup(query[, options]).then(r => /* do something */)
```

### Query

To request a page of definitons from urban dictionary:

```javascript
const urbanup = require('urbanup') // CommonJS
import * as urbanup from "urbanup" // ES6

var query = 'javascript'

var options // Optional library options

urbanup(query, options).then(definitions => console.log(definitions[0])) // Returns an array of matching definitions
// Schema: https://api.urbandictionary.com/v0/define?page=1&term=javascript

urbanup.query(query, options) // The same as urbanup(query, options)
```

If you would like the API to return only one definition, you can do:

```javascript
urbanup.one(query, options).then(r => /* do something */)
```

### Random

To request a random page of defintions:

```javascript
const urbanup = require('urbanup') // CommonJS
import * as urbanup from "urbanup" // ES6

urbanup.random(options).then(def => console.log(def))

// You can also get the first result only:
urbanup.random.one(options).then(def => console.log(def.permalink))
```

### API Options

Additionally, each method allows you to pass in API options to customise your experience a tad more.

```javascript
var options = {
    // Decide which page to get. Default is 1
    page: 2,
    // Provide your own callback function to be used instead
    cb: (result) => { return result.data.list },
    // Use your own custom user agent. User agent will always default to your Node.js version and OS name if no agent is provided
    agent: 'My Progamme, contact@example.com',
    // Allows you to apply your own axios options whenever axios is used.
    axiosOptions: {
        // Sets a specific amount of time in milliseconds that axios will wait until the requested server responds.
        timeout: 1000 
        // You can find other axios options at https://github.com/axios/axios#request-config
    }
}
```
