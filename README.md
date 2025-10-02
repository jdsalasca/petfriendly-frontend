# PetFriendly Frontend

This repository hosts the frontend for the PetFriendly platform. Product and API context live in `base.txt` and `backend.json`.

## Project layout
- `frontend/`: Vite + React + TypeScript application
- `base.txt`: product vision and requirements
- `backend.json`: OpenAPI contract for the Spring Boot backend

## Getting started
```bash
cd frontend
npm install
cp .env.example .env # adjust if needed
npm run dev
```
The dev server runs on http://localhost:3000.

### Environment variables
The frontend reads Vite variables to connect against the backend deployed at `https://pets-adoption-h8e6.onrender.com`:
- `VITE_BASE_PATH_BACKEND` (defaults to the Render URL)
- `VITE_API_BASE_URL` (defaults to `<BASE_PATH_BACKEND>/api/v1`)
- Optional demo credentials (`VITE_DEMO_USER_EMAIL`, `VITE_DEMO_USER_PASSWORD`, etc.) used by integration tests.

## Tech stack
- React 18 + Vite 5
- TypeScript, React Router, React Query
- Tailwind CSS (utility-first styling) + lightweight UI primitives

## Quality
- `npm run lint` – ESLint (new flat config)
- `npm run build` – TypeScript check + production build
- `npm run test` – Vitest integration tests using HTTP mocks to ensure our API clients target the correct backend routes
