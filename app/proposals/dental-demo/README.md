# ProducerOS — Dental Demo Template

> **Route:** `/proposals/dental-demo`
> **Live URL:** [mediageekzquotes.vercel.app/proposals/dental-demo](https://mediageekzquotes.vercel.app/proposals/dental-demo)
> **Tier:** Studio (premium white-label with payment integration)

## What This Is

A sanitized, client-ready demo proposal for dental/healthcare video production. This template showcases the ProducerOS "Studio Tier" — the premium interactive proposal experience with real-time pricing, add-on toggles, and (in production) payment link integration.

**This is a demo template.** All client data is fictional ("Bright Smile Dentistry"). No real payment info or client details are exposed.

---

## File Structure

```
app/proposals/dental-demo/
├── page.js        ← Single-file React component (client-side)
└── README.md      ← This file
```

Everything lives in `page.js` — data, styles, and JSX. No external CSS files or component imports.

---

## Architecture

### Data Layer (top of file)
- **`PACKAGES[]`** — 3 pricing tiers: Essentials ($2,800), Professional ($3,800), Premier ($5,200)
- **`ADDONS[]`** — 6 optional add-ons ($300–$1,200 each)

### Pricing Logic
- Each package has `crew[]`, `post[]`, and `gear[]` cost breakdowns
- `base` price = sum of all line items
- Add-ons are toggled via `useState` and summed in real-time
- `fmt()` helper formats currency strings

### Design System (CSS-in-JS via `<style jsx global>`)
| Token | Value | Usage |
|-------|-------|-------|
| `--shadow` | `#060a14` | Deepest background |
| `--navy` | `#0f1729` | Card backgrounds |
| `--orange` | `#e8622c` | Primary accent (MediaGeekz brand) |
| `--teal` | `#2dd4bf` | Secondary accent (checkmarks, labels) |
| `--cream` | `#e2e8f0` | Body text |
| `--white` | `#f1f5f9` | Headings |

### Key Visual Effects
- **Film grain:** SVG `feTurbulence` noise overlay at 12% opacity
- **Glassmorphism:** `backdrop-filter: blur(24px)` with inset white edge highlights
- **Spotlight hover:** Animated gradient sweep on pricing cards
- **Hardware toggles:** Inner track shadows + glowing knob on active state
- **Scroll reveal:** `IntersectionObserver` with `.reveal` / `.is-visible` classes

---

## Page Sections (top → bottom)

1. **Template Banner** — Sticky "STUDIO TIER" badge
2. **Hero** — "Capture. Transform. Deliver." + 4 project meta cards
3. **Project Understanding** — 4 scope cards (Facility Tour, Provider Intros, Testimonials, B-Roll)
4. **Production Schedule** — Vertical timeline (8 AM → 5:30 PM)
5. **Equipment Manifest** — Camera, audio, lighting, drone gear cards
6. **Pricing Packages** — 3-column interactive tier selector with expandable cost breakdowns
7. **Add-Ons** — 6 toggle switches with real-time price updates
8. **Next Steps** — Confirmation → scheduling → pre-production → shoot day
9. **Delivery Note** — Cloud transfer within 48 hours
10. **CTA Row** — "Approve This Proposal" + "Book a Call" (demo-only labels)
11. **Footer** — MediaGeekz branding

---

## How to Edit

### Change Pricing
Edit the `PACKAGES` array at the top of `page.js`. Each package object has:
```js
{
  id: 'professional',
  name: 'Professional',
  tagline: 'Full two-person crew',
  recommended: true,      // shows "RECOMMENDED" badge
  base: 3800,             // total price
  crew: [...],            // { label, detail, amount }
  post: [...],            // post-production line items
  gear: [...],            // equipment (amount: 0 + free: true = "Included")
  included: [...],        // feature bullet list (strings)
  excluded: [...],        // grayed-out items
}
```

### Add New Add-Ons
Push to the `ADDONS` array:
```js
{ id: 'my-addon', label: 'My Add-On', detail: 'Description here', price: 500 }
```

### Change Colors
All colors are CSS custom properties in the `:root` block inside the `<style jsx global>` tag. The `--orange` and `--teal` accents are used throughout.

### Create a New Vertical
1. Duplicate this folder as `app/proposals/[vertical-name]/`
2. Update `PACKAGES` and `ADDONS` with vertical-specific data
3. Update hero copy, scope cards, and timeline
4. The design system carries over automatically

---

## Related Files
- **Landing page:** `Mediageekz/src/app/proposals/page.tsx` (links to this demo)
- **Wedding demo:** `/proposals/wedding-demo/`
- **Convention demo:** `/proposals/convention-demo/`
- **Layout metadata:** `app/layout.js` (title: "ProducerOS")

---

## Deployment
Pushes to `main` auto-deploy via **Vercel** → `mediageekzquotes.vercel.app`
