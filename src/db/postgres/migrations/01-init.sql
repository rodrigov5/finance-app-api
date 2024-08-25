CREATE TABLE IF NOT EXISTS users(
    id UUID primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_type') THEN
        CREATE TYPE transaction_type AS ENUM('EARNINGS', 'EXPENSES', 'INVESTMENTS');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS transactions(
    id UUID primary key,
    user_id UUID references users(id) ON DELETE CASCADE NOT NULL,
    name varchar(255) not null,
    amount numeric(10, 2) not null,
    date date not null,
    type transaction_type not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);
