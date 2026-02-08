psql -U postgres -f scripts/init_db.sql
psql -U postgres -d datashare -f scripts/create_tables.sql
psql -U postgres -d datashare -f scripts/seed_admin.sql
