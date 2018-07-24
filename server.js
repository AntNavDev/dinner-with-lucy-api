require('dotenv').load();
    
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

var db = require('./queries');
var router = express.Router();

router.get('/recipes', db.getAllRecipes);
router.get('/recipe/:recipe_id', db.getRecipe);

app.use('/api', router);

app.listen(port);

console.log('Listening on port ' + port);
