# GitPulse — GitHub Activity Dashboard

![GitPulse Banner](https://img.shields.io/badge/GitPulse-GitHub_Dashboard-0ea5e9?style=for-the-badge&logo=github)
![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel)

> A production-grade GitHub Activity Dashboard built during a 15-day internship project.
> Visualize your GitHub contributions, repositories, commit history, and coding patterns in a stunning dark UI.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 GitHub OAuth | Secure login with GitHub via NextAuth.js |
| 📊 Contribution Heatmap | 12-month activity heatmap like github.com |
| 📈 Commit Frequency Chart | Bar/Area chart of push events over 6 months |
| 🌐 Language Breakdown | Donut chart of top languages across repos |
| 🔍 Repo Explorer | Filter by language, sort by stars/forks, paginated |
| 👤 Profile View | Avatar, bio, stats, pinned repos for any GitHub user |
| 🌙 Dark Mode | Dark-first design with glassmorphism UI |
| 📱 Responsive | Mobile-first responsive layout |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS + custom design tokens
- **Auth**: NextAuth.js v4 (GitHub OAuth)
- **Data Fetching**: GitHub REST API + GitHub GraphQL API
- **State Management**: React Query (TanStack v5)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deploy**: Vercel

---

## 🚀 Getting Started (Local)

### Prerequisites
- Node.js 18+
- A GitHub OAuth App ([create one here](https://github.com/settings/developers))

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/github-activity-dashboard.git
cd github-activity-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in:
```env
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
NEXTAUTH_SECRET=your_random_secret     # openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
```

### 4. Create GitHub OAuth App
1. Go to https://github.com/settings/developers
2. Click **New OAuth App**
3. Fill in:
   - **Application name**: GitPulse
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copy the **Client ID** and generate a **Client Secret**
5. Paste both into `.env.local`

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and log in with GitHub. 🎉

---

## 🌐 Deploy to Vercel (Day 29)

### Step 1 — Push to GitHub
```bash
git add .
git commit -m "ready for deployment"
git push origin main
```

### Step 2 — Import on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** next to your `github-activity-dashboard` repo
3. Click **Deploy** (Vercel auto-detects Next.js)

### Step 3 — Add Environment Variables
In Vercel dashboard → **Settings → Environment Variables**, add:

| Variable | Value |
|---|---|
| `GITHUB_CLIENT_ID` | Your GitHub OAuth Client ID |
| `GITHUB_CLIENT_SECRET` | Your GitHub OAuth Client Secret |
| `NEXTAUTH_SECRET` | A random secret (run `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` |

### Step 4 — Update GitHub OAuth Callback URL
1. Go to https://github.com/settings/developers
2. Edit your OAuth App
3. Update **Authorization callback URL** to:
   `https://your-app.vercel.app/api/auth/callback/github`
4. Save changes

### Step 5 — Redeploy
In Vercel dashboard → **Deployments** → Click **Redeploy** on the latest deployment.

✅ Your app is now live!

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Main dashboard overview
│   ├── profile/            # User profile + pinned repos
│   ├── repos/              # Repository explorer
│   ├── charts/             # Analytics & charts
│   ├── login/              # Login page
│   └── api/auth/           # NextAuth route handler
├── components/
│   ├── layout/             # Navbar, AppShell, Providers
│   ├── profile/            # AvatarCard, StatsGrid, PinnedRepoCard
│   ├── repos/              # RepoCard, FilterBar
│   ├── charts/             # Heatmap, CommitChart, LanguageDonut
│   └── ui/                 # Skeleton, ErrorBoundary, EmptyState, Badge
├── hooks/                  # React Query custom hooks
├── lib/                    # GitHub API client, auth config, utils
└── types/                  # TypeScript interfaces
```

---

## 🗺️ Pages

| Route | Description |
|---|---|
| `/login` | Landing page with GitHub sign-in |
| `/dashboard` | Overview: profile, heatmap, charts, top repos |
| `/profile` | Full profile — search any GitHub user |
| `/repos` | Repo explorer with filters & pagination |
| `/charts` | Deep analytics: charts + stats table |

---

## 📋 Development Timeline

| Day | Phase | Task |
|---|---|---|
| 16 | Planning | Wireframes + component architecture |
| 17 | Setup | Next.js boilerplate + folder structure |
| 18 | Foundation | GitHub OAuth via NextAuth.js |
| 19 | Foundation | REST API + React Query setup |
| 20 | Core | Profile page |
| 21 | Core | Contribution heatmap |
| 22 | Core | Repo explorer |
| 23 | Review | Mid-project mentor feedback |
| 24 | Charts | Commit frequency chart |
| 25 | Charts | Language donut + stats cards |
| 26 | Polish | Responsiveness + dark mode |
| 27 | Polish | Skeletons + error boundaries |
| 28 | QA | Bug fixes + README |
| **29** | **Deploy** | **Vercel deployment** ✅ |
| **30** | **Demo** | **Final presentation** |

---

## 👨‍💻 Author

Built as part of a 30-day internship project.

---

> ⭐ Star this repo if you find it useful!
