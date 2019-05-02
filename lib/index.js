'use strict'

function Atbash(){

  let obj = {},
  res;

  function belongsTo(character, checkstring) {
    let p = 0;
    for (let k = 0; k < checkstring.length; k++) {
      if (character === checkstring.substr(k, character.length)) {
        p = p + 1;
      }
    }
    if (p > 0) {
      return "true";
    } else {
      return "false";
    }
  }

  function reverseString(str) {
    let rev = "";
    for (let l = str.length - 1; l >= 0; l--) {
      rev += str.substr(l, 1);
    }
    return rev;
  }

  function subs(str1, str2, txt) {
    let str = "";
    for (let i = 0; i < txt.length; i++) {
      let a = txt.substr(i, 1);
      if (belongsTo(a, str1) == "true") {
        for (let j = 0; j < str1.length; j++) {
          let b = str1.substr(j, 1),
          c = str2.substr(j, 1);
          if (a === b) {
            str += c;
          }
        }
      } else {
        str += a;
      }
    }

    return str;
  }

  function shuffle(str) {
    if(typeof str !== 'string'){
      console.log('atbash keygen requires string')
      return undefined;
    }
      let a = str.split("");
      for(let i = a.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)),
          tmp = a[i];
          a[i] = a[j];
          a[j] = tmp;
      }
      return a.join("");
  }

  function shift(data, key, enc) {
    if(typeof data !== 'string' || typeof key !== 'string' || typeof enc !== 'boolean'){
      let errmsg = 'atbash shift input error';
      console.log(errmsg)
      obj.data = errmsg;
      obj.err = true;
      return obj;
    }

    try {
      obj.key = key;
      data = data.toUpperCase();
      key = key.toUpperCase();
      let key2 = reverseString(key);
      if(enc){
        obj.data = subs(key,key2,data);
      } else {
        obj.data = subs(key2,key,data);
      }
      obj.err = false;
      return obj;
    } catch (err) {
      console.log(err)
      obj.data = 'atbash shift error';
      obj.err = true;
      return obj;
    }

  }

  return {
    shift: function(data, key, enc, cb){
      res = shift(data, key, enc);
      let final = res;
      delete final.err;
      cb(res.err, final)
    },
    shiftSync: function(data, key, enc){
      return shift(data, key, enc);
    },
    shiftP: function(data, key, enc){
      return new Promise(function(resolve, reject){
        res =  shift(data, key, enc);
        if(res.err){
          reject(res.err);
        } else {
          delete res.err;
          resolve(res);
        }
      })

    },
    keygen: function(i){
      return shuffle(i)
    }
  }

}

const atbash = new Atbash();

module.exports = atbash;
