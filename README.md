# Notes App — Turbo AI Hiring Challenge

A production-ready, charming notes-taking app built with **Django REST Framework** (backend) and **Next.js 16 + React** (frontend). Designed to match the provided Figma prototype pixel-perfectly, while demonstrating enterprise-grade architecture, testing, and DevOps practices.

---

## 🎥 Demo Video

> A 5-minute walkthrough video is included in the deliverables email.
> You can also run the app locally (with or without Docker) using the instructions below.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Python 3.11, Django 4.2, Django REST Framework, djangorestframework-simplejwt (JWT), django-cors-headers, PostgreSQL, Gunicorn |
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Zustand, Axios |
| **DevOps** | Docker, Docker Compose, multi-stage builds, health checks |
| **Testing** | pytest-django (backend) |
| **Design** | Custom SVG illustrations (kawaii style), Tailwind CSS custom theme matching Figma hex codes exactly |

---

## 🚀 Quick Start

### Option A: Docker Compose (Recommended — Production-like)

**Prerequisites:** Docker + Docker Compose

```bash
cd notes-app

# Create env files from examples
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Build & run everything (PostgreSQL + Django + Next.js)
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000/api](http://localhost:8000/api)

> **Demo credentials:**  
> Email: `demo@example.com`  
> Password: `demo1234`

### Option B: Local Development (Faster iteration)

**Prerequisites:** Python 3.9+, Node.js 20+, PostgreSQL (optional — SQLite used by default locally)

```bash
cd notes-app

# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed
python manage.py runserver 8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🧪 Running Tests

### Backend (pytest-django)
```bash
cd backend
source venv/bin/activate
pytest
```

Tests cover:
- Category & Note model creation
- Note ordering (most recent first)
- User signup (success & duplicate email)
- JWT login (token generation)

### Frontend (ESLint + TypeScript)
```bash
cd frontend
npm run lint
```

---

## 📁 Project Structure

```
notes-app/
├── backend/
│   ├── config/
│   │   ├── settings/          # Split settings: base, local, production
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── users/                 # Auth (signup, JWT login)
│   ├── notes/                 # Categories, Notes models, API, seed command
│   ├── Dockerfile             # Multi-stage Python image
│   ├── entrypoint.sh          # Migrations + seed + gunicorn
│   ├── requirements.txt
│   ├── pytest.ini
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/               # Next.js App Router pages
│   │   ├── components/
│   │   │   ├── illustrations/  # SVG kawaii assets (cat, cactus, bubble tea)
│   │   │   ├── notes/          # NoteCard, NoteEditor, Sidebar
│   │   │   └── ui/             # Reusable UI primitives
│   │   ├── hooks/             # useClickOutside
│   │   ├── lib/               # Axios API client
│   │   └── store/             # Zustand stores (auth, notes)
│   ├── Dockerfile             # Multi-stage Node image (standalone output)
│   ├── next.config.ts
│   └── .env.example
├── docker-compose.yml         # Full stack orchestration
└── README.md
```

---

## 🏗 Architecture Decisions

### 1. Split Django Settings (`base / local / production`)
- `local.py`: SQLite, Browsable API, DEBUG=True — ideal for rapid development
- `production.py`: PostgreSQL, JSON renderer only, SSL-ready, CORS lockdown — ready for real deployments
- Environment variables via `python-dotenv` — no secrets in code

### 2. Docker Multi-Stage Builds
- **Backend:** Slim Python image with `gunicorn` (4 workers) for WSGI production server
- **Frontend:** Next.js `output: 'standalone'` for minimal production image (~100MB instead of ~1GB)
- **PostgreSQL:** Alpine-based image with health checks before backend starts

### 3. Database Choice
- **Local dev:** SQLite (zero config)
- **Production/Docker:** PostgreSQL (robust, scalable, ACID-compliant)
- Switching is automatic via `DJANGO_SETTINGS_MODULE`

### 4. JWT Authentication
- Stateless auth with `djangorestframework-simplejwt`
- Refresh token rotation ready
- 7-day access token lifetime for UX, 30-day refresh for security balance

### 5. Frontend State Management
- **Zustand** over Redux/Context — minimal boilerplate, no providers, excellent TypeScript support
- Separate stores for `auth` and `notes` to prevent unnecessary re-renders

### 6. API Client Design
- Centralized Axios instance with interceptors for JWT attachment
- Automatic token refresh on 401 responses
- Transparent proxy via Next.js rewrites in development

---

## ✨ Features Implemented

### Authentication
- JWT-based auth (access + refresh tokens)
- Sign Up & Login pages with exact Figma styling (serif headings, pill buttons, kawaii illustrations)
- Auto-redirect unauthenticated users to `/login`
- Logout clears tokens and state

### Dashboard
- **Empty State:** Custom bubble-tea SVG illustration + "I'm just here waiting for your charming notes..."
- **Note Grid:** Responsive 3-column grid with category-colored cards
- **Category Sidebar:** Click to filter; counters update dynamically
- **New Note Button:** Pill-shaped "+ New Note" matching Figma exactly

### Note Editor
- Full-screen modal overlay with background color matching the selected category
- **Category Dropdown:** Changes note color in real-time; closes on outside click
- **Autosave:** Debounced save (700ms) — no manual save button
- **Last Edited timestamp:** Formatted exactly as in designs
- Close button (`X`) returns to dashboard and refreshes data

### Design Fidelity
- **Colors:** All hex codes extracted from screenshots (e.g., `#FAF3E8` background, `#F4C2A1` Random Thoughts)
- **Typography:** Serif (Georgia) for titles; Sans-serif (Inter) for UI
- **Illustrations:** Hand-coded SVGs replicating kawaii cat, cactus, and bubble tea
- **Spacing & Radius:** 12px card radius, pill buttons, exact padding values

---

## 🤖 How I Used AI

I used AI as an **accelerator and design-to-code translator** throughout the challenge:

- **Design extraction:** Fed screenshots to AI to generate a comprehensive design spec with exact hex colors, typography rules, and component anatomy.
- **SVG illustrations:** Described kawaii assets and AI generated hand-crafted SVG components approximating the Figma illustrations.
- **Boilerplate generation:** AI scaffolded Django project structure (models, serializers, ViewSets, JWT auth) and Next.js App Router setup.
- **Code review & iteration:** Used AI to spot potential bugs (autosave loops, dropdown click-outside) and suggest Tailwind v4 patterns.
- **DevOps acceleration:** AI helped structure Dockerfiles, docker-compose, and pytest configurations following industry best practices.

All business logic, API integration, state management, and architectural decisions were reviewed and refined by me to ensure correctness and fidelity.

---

## 📬 Deliverables

- ✅ **Source Code:** This repository (Django + Next.js)
- ✅ **README:** You are reading it
- ✅ **Demo Video:** Attached in submission email / linked separately

---

*Built with care for the Turbo AI Senior Full Stack Engineer challenge.*
