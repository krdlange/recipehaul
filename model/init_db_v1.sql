DROP TABLE IF EXISTS users;
CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `profile_pic` VARCHAR(255) NOT NULL,
    `firstname` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `zipcode` INT NOT NULL,
    `address` LONGTEXT NOT NULL,
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS recipes_saved;

CREATE TABLE `recipes_saved`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `recipe_ID` INT NOT NULL,    
    `user_id` INT NOT NULL,
    `recipe_image` LONGTEXT NOT NULL,
    `recipe_title` LONGTEXT NOT NULL,
    `recipe_servings` INT NOT NULL,
    `recipe_pricePerServing` DECIMAL(8,2) NOT NULL,
    `recipe_readyInMinutes` DECIMAL(8,2) NOT NULL,
    `recipe_orderStatus` BOOLEAN NOT NULL,

    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS ingredients;

-- CREATE TABLE `ingredients`(
--     `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--     `recipe_ID` INT NOT NULL,
--     PRIMARY KEY(id)
-- );

DROP TABLE IF EXISTS orders;
CREATE TABLE `orders`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_cost` DECIMAL(8, 2) NOT NULL, 
    `delivery_cost` DECIMAL(8, 2) NOT NULL,
    `user_id` INT NOT NULL,
    `payment_date` DATETIME NULL,
    `delivery_status` TINYINT(1) NOT NULL,
    `ordered_ingredients` VARCHAR(999) NULL,
    PRIMARY KEY(id)
);
