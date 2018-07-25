CREATE OR REPLACE FUNCTION saveRecipe(TEXT, INT[]) RETURNS void as $$
DECLARE
    insert_name TEXT = $1;
    insert_ingredients INT[] = $2;
BEGIN
    INSERT INTO recipe (name, ingredients) VALUES(insert_name, insert_ingredients);
END;

$$ LANGUAGE plpgsql;