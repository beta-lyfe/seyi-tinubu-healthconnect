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

#### Backend

```bash
# pwd: ./backend

python3 manage.py migrate # to run migrations
python3 manage.py runserver # to run the server
```

## Contribution

Checkout [Contribution guidelines](./CONTRIBUTION.md).
