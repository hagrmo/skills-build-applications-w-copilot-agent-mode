# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` before running the app in Codespaces so the frontend can call the public backend URL.

Create `octofit-tracker/frontend/.env.local` with:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the frontend calls endpoints in this format:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
```

If `VITE_CODESPACE_NAME` is unset, the app safely falls back to `http://localhost:8000/api` so it never generates `https://undefined-8000...` URLs.

## Scripts

- `npm run dev -- --host`
- `npm run build`
- `npm run lint`
