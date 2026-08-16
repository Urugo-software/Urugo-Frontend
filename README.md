# Urugo Frontend

The frontend application for **Urugo**, an AI-powered home search and rental management platform.

Built with **Next.js, TypeScript, Tailwind CSS, and TanStack Query**.

---

## Project Structure

```text
urugo frontend/
│
├── app/
│   ├── auth/
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   ├── sign-up/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/
│   │   ├── guest/
│   │   ├── landlord/
│   │   └── renter/
│   │
│   └── (platform)/
│       ├── features/
│       ├── properties/
│       ├── layout.tsx
│       └── page.tsx
│
├── components/
│   ├── providers/
│   │   └── QueryProvider.tsx
│   │
│   ├── platform/
│   │   ├── auth/
│   │   ├── features/
│   │   ├── home/
│   │   ├── layout/
│   │   └── properties/
│   │
│   ├── shared/
│   └── ui/
│
├── features/
│   ├── auth/
│   │   ├── api/
│   │   │   ├── login.ts
│   │   │   ├── logout.ts
│   │   │   ├── register.ts
│   │   │   ├── get-current-user.ts
│   │   │   ├── verify-otp.ts
│   │   │   ├── forgot-password.ts
│   │   │   └── reset-password.ts
│   │   │
│   │   ├── hooks/
│   │   │   ├── use-login.ts
│   │   │   ├── use-logout.ts
│   │   │   ├── use-register.ts
│   │   │   └── use-current-user.ts
│   │   │
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   │
│   │   └── keys.ts
│   │
│   ├── properties/
│   │   ├── api/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── keys.ts
│   │
│   ├── payments/
│   │   ├── api/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── keys.ts
│   │
│   └── notifications/
│       ├── api/
│       ├── hooks/
│       ├── types/
│       └── keys.ts
│
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   └── errors.ts
│   ├── fonts.ts
│   └── utils.ts
│
├── data/
│   ├── features-data.ts
│   ├── home-data.ts
│   ├── navbar-data.ts
│   └── properties.ts
│
├── types/
│   └── index.ts
│
├── public/
│   └── assets/
│
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## Folder Responsibilities

### `app/`

Contains the application's routes and layouts using the Next.js App Router.

It should mainly be responsible for:

- Pages
- Layouts
- Route groups
- Loading and error pages
- Route-level configuration

Example:

```text
app/auth/sign-in/page.tsx
```

---

### `components/`

Contains reusable UI components.

```text
components/
├── providers/
├── platform/
├── shared/
└── ui/
```

#### `components/providers/`

Application-wide React providers.

Example:

```text
QueryProvider.tsx
```

This is where the TanStack Query provider lives.

#### `components/platform/`

Components specific to the Urugo platform UI.

#### `components/shared/`

Reusable components used in different parts of the application.

#### `components/ui/`

Small reusable UI primitives, including components from libraries such as shadcn/ui.

---

## `features/`

This folder contains the application's **business features and their related logic**.

Each feature is isolated into its own folder.

```text
features/
├── auth/
├── properties/
├── payments/
└── notifications/
```

A feature contains the code needed to make that feature work.

### Example: `features/auth/`

```text
features/auth/
├── api/
├── hooks/
├── types/
└── keys.ts
```

#### `api/`

Contains functions responsible for communicating with the backend.

Example:

```text
login.ts
logout.ts
register.ts
get-current-user.ts
```

These functions handle HTTP requests and do not directly depend on TanStack Query.

#### `hooks/`

Contains React hooks that connect the feature to TanStack Query.

Example:

```text
use-login.ts
use-logout.ts
use-current-user.ts
```

For example:

```text
LoginForm
    ↓
useLogin()
    ↓
login.ts
    ↓
Backend
```

#### `types/`

Contains TypeScript types that belong specifically to the feature.

Example:

```text
auth.types.ts
```

#### `keys.ts`

Contains the TanStack Query keys used by the feature.

Example:

```ts
export const authKeys = {
  all: ["auth"] as const,

  currentUser: () => [...authKeys.all, "current-user"] as const,
};
```

This keeps query keys consistent throughout the application.

---

## `lib/`

Contains reusable application infrastructure and utilities.

```text
lib/
├── api/
├── fonts.ts
└── utils.ts
```

### `lib/api/`

Contains shared API functionality.

For example:

```text
client.ts
errors.ts
```

The API client can handle common things such as:

- Base API URL
- Request configuration
- Authentication credentials
- Common headers
- API errors

---

## `data/`

Contains static data used by the UI.

Examples:

```text
features-data.ts
home-data.ts
navbar-data.ts
properties.ts
```

This is useful for data that doesn't need to come from the backend.

---

## `types/`

Contains types that are shared across multiple unrelated features.

Feature-specific types should stay inside their feature.

For example:

```text
features/auth/types/auth.types.ts
```

is preferred for authentication-specific types.

---

## TanStack Query Architecture

Urugo uses **TanStack Query** for server state.

The general flow is:

```text
Component
    ↓
TanStack Query Hook
    ↓
API Function
    ↓
Urugo Backend
    ↓
Database
```

For queries:

```text
Component
    ↓
useQuery()
    ↓
API function
    ↓
GET request
```

For mutations:

```text
Component
    ↓
useMutation()
    ↓
API function
    ↓
POST / PATCH / DELETE
```

After mutations, affected queries can be invalidated or updated:

```text
Mutation
    ↓
Server changes
    ↓
Invalidate affected query
    ↓
TanStack Query refetches when appropriate
    ↓
Updated UI
```

---

## Authentication Architecture

Authentication will use the following structure:

```text
features/auth/
├── api/
├── hooks/
├── types/
└── keys.ts
```

The expected flow is:

```text
Login Form
    ↓
useLogin()
    ↓
useMutation()
    ↓
login.ts
    ↓
Backend
    ↓
Session / Authentication
    ↓
["auth", "current-user"]
    ↓
Authenticated UI
```

Logout follows a similar pattern:

```text
Logout Button
    ↓
useLogout()
    ↓
useMutation()
    ↓
logout.ts
    ↓
Backend
    ↓
Session destroyed
    ↓
Private cached data removed
    ↓
Login page
```

---

## Main Technologies

- **Next.js** — React framework and application routing
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **TanStack Query** — Server state and API data management
- **pnpm** — Package management

---

## Development

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build the application:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

---

## Architecture Goal

The goal of this structure is to keep:

```text
UI
↓
Feature Logic
↓
Server State
↓
API
↓
Backend
```

separated and easy to maintain as Urugo grows.
