Server (Express + MongoDB)

1. Install dependencies:

```bash
cd server
npm install
```

2. Create `.env` from `.env.example` and set your `MONGODB_URI`.

3. Start server:

```bash
npm run dev
# or
npm start
```

The server exposes:
- `GET /api/ping` — returns pong
- `GET /api/testdata` — example data
