CREATE TABLE files (
    file_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    info TEXT NOT NULL,
    is_file INTEGER NOT NULL,
    is_public INTEGER NOT NULL,
    user_id TEXT NOT NULL
);
