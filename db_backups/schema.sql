CREATE TABLE islamic_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    TYPE ENUM('hadith', 'verse', 'dua') NOT NULL,
    SOURCE VARCHAR(255),               -- e.g., 'Sahih Bukhari', 'Surah Al-Baqarah'
    chapter VARCHAR(255),              -- e.g., 'Book of Faith', 'Surah Al-Fatiha'
    REFERENCE VARCHAR(255),            -- e.g., '1:1', 'Hadith 1'
    arabic_text TEXT NOT NULL,
    urdu_translation TEXT,             -- Add if/when you have it
    english_translation TEXT,
    tags VARCHAR(255),                -- e.g., 'patience, prayer, intention'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);