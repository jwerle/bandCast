
/*
 * GET home page.
 */

 exports.index = function(req, res){
  res.render('index', { title: 'bandCast' })
};

// handler for homepage
exports.home = function(req, res) {
    // if user is not logged in, ask them to login
    if (typeof req.session.username == 'undefined') res.render('index', { title: 'No name'});
    // if user is logged in already, take them straight to the items list
    else res.redirect('home');
};

exports.home = function(req, res) {
    res.render('home', { title: 'home'})
};

exports.index_post_handler = function(req, res) {
    // if the username is not submitted, give it a default of "Anonymous"
    username = req.body.username || 'Anonymous';
    // store the username as a session variable
    req.session.username = username;
    // redirect the user to homepage
    res.redirect('/');
};

// our 'database'
var items = {
    SKN:{name:'Shuriken', price:100},
    ASK:{name:'Ashiko', price:690},
};

// handler for displaying the items
exports.items = function(req, res) {
    // don't let nameless people view the items, redirect them back to the homepage
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else res.render('items', { title: 'Ninja Store - Items', username: req.session.username, items:items });
};

// handler for displaying individual items
exports.item = function(req, res) {
    // don't let nameless people view the items, redirect them back to the homepage
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else {
        var name = items[req.params.id].name;
        var price = items[req.params.id].price;
        res.render('item', { title: 'Ninja Store - ' + name, username: req.session.username, name:name, price:price });
    }
};

// handler for showing simple pages
exports.page = function(req, res) {
    var name = req.query.name;
    var contents = {
        about: 'cool.',
        contact: 'contact us at <address><strong>Ninja Store</strong>,<br>1,<br>Ninja Avenue,<br>NIN80B7-JP,<br>Nihongo.</address>'
    };
    res.render('page', { title: 'Ninja Store - ' + name, username: req.session.username, content:contents[name] });
};