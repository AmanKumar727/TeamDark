CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  address VARCHAR(255)
);

CREATE TABLE cards (
  id INT PRIMARY KEY,
  user_id INT,
  card_number VARCHAR(20),
  expiration_date DATE,
  cvv INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
  id INT PRIMARY KEY,
  user_id INT,
  card_id INT,
  transaction_date DATE,
  amount DECIMAL(10, 2),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (card_id) REFERENCES cards(id)
);