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
                    message: 'Connection successful. Here are the recipes.'
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
                    message: 'Connection successful. Here is the recipe.'
                });
        })
        .catch(function(err){
            return next(err);
        });
}

module.exports = {
    getAllRecipes: getAllRecipes,
    getRecipe : getRecipe
};
