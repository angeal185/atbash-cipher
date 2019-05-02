// hex-xor demo
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

function test(testStr, key){

  // callback
  atbash.shift(testStr, key, true, function(err, i){
    if(err){return console.log(err)}
    $('#callbackenc').val(i.data)

    atbash.shift(i.data, key, false, function(err,res){
      if(err){return console.log(err)}
      $('#callbackdec').val(res.data)
    })
  })

  //sync
  let encSync = atbash.shiftSync(testStr, key, true);
  $('#syncenc').val(encSync.data)
  let decSync = atbash.shiftSync(encSync.data, key, false);
  $('#syncdec').val(decSync.data)

  // promise
  atbash.shiftP(testStr, key, true).then(function(res) {
    $('#promiseenc').val(res.data);

    atbash.shiftP(res.data, key, false).then(function(res) {
      $('#promisedec').val(res.data);
    }).catch(function(err){
      console.log(err)
    });

  }).catch(function(err){
    console.log(err)
  });
}

function str2hex(str) {
	let hex = '';
	for(var i=0;i<str.length;i++) {
		hex += '' + str.charCodeAt(i).toString(16).toUpperCase();
	}
	return hex;
}

const div = $('<div />'),
headerTpl = _.template('<h5 class="{{title}} col-sm-12">{{title}}</h5>'),
inputTpl = _.template('<div class="col-sm-6"><div class="form-group"><label>{{title}}</label><input id="{{ID}}" type="text" class="form-control"></div></div>'),
bodyConf = {
  header:['callback', 'sync', 'promise'],
  input: {dec: 'decode', enc: 'encode'},
  test: ['string', 'hex', 'key']
};

$('body').append(
  div.clone().addClass('container').append(
    $('<h2 />', {
      class:'mt-4 mb-4',
      text:'atbash-cipher'
    }),
    div.clone().addClass('row demo')
  )
)

$(document).ready(function() {

  _.forEach(bodyConf.test, function(i){
    $('.demo').append(inputTpl({title: i, ID: i}))
  })

  _.forEach(bodyConf.header, function(i){
    $('.demo').append(headerTpl({title: i}))
    _.forIn(bodyConf.input, function(key,val){
      $('.' + i).after(inputTpl({title: key, ID: i + val}))
    })
    $('.' + i).siblings('div').find('input').not('#string').attr('readonly', true)
  })

  $('#string').on('keyup', function(){
    $('#hex').val(str2hex($(this).val())).keyup()
  }).on('change', function(){
    $('#hex').val(str2hex($(this).val())).keyup()
  })

  $('#hex').on('keyup', function(){
    let encKey = atbash.keygen('ABCDEF01234567890')
    test($(this).val(), encKey)
    $('#key').val(encKey)
  })

});
