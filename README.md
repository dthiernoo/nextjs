
# Complete Beginner Guide to Next.js
Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.

## Table of Content
* Getting Started
    - Automatic Installation
    - Running Your Project
* Routing
* Rendering
* Data Fetching
* Styling


## Getting Started

### Automatic Installation
You create a new Next.js app using `create-next-app`, which sets up everything automatically for you. To create a project, run:

```bash
npx create-next-app@latest [directory-name]
```

After running the command, you'll see the following questions:
```bash
Would you like to use TypeScript? Yes
Would you like to use ESLint? Yes
Would you like to use Tailwind CSS? Yes
Would you like to use `src/` directory? Yes
Would you like to use App Router? (recommended) Yes
Would you like to customize the default import alias (@/*)? No 
```

### Running Your Project

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Now you have a Next.js app up and running. In the next section we'll dive into the project structure.


## Routing
Next.js has a file-system based routing mechanism. URL paths that users can access in the browser are defined by files and folders in your codebase. 

### Routing Convention
All routes must be placed inside the app folder. Every folder corresponds to a path segment in the browser URL. Each folder should have a file named `page.tsx` in which you do a default export of a function which returns jsx.

```tsx
export default function HomePage() {
    return <h1>Hello World</h1>;
};

```