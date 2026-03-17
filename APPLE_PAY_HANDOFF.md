# Square Apple Pay Debugging Handoff

## The Goal
Implement a custom Square Web Payments SDK checkout page that includes a working **Apple Pay** button. The checkout page is located at `/app/checkout/page.js` within a Next.js 14 App Router application.

## The Problem
The Apple Pay button **refuses to render or display visibly** on Safari (macOS and iOS), despite the SDK initializing without throwing errors, and the domain being officially verified by Square. The fallback credit card form renders perfectly.

## Environment & Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Library**: React 18 (Client Components)
- **SDK**: Square Web Payments SDK (`https://web.squarecdn.com/v1/square.js`)
- **API Version**: Square-Version 2024-03-20

## Verified Prerequisites Checklist
- [x] **Square API Credentials**: Application ID and Location ID are correct.
- [x] **HTTPS**: the Vercel app is running on HTTPS (`mediageekz-quotes.vercel.app`).
- [x] **Apple Pay Domain Verification File**: `apple-developer-merchantid-domain-association` is successfully hosted at `/.well-known/`.
- [x] **Square Domain Registration API**: We successfully POSTed to `https://connect.squareup.com/v2/apple-pay/domains` and both `mediageekz.com` and `mediageekz-quotes.vercel.app` returned `"status": "VERIFIED"`.

## What We've Tried & Current State
The code in `/app/checkout/page.js` currently does the following:
1. Loads the Square SDK script dynamically via a `useEffect`.
2. Initializes the `payments` object.
3. Requests an `applePay` instance: `const applePay = await payments.applePay(paymentRequest);`
    - *Note: This does not throw an error on Safari, meaning the device/browser is detected as Apple Pay compatible.*
4. Attempts to attach the SDK to a DOM ref: `await applePay.attach(applePayBtnRef.current);`

### Attempt 1: Conditional React Rendering (Failed)
We initially tried conditionally rendering the wrapper `<div />` using `{applePayReady && <div ref={applePayBtnRef} />}`. 
**Why it failed**: Square's `.attach()` method requires the element to be firmly in the DOM at the exact moment it fires; React's state-based rendering delayed the DOM insertion, causing Square to attach to an orphan node or fail silently.

### Attempt 2: Permanent DOM Nodes with CSS Toggles (Failed, Current State)
We rewrote the layout to ensure the target `<div>` nodes are *unconditionally* rendered and permanently in the DOM hierarchy. We used `display: block` and `display: none` to hide/show them.
**Why it failed**: The Apple Pay button still does not appear in the container.

### Attempt 3: Enforcing Specific Dimensions (Failed)
The Square documentation notes that the Apple Pay button container must have explicit dimensions. We added `applePayBtnRef.current.style.minHeight = '48px';` before calling `.attach()`. 
**Why it failed**: Button still does not visually render.

## Next Agent Instructions
1. **Investigate Square's `visibility` requirements**: Square SDK might be failing because the container is rendered as `display: none` or inside a wrapper that is `display: none` at the exact moment `.attach()` is called. Try rendering it fully visible (no CSS hiding) to rule out browser layout calculation drop-offs.
2. **Review the `paymentRequest` object**: Ensure the payload for the `paymentRequest` (specifically `countryCode`, `currencyCode`, and `total`) is strictly formatted in the exact way Square expects for digital wallets.
3. **Sandbox Testing**: Build a completely raw HTML/JS test file independent of React to isolate whether the issue is Square API configuration vs. React Virtual DOM lifecycle timing.
4. **Check SDK Event Logs**: Attach deep error logging to `.attach()` promises to catch silent failures.

## Location of Relevant Code
- Frontend Checkout Component: `/app/checkout/page.js`
- Server-Side Payment Processor: `/app/api/square-process-payment/route.js`
