
# Complete Beginner Guide to Next.js
Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.
&nbsp;
&nbsp;
&nbsp;
## Table of Content
* Getting Started
    - Automatic Installation
    - Running Your Project
* Routing
    - Routing Convention
    - Layouts
        - Root Layout (Require)
    - Templates
    - Metadata
        - Title Metadata
    - Linking and Navigating
        - Link Component
        - usePathname
        - useRouter (for client side)
        - redirect (for server side)
* Rendering
* Data Fetching
* Styling

&nbsp;
&nbsp;&nbsp;

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

&nbsp;
&nbsp;
&nbsp;

## Routing
Next.js has a file-system based routing mechanism. URL paths that users can access in the browser are defined by files and folders in your codebase. 

### Routing Convention
All routes must be placed inside the app folder. Every folder corresponds to a path segment in the browser URL. Each folder should have a file named `page.tsx` in which you do a default export of a function which returns jsx.

```tsx
export default function HomePage() {
    return <h1>Hello World</h1>;
};
```

#### Layouts
A layout is UI that is shared between multiple routes. On navigation, layouts do not re-render. Layouts can also be nested. You can define a layout by default exporting a React component from a `layout.tsx` file. The component should accept a `children` prop of type `React.ReactNode` that will be populated with a child layout (if it exists) or a page during rendering.

```tsx
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>
 
      {children}
    </section>
  )
}
```

#### Root Layout (Required)
The root layout is defined at the top level of the `app` directory and applies to all routes. The layout is required and must contain `html` and `body` tags, allowing you to modify the initial HTML returned from the server.

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body>
                {/* Root Layout UI */}
                { children }
            </body>
        </html>
    )
}
```

#### Templates
Templates ares similar to layouts in that they wrap each child layout or page. However, the difference is that unlike layouts that persist across routes and maintain state, templates create a new instance for each of their children on navigation. This means that when a user navigates between routes that share a template, a new instance of the component is mounted, DOM elements are recreateds, states is not preserved and effects are re-synchronized.

A template can be defined by exporting a default React component from a template.js file. The component should accept a children prop.

```tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

### Metadata
In the `app` directory, you can modify the `<head>` HTML elements such as `title` and `meta` by using the Metadata API. You should not manually add `<head>` tags such as `<title>` and `<meta>` to root layouts. Instead, you should use the Metadata API which automatically handles advanced requirements such as streaming and de-duplicating `<head>` elements.

Metadata can be defined by exporting a `metadata` object of type `Metadata` from 'next' or `generateMetadata` function that returns an object of type `Metadata` in a layout.js or page.js file.

```tsx
// Exporting a static metadata object
import { Metadata } from 'next';

export const metatda: Metadata = {
    title: "Next.js",
    description: "My Next.js file"
};

export default function Page() {
    return '...';
};
```

```tsx
// Exporting a dynamic generateMetadata function
import { Metadata } from 'next';

type PageProps = {
    params: {
        blogId: string
    }
};

export const generateMetadata = ({ params }: PageProps): Metadata => {
    return {
        title: `Next.js blog ${params.blogId}`,
        description: "My Next.js file"
    }
};

export default function Page() {
    return '...';
};
```

```tsx
// Exporting a dynamic generateMetadata function
import { Metadata } from 'next';

type PageProps = {
    params: {
        blogId: string
    }
};

export const generateMetadata = async ({ params }: PageProps): Metadata => {
    const description = await fetchBlogDescription(params.blogId);
    return {
        title: `Next.js blog ${params.blogId}`,
        description: `${description} | Next.js`
    }
};

export default function Page() {
    return '...';
};
```

Both `layout.tsx` and `page.tsx` files can export metadata. If defined in a layout, it applies to all pages in that layout, but if defined in a page, it applies only to that page. Metadata is read in order, from the root level down to the final page level. When there's metadata in multiple places for the same route, they get combined, but page metadata will replace layout metadata if they have the same properties.

#### Title Metadata
The title field's primary purpose is to define the document title. You can define it either by a simple string (view example above or as an object).

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        // Useful when you want to provide a title that completely ignores the title
        // template set in the parent segments.  
        absolute: '', 

        // Useful when you want to provide fallback title for child route segments
        // that don't explicitly specify a title.
        default: 'Next.js Tutorial | dthiernoo', 

        // Useful when you want to create dynamic titles by addung a prefix or a suffix.
        // It applies to child route segments and not the segment in which it is defined.
        template: '%s | dthiernoo'
    }
};

export default function Page() {
    return '...';
};
```

### Linking and Navigating
There are four ways to navigate between routes in Next.js:
- Using the `<Link>` Component
- Using the useRouter hook (Client Components)
- Using the redirect function (Server Components)

#### Link Component
`<Link>` is a built-in component that extends the `<a>`HTML tag to provide prefetching and client-side navigation between routes. It is the primary way and recommended way to navigate between routes in Next.js.

You can use it by importing it from `next/link`, and passing a href props to the component:
```tsx
import Link from 'next/link';

export default function Page() {
    return <Link href={"/dashboard"}>Dashboard</Link>
};
```

For more info: https://nextjs.org/docs/app/api-reference/components/link

![alt text](/public/image.png)

#### usePathname
You can use `usePathname()` to get the current pathname. This could be used to determine if a link is active.

```tsx
import { usePathname } from 'next/navigation';
import Link from 'next/link'
 
export function Links() {
  const pathname = usePathname()
 
  return (
    <nav>
      <ul>
        <li>
          <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname === '/about' ? 'active' : ''}`}
            href="/about"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  )
}
```

#### useRouter hook
The `useRouter` hook allows you to programmatically change routes from Client Components. It is recommended to use `<Link>` component to navigate between routes unless you have a specific requirement for using `useRouter`.

```tsx
"use client"

import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();

    return (
        <button type="button" onClick={() => router.push('/dashboard')}>
            Dashboard
        </button>
    )
}

```

Reference: https://nextjs.org/docs/app/api-reference/functions/use-router

![alt text](/public/image2.png)

#### redirect function
For Server Components, use the `redirect` function instead.

```tsx
import { redirect } from 'next/navigation'
 
async function fetchTeam(id: string) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}
 
export default async function Profile({ params }: { params: { id: string } }) {
  const team = await fetchTeam(params.id)
  if (!team) {
    redirect('/login')
  }
 
  // ...
}

```

