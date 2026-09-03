# The Hoodie LB

E-commerce storefront built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**.

## Setup

```bash
git clone <repo-url>
cd thehoodielb
npm install
npm run dev        # → http://localhost:3000
```

## Scripts

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Start development server             |
| `npm run build`      | Production build                     |
| `npm start`          | Serve production build               |
| `npm run lint`       | Run ESLint                           |
| `npm run lint:fix`   | Run ESLint with auto-fix             |
| `npm run format`     | Format all files with Prettier       |
| `npm run format:check` | Check formatting without writing   |

## Folder Structure

```
thehoodielb/
├── app/               # Next.js App Router (pages, layouts, routes)
├── components/
│   ├── ui/            # Reusable UI primitives (buttons, inputs, modals)
│   ├── layout/        # Layout components (header, footer, nav)
│   ├── sections/      # Page sections (hero, features, testimonials)
│   ├── product/       # Product-related components
│   └── cart/          # Cart-related components
├── lib/               # Utility functions and shared logic
├── data/              # Static data, constants, mock data
├── types/             # TypeScript type definitions
├── hooks/             # Custom React hooks
├── store/             # State management
└── public/            # Static assets (images, fonts, icons)
```

## Branching

- `main` is protected — no direct pushes
- Create feature branches → open a PR → review → merge
- Vercel deploys a preview URL on every PR

## Code Quality

- **ESLint** with `eslint-config-next` + `simple-import-sort`
- **Prettier** for consistent formatting
- **Husky** + **lint-staged** run on every commit (pre-commit hook)
- Lint failures block the commit
