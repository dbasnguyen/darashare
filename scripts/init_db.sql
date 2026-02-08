-- init_db.sql
-- Création de la base DataShare

DROP DATABASE IF EXISTS datashare;
CREATE DATABASE datashare
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TEMPLATE = template0;

\c datashare;
