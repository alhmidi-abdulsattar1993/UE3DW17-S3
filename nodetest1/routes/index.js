var express = require('express');
var router = express.Router();

/* GET home page.afficher tous les documents */

router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('books');
    collection.find({}, {}, function(e, docs) {
        res.render('index', {
            "bookslist": docs
        });
    });
});

/* GET Userlist page. */
router.get('userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function(e, docs) {
        res.render('userlist', {
            "userlist": docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    // Set our collection
    var collection = db.get('usercollection');
    // Submit to the DB
    collection.insert({
        "username": userName,
        "email": userEmail
    }, function(err, doc) {
        if (err) {
            // If it failed, return error

            res.send("There was a problem adding the information to the database.");
        } else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

/* GET Tous les titres */
router.get('/titleslist', function(req, res) {
    var db = req.db;
    var collection = db.get('books');
    collection.find({}, {
        'fields.titre_avec_lien_vers_le_catalogue': 1,
        _id: 0
    }, function(e, docs) {
        res.render('titleslist', {
            "titleslist": docs
        });
    });
});

// 

/* Les auteurs de tous les documents dont le titre commence par la lettre N */
router.get('/auteurslist', function(req, res) {
    var db = req.db;
    var collection = db.get('books');
    collection.find({ 'fields.titre_avec_lien_vers_le_catalogue': /^N/ }, { 'fields.auteur': 1, _id: 0 }, function(e, docs) {
        res.render('auteurslist', {
            "auteurslist": docs
        });
    });
});

/* Les titres des documents ayant les rangs 1 à 10 */

router.get('/rang', function(req, res) {
    var db = req.db;
    var collection = db.get('books');
    collection.find({ 'fields.rang': { $gte: 1, $lte: 10 } }, { 'fields.titre_avec_lien_vers_le_catalogue': 1, _id: 0 }, function(e, docs) {
        res.render('rang', {
            "rang": docs
        });
    });
});

/* Toutes les informations vers les documents n'ayant pas de champ "type_de_document" */

router.get('/types_null', function(req, res) {
    var db = req.db;
    var collection = db.get('books');
    collection.find({ 'fields.type_de_document': { $exists: false } }, {}, function(e, docs) {
        res.render('types_null', {
            "types_null": docs
        });
    });
});



/* Les différents types de document qui apparaissent dans cette base */

router.get('/types', function(req, res) {
    var db = req.db;
    var collection = db.get('books');
    collection.distinct('fields.type_de_document', function(e, docs) {
        if (e) throw err;
        res.render('types', { "types": docs });
    });
});





module.exports = router;