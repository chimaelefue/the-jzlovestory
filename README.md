# The JZ Love Story

Wedding website for **Juliet & Zimbocrix** — invitation page now; memories, photos and videos after the wedding.

## Tech stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

1. **Couple photo**  
   Add your photo as `public/couple-bg.jpg`. It’s used as the hero background. If the file is missing, a rose gradient is shown.

2. **Names, date, venue**  
   - Hero names: `src/components/Hero.tsx`  
   - Wedding date (and countdown): `src/components/Countdown.tsx` (constant `WEDDING_DATE`) and `src/components/ScratchReveal.tsx` (date parts in `dateParts`).  
   - Location and time: `src/components/Location.tsx`  
   - Love story text: `src/components/LoveWriteup.tsx`

3. **After the wedding**  
   You can add new routes (e.g. `/memories`, `/gallery`) for photos and videos later.

## Invitation page flow

1. Red curtain — click/tap to open.
2. Hero: “Juliet weds Zimbocrix” with your photo.
3. Short love writeup.
4. Three scratch circles — scratch each to reveal the date (day, month, year).
5. When all three are scratched, party ribbons fall.
6. Countdown to the wedding.
7. Event details and location.

## Build & deploy

```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or any Node host that supports Next.js.
