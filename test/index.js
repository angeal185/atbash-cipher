const atbash = require('../');

(function(){

  let test = '8476235846328abcdcdef',
  key = atbash.keygen('ABCDEF0123456789');

  console.log('keygen: '+ key)

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
