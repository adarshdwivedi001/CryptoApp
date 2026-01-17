# Cryptoverse — Simple README

What this project is

- Cryptoverse is a small React app that displays cryptocurrency data: lists, details, and charts.
- It uses Ant Design for UI and a simple mock signup flow with OTP (for testing only).

How we built it (plain steps)

1. Create a React app and install libraries:
   - React, react-router-dom for routing.
   - Ant Design for ready UI components.
   - chart.js + react-chartjs-2 for charts.
2. Build a layout with a left navbar and main content area.
3. Fetch cryptocurrency data from an API service (wrapped in src/services/cryptoApi).
4. Create pages/components:
   - HomePage: shows global stats and top coins.
   - Cryptocurrencies: shows a list of coins with search.
   - CryptoDetails: shows coin info and a price chart.
   - LineChart: renders history data.
   - Navbar, Loader and small UI parts.
5. Add simple auth:
   - Signup page collects name, email and mobile.
   - Generates an OTP in the browser and verifies it (mock).
   - Stores a mock session in localStorage (currentUser) so protected routes work.
6. Style everything in src/app.css and add responsive rules.

How to run

1. Install dependencies:
   - npm install
2. Start the app:
   - npm start
3. Open http://localhost:3000

What you can find in the code (short)

- src/components — all main UI components (Navbar, HomePage, Cryptocurrencies, CryptoDetails, LineChart, Loader).
- src/auth — signup page (Auth.jsx) and ProtectedRoute that blocks pages when not signed in.
- src/services — API hooks to fetch crypto data.
- src/app.css — all styling and responsive rules.
- src/App.jsx — routing and layout.

What we learned (easy words)

- React basics: components, props, state and hooks (useState, useEffect).
- Routing: how to protect routes and navigate between pages.
- API calls: fetch data and handle loading states.
- UI library (Ant Design): use ready components to build forms, lists, cards, and layout quickly.
- Charts: display time-series data with chart.js.
- Simple auth flow: collect input, generate OTP, verify, and keep a mock session.
- CSS: build responsive layouts and style components for a nice look.

Limitations & next steps

- OTP here is mock (generated in the browser). For production you must use a real backend + SMS provider (Twilio, Firebase, etc.).
- Replace localStorage mock session with proper auth tokens (JWT) from a server.
- Add server-side validation and secure storage.
- Improve error handling and unit tests.

Quick tips

- To test signup: go to `/auth`, fill form, read OTP from the notification, verify — you will be logged in.
- To logout: use the "Logout" item in the navbar (it clears the mock session).
- To debug: open browser devtools → Application → Local Storage to inspect `currentUser` and `users`.

If you want, I can:

- Add an example backend for OTP (Firebase or Express + Twilio).
- Add deployment steps (Netlify/Vercel) and environment variable instructions.
