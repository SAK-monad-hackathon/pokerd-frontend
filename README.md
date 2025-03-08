# pokerd-frontend

1. Initialize your environment variables by copying the `.env.example` file to an `.env.local` file. Then, in `.env.local`, [paste your Privy App ID from the dashboard](https://docs.privy.io/guide/dashboard/api-keys).

```sh
# In your terminal, create .env.local from .env.example
cp .env.example .env.local

# Add your Privy App ID to .env.local
NEXT_PUBLIC_PRIVY_APP_ID=<your-privy-app-id>
```

## Building locally

In your project directory, run `npm run dev`. You can now visit http://localhost:3000 to see your app and login with Privy!

## Check out:

- `pages/_app.tsx` for how to use the `PrivyProvider` and initialize it with your Privy App ID
- `pages/index.tsx` for how to use the `usePrivy` hook and implement a simple `login` button
- `pages/dashboard.tsx` for how to use the `usePrivy` hook, fields like `ready`, `authenticated`, and `user`, and methods like `linkWallet` and `logout`

**Check out [our docs](https://docs.privy.io/) for more guidance around using Privy in your app!**
