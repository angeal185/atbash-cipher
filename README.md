# atbash-cipher
atbash cipher in javascript for nodejs and the browser

demo: https://angeal185.github.io/atbash-cipher/

### Installation

npm

```sh
$ npm install atbash-cipher --save
```

bower

```sh
$ bower install atbash-cipher
```

git
```sh
$ git clone git@github.com:angeal185/atbash-cipher.git
```

### nodejs

```js
const atbash = require('atbash-cipher')
```

#### browser

```html
<script src="./dist/atbash.min.js"></script>
```

#### API

```js

/**
 * shuffles your shift key (optional)
 *  @param {string} str ~ shift key
 **/
atbash.keygen(str)


/**
 *  callback
 *  @param {string} data ~ data to encrypt/decrypt
 *  @param {string} key ~ shift key
 *  @param {boolean} enc ~ true = encrypt | false = decrypt
 *  @param {function} cb ~ callback function(err,data)
 **/
atbash.shift(data, key, enc, cb) //returns callback


/**
 *  sync
 *  @param {string} data ~ data to encrypt/decrypt
 *  @param {string} key ~ shift key
 *  @param {boolean} enc ~ true = encrypt | false = decrypt
 **/
atbash.shiftSync(data, key, enc) //returns a string

/**
 *  promise
 *  @param {string} data ~ data to encrypt/decrypt
 *  @param {string} key ~ shift key
 *  @param {boolean} enc ~ true = encrypt | false = decrypt
 **/
atbash.shiftP(data, key, enc) //returns a promise


// demo

const atbash = require('atbash-cipher');

(function(){

  let test = '8476235846328abcdcdef',
  key = atbash.keygen('ABCDEF0123456789');

  //keygen
  console.log('keygen: '+ key)

  //sync
  console.log('sync test starting...')
  let syncEnc = atbash.shiftSync(test, key, true);
  console.log(syncEnc)
  let syncDec = atbash.shiftSync(syncEnc.data, key, false)
  console.log(syncDec)
  if(syncEnc.err){
    console.log('sync enc test failure.')
  } else if(syncDec.err){
    console.log('sync dec test failure.')
  } else {
    console.log('sync test done.')
  }

  //callback
  console.log('callback test starting...')
  atbash.shift(test, key, true, function(err,res){
    if(err){return console.log('callback enc test failure.')}
    console.log(res)
    atbash.shift(res.data, key, false, function(err,res){
      if(err){return console.log('callback dec test failure.')}
      console.log(res)
      console.log('callback test done.')
    })
  })

  // promise
  console.log('promise test starting...')
  atbash.shiftP(test, key, true).then(function(res){
    console.log(res)
    atbash.shiftP(res.data, key, false).then(function(res){
      console.log(res)
      console.log('promise test done.')
    }).catch(function(err){
      console.log('promise dec test failure.')
    })
  }).catch(function(err){
    console.log('promise enc test failure.')
  })
})()
```
