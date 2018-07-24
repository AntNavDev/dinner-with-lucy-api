CREATE OR REPLACE FUNCTION getRecipeIngredients(int) RETURNS TEXT[][] AS $$
DECLARE
    ingredient_keys int[];
    index int;
    return_array TEXT[][];
    ingredient TEXT[];
BEGIN
    select ingredients into ingredient_keys from recipe where recipe.id = $1;
    FOREACH index in ARRAY ingredient_keys
    LOOP
        SELECT ARRAY[ARRAY[id::text, name::text, calories::text]] into ingredient FROM ingredients WHERE ingredients.id = index;
        return_array = return_array || ingredient;
    END LOOP;
    return return_array;
END;

$$ LANGUAGE plpgsql;