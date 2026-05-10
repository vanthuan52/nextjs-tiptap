# TiptapEditor — Boilerplate Feature Module

A complete WYSIWYG rich text editor module built on [Tiptap v3](https://tiptap.dev/). Designed as a **boilerplate/copy-paste** solution — simply copy the entire folder into your project, install dependencies, and start using it immediately.

> **Philosophy**: This feature is designed to be "immutable" — whether your projects have different dark modes, themes, or upload adapters, you **do not need to modify anything inside** this module. All customizations are done externally (in the host project).

---

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props](#props)
- [Image Upload](#image-upload)
- [Renderer (Read-only)](#renderer-read-only)
- [Dark Mode](#dark-mode)
- [Theming (CSS Variables)](#theming-css-variables)
- [Module Structure](#module-structure)
- [Dependencies List](#dependencies-list)

---

## Installation

### Step 1 — Copy the module

Copy the entire `tiptap-editor/` folder into your project:

```
src/
└── features/
    └── tiptap-editor/   ← copy here
```

### Step 2 — Install dependencies

```bash
npm install \
  @tiptap/core \
  @tiptap/react \
  @tiptap/pm \
  @tiptap/starter-kit \
  @tiptap/extensions \
  @tiptap/extension-drag-handle \
  @tiptap/extension-drag-handle-react \
  @tiptap/extension-file-handler \
  @tiptap/extension-image \
  @tiptap/extension-list \
  @tiptap/extension-subscript \
  @tiptap/extension-superscript \
  @tiptap/extension-table \
  @tiptap/extension-text-align \
  @tiptap/extension-text-style \
  @tiptap/extension-youtube \
  @tiptap/extension-code-block \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-popover \
  @radix-ui/react-tooltip \
  clsx \
  react-colorful \
  react-icons \
  react-hook-form \
  react-window \
  prosemirror-highlight \
  shiki \
  lowlight \
  prettier \
  codemirror \
  @codemirror/autocomplete \
  @codemirror/commands \
  @codemirror/lang-html \
  @codemirror/language \
  @codemirror/state \
  @codemirror/view \
  rehype \
  rehype-react \
  docx
```

*(Note: Make sure your project is configured with Tailwind CSS v4, as this module's styles utilize some Tailwind v4 conventions)*

### Step 3 — Import styles

Import **once** in the root layout of your project:

```tsx
// Next.js: src/app/layout.tsx
// React:   src/main.tsx or src/App.tsx

import "@/features/tiptap-editor/styles/index.css";
```

### Step 4 — Declare CSS variables

Add to `globals.css` (or your global CSS file):

```css
:root {
  --rte-bg: #fff;
  --rte-fg: #1f2328;
  --rte-border: #d1d9e0;
  --rte-primary: #0969da;
  --rte-primary-fg: #fff;
  --rte-secondary: #f0f1f3;
  --rte-secondary-fg: #59636e;
  --rte-muted: #f6f8fa;
  --rte-muted-fg: #59636e;
  --rte-accent: #818b981f;
  --rte-accent-fg: #59636e;
  --rte-tooltip: #25292e;
  --rte-tooltip-fg: #f0f0f0;
  --rte-overlay: #32324d33;
  --rte-radius: 0.5rem;
  --rte-editor-font-size: 15px;
  --rte-editor-line-height: 1.6;
  --rte-editor-code-bg: #f6f8fa;
  --rte-editor-scrollbar: #00000040;
  --rte-editor-selection: #2383e247;

  /* Shiki syntax highlighting — activate light theme token colors */
  .shiki span {
    color: var(--shiki-light);
  }
}
```

> See the [Dark Mode](#dark-mode) section to add variables for dark mode.

---

## Basic Usage

### Next.js (App Router)

Since the editor uses browser APIs, it needs to be loaded client-side:

```tsx
// app/page.tsx
"use client";

import { useRef } from "react";
import TiptapEditor, { type TiptapEditorRef } from "@/features/tiptap-editor";

export default function Page() {
  const editorRef = useRef<TiptapEditorRef>(null);

  return (
    <TiptapEditor
      ref={editorRef}
      output="html"
      placeholder={{ paragraph: "Start typing..." }}
      onChange={(html) => console.log(html)}
    />
  );
}
```

Or use `dynamic import` if the component is a Server Component:

```tsx
// app/page.tsx  (Server Component)
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(() => import("@/features/tiptap-editor"), {
  ssr: false,
});
```

### React (Vite, CRA...)

```tsx
import { useRef } from "react";
import TiptapEditor, { type TiptapEditorRef } from "@/features/tiptap-editor";

export default function MyEditor() {
  const editorRef = useRef<TiptapEditorRef>(null);

  return (
    <TiptapEditor
      ref={editorRef}
      output="html"
      content="<p>Initial content</p>"
      minHeight={320}
      onChange={(html) => setValue(html as string)}
    />
  );
}
```

### Integration with React Hook Form

```tsx
import { Controller, useForm } from "react-hook-form";
import TiptapEditor, { type TiptapEditorRef } from "@/features/tiptap-editor";

export default function PostForm() {
  const { control, handleSubmit } = useForm<{ content: string }>();
  const editorRef = useRef<TiptapEditorRef>(null);

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        control={control}
        name="content"
        render={({ field }) => (
          <TiptapEditor
            ref={editorRef}
            output="html"
            onChange={field.onChange}
            placeholder={{ paragraph: "Enter post content..." }}
          />
        )}
      />
      <button type="submit">Save</button>
    </form>
  );
}
```

---

## Props

| Prop            | Type                                                      | Default     | Description                        |
| --------------- | --------------------------------------------------------- | ----------- | ---------------------------------- |
| `output`        | `"html" \| "json"`                                        | `"html"`    | Output format for `onChange`       |
| `content`       | `string \| JSONContent`                                   | `undefined` | Initial content                    |
| `editable`      | `boolean`                                                 | `true`      | Allow editing                      |
| `disabled`      | `boolean`                                                 | `false`     | Disable all interactions           |
| `minHeight`     | `string \| number`                                        | `320`       | Minimum height (px)                |
| `maxHeight`     | `string \| number`                                        | `undefined` | Maximum height (px)                |
| `maxWidth`      | `string \| number`                                        | `undefined` | Maximum width (px)                 |
| `placeholder`   | `string \| { paragraph?: string; imageCaption?: string }` | `undefined` | Placeholder text                   |
| `delay`         | `number`                                                  | `1500`      | Debounce delay for `onChange` (ms) |
| `onChange`      | `(content: Content) => void`                              | `undefined` | Callback when content changes      |
| `onImageUpload` | `(file: File) => Promise<ImageUploadResult>`              | `undefined` | Handler for uploading image to server |
| `onImageSelect` | `() => Promise<ImageUploadResult \| null>`                | `undefined` | Open custom media picker           |

### Ref methods

```tsx
const editorRef = useRef<TiptapEditorRef>(null);

// Get content
editorRef.current?.getHTML();
editorRef.current?.getJSON();

// Word / Character count
editorRef.current?.storage.characterCount.words();
editorRef.current?.storage.characterCount.characters();

// Programmatic Commands
editorRef.current?.commands.setContent("<p>New content</p>");
editorRef.current?.commands.focus();
```

---

## Image Upload

The module supports 3 image modes:

### Mode 1 — Local Preview (Default, no config needed)

User selects a file → displays as a `blob:` URL. Suitable for prototyping.

### Mode 2 — Upload to your server

```tsx
<TiptapEditor
  onImageUpload={async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    return {
      url: data.url, // required
      alt: data.alt, // optional
      width: data.width, // optional
      height: data.height, // optional
    };
  }}
/>
```

### Mode 3 — Open Custom Media Picker (Cloudinary, S3 browser, image library...)

```tsx
<TiptapEditor
  onImageSelect={async () => {
    // Open your picker UI, return the selected image or null if canceled
    const image = await openMyMediaLibrary();
    if (!image) return null;

    return {
      url: image.url,
      width: image.width,
      height: image.height,
    };
  }}
/>
```

> **Priority**: `onImageSelect` > `onImageUpload` > local blob URL

---

## Renderer (Read-only)

Used to display saved HTML content in read-only mode with full styles.

### Client-side (CSR)

```tsx
"use client";

import { TiptapClientRenderer } from "@/features/tiptap-editor";

export default function ArticlePage({ html }: { html: string }) {
  return (
    <article>
      <TiptapClientRenderer>{html}</TiptapClientRenderer>
    </article>
  );
}
```

### Server-side (SSR) — Next.js App Router

```tsx
// app/posts/[id]/page.tsx  (Server Component, no "use client" needed)
import { TiptapServerRenderer } from "@/features/tiptap-editor";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);

  return (
    <article>
      <TiptapServerRenderer>{post.html}</TiptapServerRenderer>
    </article>
  );
}
```

> **Note**: `TiptapServerRenderer` processes HTML synchronously so it's suitable for Server Components. `TiptapClientRenderer` processes asynchronously, rendering after the component mounts.

Both renderers automatically wrap the content in `<div class="rte-content">` with full styles.

---

## Dark Mode

> **Feature `tiptap-editor` doesn't require any modifications** when you add dark mode. The module simply reads `--rte-*` CSS variables. Overriding those variables in the host project is sufficient.

### Option A — Tailwind class-based (`.dark` on `<html>`)

Use when the project uses Tailwind CSS with dark mode class strategy (`darkMode: 'selector'` in Tailwind v4) or `next-themes`:

```css
/* globals.css */
.dark {
  --rte-bg: #0d1017;
  --rte-fg: #f0f6fc;
  --rte-border: #3d444d;
  --rte-primary: #4493f8;
  --rte-secondary: #2e373e;
  --rte-secondary-fg: #b1b8c0;
  --rte-muted: #1a2029;
  --rte-muted-fg: #b1b8c0;
  --rte-accent: #2d3440;
  --rte-accent-fg: #b1b8c0;
  --rte-tooltip: #3d444d;
  --rte-tooltip-fg: #f0f0f0;
  --rte-overlay: #ffffff30;
  --rte-editor-code-bg: #1a2029;
  --rte-editor-scrollbar: #ffffff40;

  code span.shiki {
    color: var(--rte-shiki-dark);
  }
}
```

### Option B — System dark mode (`prefers-color-scheme`)

Use when the project follows the system preference, no manual toggle needed:

```css
/* globals.css */
@media (prefers-color-scheme: dark) {
  :root {
    --rte-bg: #0d1017;
    --rte-fg: #f0f6fc;
    --rte-border: #3d444d;
    --rte-primary: #4493f8;
    --rte-secondary: #2e373e;
    --rte-secondary-fg: #b1b8c0;
    --rte-muted: #1a2029;
    --rte-muted-fg: #b1b8c0;
    --rte-editor-code-bg: #1a2029;

    code span.shiki {
      color: var(--rte-shiki-dark);
    }
  }
}
```

---

## Theming (CSS Variables)

Customize the editor UI according to the project's brand:

```css
:root {
  /* Main Colors */
  --rte-bg: #ffffff; /* Editor background */
  --rte-fg: #1f2328; /* Text color */
  --rte-border: #d1d9e0; /* Border color */
  --rte-primary: #0969da; /* Primary color (active button, link...) */
  --rte-primary-fg: #fff; /* Text on primary */
  --rte-secondary: #f0f1f3; /* Secondary background */
  --rte-muted: #f6f8fa; /* Muted background (code block, table header...) */
  --rte-muted-fg: #59636e; /* Muted text (placeholder, caption...) */
  --rte-tooltip: #25292e; /* Tooltip background */
  --rte-tooltip-fg: #f0f0f0; /* Tooltip text */
  --rte-overlay: #32324d33; /* Overlay (dialog backdrop) */

  /* Editor */
  --rte-radius: 0.5rem; /* Global border radius */
  --rte-editor-font-size: 15px; /* Font size in editor */
  --rte-editor-line-height: 1.6;
  --rte-editor-code-bg: #f6f8fa; /* Code block background */
  --rte-editor-selection: #2383e247; /* Highlight color when selecting text */
}
```

---

## Module Structure

```
tiptap-editor/
├── components/           # UI components (toolbar, menus, controls...)
│   ├── controls/         # Buttons in the toolbar (bold, image, table...)
│   ├── editor.tsx        # Main component — import this
│   ├── menu-bar.tsx      # Toolbar
│   └── ...
├── context/
│   └── editor-config.tsx # Context to inject image upload handlers
├── extensions/           # Custom Tiptap extensions
│   ├── code-block-shiki/ # Code block with Shiki syntax highlighting
│   ├── code-block-lowlight/ # Alternative: Lowlight highlighting
│   ├── image/            # Image resize + caption
│   ├── source-view/      # View raw HTML source
│   └── ...
├── helpers/              # Utility functions
├── hooks/                # React hooks (useImage, useLink, useTable...)
├── lib/
│   ├── shiki/            # Shiki highlighter config (bundled languages)
│   ├── lowlight/         # Lowlight config
│   └── docx/             # DOCX export engine
├── renderer/             # Read-only content renderer
│   ├── client-renderer.tsx   # CSR — use in Client Components
│   ├── server-renderer.tsx   # SSR — use in Server Components
│   ├── components/
│   │   ├── custom.tsx        # Custom HTML element renderers
│   │   ├── heading-with-anchor.tsx
│   │   └── syntax-highlighter.tsx
├── styles/
│   └── index.css         # ← Import this file into layout
└── index.ts              # ← Public API — import from here
```

---

## Dependencies List

All packages that need to be installed in the host project:

| Package                                                                               | Purpose                       |
| ------------------------------------------------------------------------------------- | ----------------------------- |
| `@tiptap/core`, `@tiptap/react`, `@tiptap/pm`                                         | Core Tiptap                   |
| `@tiptap/starter-kit`, `@tiptap/extensions`                                           | Extensions bundle             |
| `@tiptap/extension-*`                                                                 | Individual extensions         |
| `@radix-ui/react-dropdown-menu`, `@radix-ui/react-popover`, `@radix-ui/react-tooltip` | UI primitives                 |
| `clsx`                                                                                | Class name utility            |
| `react-colorful`                                                                      | Color picker                  |
| `react-icons`                                                                         | Icon set                      |
| `react-window`                                                                        | Virtual list (emoji picker)   |
| `prosemirror-highlight`                                                               | Syntax highlighting bridge    |
| `shiki`                                                                               | Syntax highlighter (editor)   |
| `lowlight`                                                                            | Alternative highlighter       |
| `prettier`                                                                            | Format HTML in Source View    |
| `codemirror` + `@codemirror/*`                                                        | Source View editor            |
| `rehype`, `rehype-react`                                                              | HTML → React (renderer)       |
| `docx`                                                                                | Export to Word (.docx)        |

---

## Real-world Example

See the `src/features/tiptap-editor-demo/` folder in this project to see:

- **Edit page** (`/`) — Form with title + TiptapEditor, auto-save to localStorage, export .docx
- **Post CSR** (`/post-csr`) — Read content using `TiptapClientRenderer` (Client Component)
- **Post SSR** (`/post-ssr`) — Read content using `TiptapServerRenderer` (Server Component)
