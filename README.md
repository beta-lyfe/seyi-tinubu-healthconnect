# Beta-Lyfe

This repo contains all the code related to Beta Lyfe

## Documentation

You can [check out the documentation here](https://beta-lyfe.vercel.app/docs/docs/index.html)

## Development

### Installing Dependencies

```bash
cd webapp
pnpm install
```

### Running the local setup

#### Frontend (Webapp)

```bash
# pwd: ./webapp

pnpm webapp:dev # to run the webapp
pnpm backend:dev # to run the ad-hoc backend server
```

#### Backend

```bash
# pwd: ./backend

python3 manage.py migrate # to run migrations
python3 manage.py runserver # to run the server
```

## Contribution

Checkout [Contribution guidelines](./CONTRIBUTION.md).
