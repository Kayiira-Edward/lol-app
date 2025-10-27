**LOL App

LOL App is a Next.js 13 + TypeScript + Tailwind v3 project — an anonymous chat platform designed for Gen Z fun and local culture. Users can send anonymous messages, reply to threads with limits, and unlock paid features for identity reveals, custom themes, and badges.

*Features

Send and receive anonymous messages.

Free tier: limited number of replies per chat.

Pro tier: unlimited chats, identity hints, custom themes, and badges.

Localized for Uganda campus communities and Gen Z culture.

Future-ready for business/organization tiers.

*Project Structure
src/
 ├─ app/
 │   ├─ page.tsx
 │   ├─ layout.tsx
 │   └─ globals.css
 ├─ components/   # Navbar, ChatWindow, ChatList, Button
 ├─ context/      # ChatContext
 ├─ hooks/        # Custom hooks (e.g., useMessageLimit)
 ├─ services/     # Firebase & payment integrations
 └─ utils/        # Helper functions & constants

🛠 Tech Stack

Next.js 13 – App Router structure

TypeScript – type safety for scalable code

Tailwind CSS v3 – fast and responsive UI

Firebase – backend for chat messages and user management

MarzPay / Mobile Money – for Pro tier payments
