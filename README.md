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

Checkout supports Razorpay, Cashfree, and Paytm through server-side order creation and payment verification. Keep every secret in the server environment; do not prefix secrets with `VITE_`, commit them, or place them in React code.

Configure the gateway(s) you want to offer:

```env
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

CASHFREE_ENVIRONMENT=sandbox
CASHFREE_CLIENT_ID=
CASHFREE_CLIENT_SECRET=

PAYTM_ENVIRONMENT=staging
PAYTM_MID=
PAYTM_MERCHANT_KEY=
PAYTM_WEBSITE=WEBSTAGING
```

Use the production environment values only after completing the respective provider's merchant onboarding and verification. The API handlers under `api/` require a serverless deployment that supports Node.js `fetch`.

If you prefer, I can move files for you — tell me to "please move" and I'll attempt it.
