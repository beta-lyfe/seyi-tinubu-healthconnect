# Beta-Lyfe

This repo contains all the code related to Beta Lyfe

## Documentation

You can [check out the documentation here](https://docs.betalyfe.com.ng/docs/index.html)

## Development

### Step 0: Video Walkthrough

A video recording has been setup already. You can [check it out here](https://youtu.be/yg3Uk0Mihbc)

### Step 1: Copy Environment Variables

- Copy `.env.example` -> `.env`
- Copy `.env.development.example` -> `.env.development`

### Step 2: Install and Setup direnv

- Head over to [direnv.net](https://direnv.net) and follow the [installation guide](https://direnv.net/docs/installation.html) and the [hook setup guide](https://direnv.net/docs/hook.html).
- After following those guides, you should have the `direnv` CLI tool available on your machine.
- Run `direnv allow` in the project root to load environment variables into your shell.


### Step 3: Install Dependencies

```bash
# Be sure to run this at the project root
pnpm install
```

**NOTE**: It's `pnpm` **NOT** `npm`

### Step 4: Running the local setup

```bash
# Be sure to run this at the project root
pnpm dev
```

NOTE:
- website runs on port `3000`
- webapp runs on port `3001`
- api docs runs on port `3002`

## Contribution

Checkout [Contribution guidelines](./CONTRIBUTION.md).
