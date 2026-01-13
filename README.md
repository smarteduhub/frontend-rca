# Smart EduHub - Educational Platform

A modern, multilingual educational platform built with Next.js 15, TypeScript, and React.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

Create `.env.local` with your backend base URL (include `/api/v1`):

```
NEXT_PUBLIC_SERVER_URL=https://<your-backend-host>/api/v1
```

Tokens are read from the `access_token` cookie (fallback to `localStorage`). All API calls use this base URL; make sure CORS allows your frontend origin.

## 📖 Documentation

See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for:

- Complete feature list
- Testing instructions
- Test credentials
- Deployment guide
- Demo flow for supervisors

## ✨ Features

- **4 User Roles**: Admin, Teacher, Student, Parent
- **Course Management**: Create, browse, enroll in courses
- **Assignment System**: Create and submit assignments
- **Real-time Chat**: Messaging between users
- **AI Chat**: AI-powered learning assistant
- **Gamified Learning**: 3D interactive classroom
- **Multi-language**: English, French, Kinyarwanda
- **Responsive Design**: Works on all devices

## 🔑 Access

Use your issued accounts for each role (Admin, Teacher, Student, Parent). Test credentials are not bundled in this repo—request them from the project admin or create via the backend/admin panel.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand + React Query
- **UI Components**: Radix UI
- **Authentication**: JWT with cookies
- **Internationalization**: next-intl

## 📦 Project Structure (Integrated)

```
src/
├── app/                        # Next.js App Router pages by locale and role
│   ├── [locale]/(auth)/...     # Login, activate
│   ├── [locale]/(admin)/...    # Admin dashboard, users
│   ├── [locale]/(teacher)/...  # Teacher dashboard & tools
│   ├── [locale]/(student)/...  # Student dashboard
│   ├── [locale]/(parent)/...   # Parent dashboard
│   └── layout.tsx              # Root layout
├── components/                 # Shared UI (Navbar, DataTable, cards, forms)
├── hooks/                      # React Query hooks (auth, users, courses, ai, etc.)
├── services/                   # API service layer (auth, base service)
├── lib/                        # Axios clients, helpers, apiClient (OpenAPI-aligned)
├── store/                      # Zustand stores (auth, notifications)
├── types/                      # Shared types (api, course, user, assignments)
├── middleware.ts               # Role-based route protection
└── providers/                  # Context/providers (i18n, theme, query)
```

## 🧪 Testing

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete testing checklist.

## 📄 License

Private project
