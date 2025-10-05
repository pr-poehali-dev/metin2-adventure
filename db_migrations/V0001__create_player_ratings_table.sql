CREATE TABLE IF NOT EXISTS player_ratings (
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(100) NOT NULL,
    level INTEGER NOT NULL DEFAULT 1,
    class VARCHAR(50) NOT NULL,
    guild VARCHAR(100),
    total_score INTEGER NOT NULL DEFAULT 0,
    pvp_kills INTEGER DEFAULT 0,
    pve_bosses_killed INTEGER DEFAULT 0,
    quests_completed INTEGER DEFAULT 0,
    playtime_hours INTEGER DEFAULT 0,
    rank INTEGER,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_player_ratings_score ON player_ratings(total_score DESC);
CREATE INDEX idx_player_ratings_name ON player_ratings(player_name);

INSERT INTO player_ratings (player_name, level, class, guild, total_score, pvp_kills, pve_bosses_killed, quests_completed, playtime_hours, rank) VALUES
('DragonSlayer', 99, 'Воин', 'Легион Теней', 15420, 234, 89, 456, 320, 1),
('ShadowMage', 97, 'Маг', 'Легион Теней', 14850, 189, 95, 423, 298, 2),
('NightAssassin', 95, 'Ниндзя', 'Кровавая Луна', 14120, 267, 78, 389, 275, 3),
('HolyPriest', 94, 'Шаман', 'Храм Света', 13890, 145, 102, 401, 290, 4),
('IronWarrior', 93, 'Воин', 'Стальной Кулак', 13450, 198, 88, 378, 265, 5),
('FireSorcerer', 92, 'Маг', 'Кровавая Луна', 12980, 176, 91, 356, 255, 6),
('SilentBlade', 91, 'Ниндзя', NULL, 12670, 223, 82, 334, 248, 7),
('LightHealer', 90, 'Шаман', 'Храм Света', 12340, 134, 96, 367, 242, 8),
('StormMage', 89, 'Маг', 'Легион Теней', 11950, 167, 87, 345, 235, 9),
('DarkKnight', 88, 'Воин', 'Стальной Кулак', 11620, 201, 79, 323, 228, 10);