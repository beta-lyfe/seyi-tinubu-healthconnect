# Beta-Lyfe

This repo contains all the code related to Beta Lyfe

## Documentation

You can [check out the documentation here](https://docs.betalyfe.com.ng/docs/index.html)

## Development

### Installing Dependencies

#### Frontend

```bash
cd packages
pnpm install
```

#### Backend

```bash
cd backend
pip3 install -r requirements.txt
```

### Running the local setup

#### Frontend

```bash
# pwd: ./packages

pnpm dev # to run the frontend stack
```

NOTE:
- website runs on port `3000`
- webapp runs on port `3001`
- api docs runs on port `3002`

#### Backend

```bash
# pwd: ./backend

python3 manage.py migrate # to run migrations
python3 manage.py runserver # to run the server
```

NOTE:
- the backend runs on port `8000`

## Contribution

Checkout [Contribution guidelines](./CONTRIBUTION.md).
