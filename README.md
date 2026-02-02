Velocity-Task-Manager

Velocity-Task-Manager is a real-time task management dashboard built with Next.js (App Router), PocketBase, Tailwind CSS, and Framer Motion.
It focuses on fast UI updates, smooth animations, and a clean developer-friendly structure — all written in JavaScript.

🚀 Tech Stack

Framework: Next.js (App Router)

Language: JavaScript

Database & Realtime: PocketBase

Styling: Tailwind CSS

Animations: Framer Motion

Icons: react-icons

Notifications: sonner

Hosting: Vercel

✨ Features

✅ Create, edit, and delete tasks

🔄 Realtime updates via PocketBase subscriptions

🏷️ Multi-tag support (Work, Urgent, Personal, Ideas)

🎯 Optimistic UI with instant feedback

🎬 Smooth enter/exit & reorder animations

📱 Responsive dashboard layout

🧼 Clean, maintainable component structure

🧠 How Realtime Works

Tasks are fetched server-side on first load.

Initial data is passed into a client-side realtime provider.

PocketBase subscriptions keep the UI in sync automatically.

UI updates instantly without page reloads or manual refetching.

🛠️ Getting Started

1. Clone the repository
   git clone https://github.com/your-username/casalavoro.git
   cd casalavoro

2. Install dependencies
   npm install

# or

yarn

# or

pnpm install

3. Environment variables

Create a .env.local file:

NEXT_PUBLIC_PB_URL=http://127.0.0.1:8090

Make sure PocketBase is running locally or hosted.

4. Run the development server
   npm run dev

Open
👉 http://localhost:3000

🗄️ PocketBase Setup

Create a Tasks collection with the following fields:

Field Type
tittle text
description text
completed boolean
tags select (multi)
created auto

Enable Realtime API for the collection.

🎨 Styling & Fonts

Tailwind CSS for layout and UI

next/font for optimized font loading

Icons handled via react-icons for consistency

🚢 Deployment

This project is optimized for Vercel.

npm run build

Then deploy via the Vercel dashboard or CLI.

Docs:
👉 https://nextjs.org/docs/app/building-your-application/deploying

📌 Notes

No custom API routes required

PocketBase SDK is used directly

Server Components for data fetching

Client Components for realtime interaction and UI
