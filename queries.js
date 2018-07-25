var promise = require('bluebird');

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp('postgres://' + process.env.DB_USERNAME + 
                        ':' + process.env.DB_PASSWORD +
                        '@' + process.env.DB_HOST +
                        ':' + process.env.DB_PORT +
                        '/' + process.env.DATABASE );

function getAllRecipes(req, res, next){
    db.any('SELECT * from recipe;')
        .then(function(data){
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Success!'
                });
        })
        .catch(function(err){
            return next(err);
        });
}

function getRecipe(req, res, next){
    db.any('SELECT getRecipeIngredients(' + req.params.recipe_id + ')')
        .then(function(data){
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Success!'
                });
        })
        .catch(function(err){
            return next(err);
        });
}

function saveRecipe(req, res, next){
    // Should prolly validate data...
    // ...but I didn't

    // Insert into database
    db.any('SELECT saveRecipe(${name}, ${ingredients})', {name: req.body.data.name, ingredients: req.body.data.ingredients})
        .then(function(){
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Recipe saved successfully.'
                })
        })
        .catch(function(err){
            return next(err);
        });
}

function saveIngredient(req, res, next){
    db.any('SELECT saveIngredient(${name}, ${caloric_info})', {name: req.body.data.name, caloric_info: req.body.data.caloric_info})
        .then(function(){
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Ingredient saved successfully.'
                })
        })
        .catch(function(err){
            return next(err);
        });
}

module.exports = {
    getAllRecipes: getAllRecipes,
    getRecipe : getRecipe,
    saveRecipe: saveRecipe,
    saveIngredient: saveIngredient
};
