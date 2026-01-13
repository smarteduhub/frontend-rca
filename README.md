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

## 🔑 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@smarteduhub.com | password123 |
| Teacher | teacher@smarteduhub.com | password123 |
| Student | student@smarteduhub.com | password123 |
| Parent | parent@smarteduhub.com | password123 |

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand + React Query
- **UI Components**: Radix UI
- **Authentication**: JWT with cookies
- **Internationalization**: next-intl

## 📦 Project Structure

```
src/
├── app/              # Pages and routes
├── components/       # React components
├── hooks/            # Custom React hooks
├── services/         # API services layer
├── store/            # Global state (Zustand)
├── types/            # TypeScript types
├── lib/              # Utilities
└── middleware.ts     # Route protection
```

## 🧪 Testing

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete testing checklist.

## 📄 License

Private project
