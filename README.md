# Notes App — Turbo AI Hiring Challenge

A charming, fully-functional notes-taking app built with **Django REST Framework** (backend) and **Next.js 16 + React** (frontend). Designed to match the provided Figma prototype pixel-perfectly, including custom color palettes, serif/sans-serif typography, kawaii illustrations, and smooth interactions.

---

## 🎥 Demo Video

> A 5-minute walkthrough video is included in the deliverables email.
> You can also run the app locally using the instructions below.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Python 3.9, Django 4.2, Django REST Framework, djangorestframework-simplejwt (JWT), django-cors-headers, SQLite |
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Zustand, Axios, Framer Motion (installed for future animations) |
| **Design** | Custom SVG illustrations (kawaii style), Tailwind CSS custom theme matching Figma hex codes exactly |

---

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 20+
- npm

### 1. Clone & Enter Project
```bash
cd notes-app
```

### 2. Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed        # Creates categories + demo user + sample notes
python manage.py runserver 8000
```

> **Demo credentials:**  
> Email: `demo@example.com`  
> Password: `demo1234`

### 3. Frontend Setup (new terminal)
```bash
cd frontend
npm install
npm run dev
```

### 4. Open App
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
notes-app/
├── backend/
│   ├── config/              # Django settings, URLs, WSGI
│   ├── users/               # Auth (signup, JWT login)
│   ├── notes/               # Categories, Notes models, API, seed command
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   │   ├── (auth)/      # Login & Signup layouts
│   │   │   ├── page.tsx     # Dashboard
│   │   │   └── layout.tsx   # Root layout + fonts
│   │   ├── components/
│   │   │   ├── illustrations/  # SVG kawaii assets (cat, cactus, bubble tea)
│   │   │   ├── notes/          # NoteCard, NoteEditor, Sidebar
│   │   │   └── ui/             # Reusable UI primitives
│   │   ├── hooks/           # useClickOutside
│   │   ├── lib/             # Axios API client
│   │   └── store/           # Zustand stores (auth, notes)
│   ├── public/
│   ├── next.config.ts
│   └── package.json
└── README.md
```

---

## ✨ Features Implemented

### Authentication
- JWT-based auth (access + refresh tokens)
- Sign Up & Login pages with exact Figma styling
- Auto-redirect unauthenticated users to `/login`
- Logout clears tokens and state

### Dashboard
- **Empty State:** Custom bubble-tea illustration + "waiting for your charming notes..." text
- **Note Grid:** Responsive 3-column grid (1-col mobile, 2-col tablet, 3-col desktop)
- **Category Sidebar:** Click any category to filter the grid; counters update dynamically
- **New Note Button:** Pill-shaped "+ New Note" button matching Figma exactly

### Note Editor
- Full-screen modal overlay with colored background matching the selected category
- **Category Dropdown:** Changes note color in real-time; closes on outside click
- **Autosave:** Debounced save (700ms) — no manual save button needed
- **Last Edited timestamp:** Formatted exactly as in the designs
- Close button (`X`) returns to dashboard and refreshes data

### Design Fidelity
- **Colors:** All hex codes extracted directly from screenshots (e.g., `#FAF3E8` background, `#F4C2A1` Random Thoughts, `#6200EE` login header)
- **Typography:** Serif (Georgia) for note titles & auth headings; Sans-serif (Inter) for UI text
- **Illustrations:** Hand-coded SVGs replicating the kawaii cat, cactus, and bubble tea from the designs
- **Spacing & Radius:** 12px card radius, pill buttons, exact padding values

---

## 🧠 Key Technical Decisions

1. **SQLite for simplicity** — For a challenge/demo context, SQLite eliminates infra setup while still being fully relational.
2. **Zustand over React Context** — Lightweight, no provider wrapping needed, and excellent for small-to-medium global state (auth + notes).
3. **Next.js rewrites for API proxy** — During development, `/api/*` requests are transparently forwarded to the Django dev server on port 8000.
4. **Seed command (`python manage.py seed`)** — One command sets up categories, a demo user, and 7 realistic notes matching the Figma content exactly.
5. **No external UI library** — Tailwind CSS v4 with a custom `@theme inline` block gives us pixel-perfect control without fighting component library defaults.

---

## 🤖 How I Used AI

I used AI (Claude/Kimi) as an **accelerator and design-to-code translator** throughout the challenge:

- **Design extraction:** I fed the challenge screenshots to the AI, which generated a comprehensive design spec including exact hex colors, typography rules, spacing, and component anatomy.
- **SVG illustrations:** I described the kawaii assets (sleepy cat, cactus in pot, bubble tea) and the AI generated hand-crafted SVG components that approximate the Figma illustrations.
- **Boilerplate generation:** AI scaffolded the Django project structure (models, serializers, ViewSets, JWT auth) and the Next.js App Router setup.
- **Code review & iteration:** I used AI to spot potential bugs (e.g., autosave infinite loops, dropdown click-outside handling) and suggest Tailwind v4 patterns for custom theming.
- **README & documentation:** AI helped structure the final README to match hiring-challenge expectations.

All business logic, API integration, state management, and design decisions were reviewed and refined by me to ensure correctness and Fidelity to the original design.

---

## 📬 Deliverables

- ✅ **Source Code:** This repository (Django + Next.js)
- ✅ **README:** You are reading it
- ✅ **Demo Video:** Attached in submission email / linked separately

---

*Built with care for the Turbo AI Senior Full Stack Engineer challenge.*
