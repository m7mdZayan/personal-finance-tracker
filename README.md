it's a simple app that enables users to track thier finances by adding there income and expences and calucaltes the net and show chart that can be downloaded.

you can fine a live demo [`here`](https://personal-finance-tracker-steel-six.vercel.app/)

## Getting Started

First, to run the app locally:

create an env file and add this varaible to it

```md
VITE_EXCHANGE_API_URL = https://api.exchangerate-api.com/v4/latest/
```

to run the development server locally:

```bash
npm run dev
```

and Open [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

- you can add any amount and choose its currency and it will be converted automatically to the base currency.
- the base Currency is in `utils/data.js` file you can change it to any currency you need.
- also this file has the available currencies array you can modify it with whatever you want.
- you can also change the categoreies list in the same file.
