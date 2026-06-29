# AMPA Recruiting — Claude Code Context

## What This Is
A D2D sales recruiting funnel. Leads come in via landing page → AI calls them within 15 sec → qualified leads get placed.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v3
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel
- **SMS:** Twilio
- **Voice AI:** Vapi

## Brand Identity
- **Colors:** Navy `#0D1A2D` + Cream `#F5EDE0`
- **Typography:** Playfair Display (serif, headings) + Inter (sans, body)
- **Vibe:** Editorial, minimal, premium
- **Tone:** Confident, direct, zero fluff.

## Key Rules
- **TypeScript strict:** no `any`, no implicit returns, always type your props
- **Server components by default** — use `"use client"` only when needed
- **Tailwind only** — no CSS modules, no styled-components
- **No hardcoded secrets** — always use `process.env.XXX`
- **Mobile-first** — every component must look great on 375px
- **Test before done** — always run `npm run build` after making changes

## Commands
- **Dev server:** `npm run dev`
- **Build:** `npm run build`
- **Type check:** `npx tsc --noEmit`

## Environment Variables (in .env.local)
See `.env.example` for required variables.
