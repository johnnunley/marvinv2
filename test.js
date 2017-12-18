var respond = require('./respond');

var callback = function(shouldLog,log) {
  if (shouldLog) {
    console.log(log);
  }
  else {
    console.log('No Reply');
  }
};

var test = function(text) {
  respond.respond(text,callback);
};

test('Marv, fetch me SCP-2747');
test('SCP-7897');
test('I am 10 years old');
test('2000 and 2998');


