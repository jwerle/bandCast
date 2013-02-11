/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
app.use(express.compiler({ src : __dirname + '/public', enable: ['less']}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

  // joe was here..
  // session object isn't attached to request object, we need to use the 'use()' method
  // hook to grab the request object, attach a session object, and call the 'next()' function
  // to proceed with the callstack
  app.use(function(req, res, next){
    if (typeof req.session !== 'object') {
      req.session = {};
    }
    next();
  });
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Compatible

// Now less files with @import 'whatever.less' will work(https://github.com/senchalabs/connect/pull/174)
var TWITTER_BOOTSTRAP_PATH = './vendor/twitter/bootstrap/less';
express.compiler.compilers.less.compile = function(str, fn){
  try {
    var less = require('less');var parser = new less.Parser({paths: [TWITTER_BOOTSTRAP_PATH]});
    parser.parse(str, function(err, root){fn(err, root.toCSS());});
  } catch (err) {fn(err);}
}

// Routes

app.get('/', routes.index);
app.get('/index', routes.index);
app.get('/archive', routes.index.index_post_handler);
app.get('/home', routes.index.home);

// joe was here..
// need to use method HTTP method 'POST'
app.post('/', routes.index_post_handler);


app.listen(9500, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
