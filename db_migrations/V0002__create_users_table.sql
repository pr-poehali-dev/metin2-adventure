CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    character_name VARCHAR(100),
    character_class VARCHAR(50),
    character_level INTEGER DEFAULT 1
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

INSERT INTO users (username, email, password_hash, character_name, character_class, character_level, is_active) VALUES
('admin', 'admin@metin2.ru', '$2b$12$dummy_hash_for_demo_purposes_only', 'AdminChar', 'Воин', 100, true);
