-- Tabela User
CREATE TABLE "user" (
                        user_id SERIAL PRIMARY KEY,
                        name VARCHAR(255),
                        password VARCHAR(255),
                        email VARCHAR(255)
);
-- Tabela ShoppingList
CREATE TABLE shopping_list (
                               list_id SERIAL PRIMARY KEY,
                               createdby INT,
                               description VARCHAR(255),
                               name VARCHAR(255),
                               icon VARCHAR(255),
    -- nova coluna para ícones
                               due DATE,
                               FOREIGN KEY (createdby) REFERENCES "user"(user_id)
);
-- Tabela Item
CREATE TABLE item (
                      item_id SERIAL PRIMARY KEY,
                      units INT,
                      bought BOOLEAN DEFAULT FALSE,
    -- indica se o item foi comprado
                      name VARCHAR(255),
                      price DECIMAL(10, 2),
                      category VARCHAR(255),
    -- nova coluna para categorias
                      icon VARCHAR(255) -- nova coluna para ícones
);
-- Tabela has (Relacionamento entre Item e ShoppingList)
CREATE TABLE has (
                     item_id INT,
                     list_id INT,
                     PRIMARY KEY (item_id, list_id),
                     FOREIGN KEY (item_id) REFERENCES item(item_id),
                     FOREIGN KEY (list_id) REFERENCES shopping_list(list_id)
);
-- Tabela creates (Relacionamento entre User e ShoppingList)
CREATE TABLE creates (
                         user_id INT,
                         list_id INT,
                         PRIMARY KEY (user_id, list_id),
                         FOREIGN KEY (user_id) REFERENCES "user"(user_id),
                         FOREIGN KEY (list_id) REFERENCES shopping_list(list_id)
);