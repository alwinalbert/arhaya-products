# Arhaya Products — Frontend

This repository should contain the frontend-only Vite + React + TypeScript project.

If files are missing, a generated copy exists at `C:\src` on this machine. To copy them into this folder, run the helper script:

PowerShell (run in this repo folder):

```powershell
.\move_files.ps1
```

After files are copied:

```bash
npm install
npm run dev
```

## Payment credentials

This frontend currently uses manual UPI checkout. Razorpay credentials are not wired into the browser.

Copy `.env.example` to `.env` only after replacing its placeholders. `VITE_RAZORPAY_KEY_ID` may be used by browser code; `RAZORPAY_KEY_SECRET` must remain on a server and must never be prefixed with `VITE_`, committed, or placed in React code. A backend is required before adding Razorpay order creation and payment-signature verification.

If you prefer, I can move files for you — tell me to "please move" and I'll attempt it.
