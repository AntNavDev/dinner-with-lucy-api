CREATE OR REPLACE FUNCTION saveIngredient(TEXT, INT) RETURNS void as $$
DECLARE
    insert_name TEXT = $1;
    insert_caloric_info INT = $2;
BEGIN
    INSERT INTO ingredient (name, calories) VALUES(insert_name, insert_caloric_info);
END;

$$ LANGUAGE plpgsql;