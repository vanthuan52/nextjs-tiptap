# Next Tiptap Editor

> A modern rich text editor built with [Tiptap v3](https://tiptap.dev/), [Radix UI](https://www.radix-ui.com/), and [Tailwind CSS v4](https://tailwindcss.com/). Designed as a **copy-paste feature module** for Next.js and React projects.

> **Acknowledgments**: Inspired by and adapted from [ndtrung341/next-tiptap](https://github.com/ndtrung341/next-tiptap).

![Next Tiptap Editor](https://i.imgur.com/WW1QbSW.png)

**[Live Demo →](https://nextjs-tiptap.vercel.app/)**

## Features

- **Text**: Bold, italic, underline, strike, code, sub/superscript, color, highlight, alignment
- **Structure**: Headings H1–H6, ordered/unordered lists, blockquotes, indent
- **Media**: Images (upload, resize, caption), YouTube embeds, tables (cell alignment, merge/split)
- **Code**: Syntax-highlighted code blocks via **Shiki** (dual light/dark theme)
- **Tools**: Drag & drop blocks, fullscreen, HTML source view (CodeMirror), Word (.docx) export
- **Rendering**: CSR + SSR renderers for read-only display
- **Theming**: Pure CSS variables — dark mode without touching module internals

## Quick Start

```bash
git clone https://github.com/vanthuan52/nextjs-tiptap.git
cd nextjs-tiptap
pnpm install && pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Image uploads

The base editor does not ship with a storage provider. By default, selecting an
image inserts a local blob URL for preview. In production, pass your own
`onImageUpload` or `onImageSelect` adapter and return the stored image URL.

`mediaKey` is optional metadata for your storage layer, such as an S3 object key.

```tsx
<TiptapEditor
  onImageUpload={async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    return {
      url: data.url,
      width: data.width,
      height: data.height,
      alt: data.alt,
      mediaKey: data.mediaKey,
    };
  }}
/>
```

## Integration

The core module lives in `src/features/tiptap-editor/`. Copy it into your project and follow the **[Module Documentation](src/features/tiptap-editor/README.md)** for setup.

```tsx
"use client";
import { useRef } from "react";
import TiptapEditor, { type TiptapEditorRef } from "@/features/tiptap-editor";

export default function MyEditor() {
  const editorRef = useRef<TiptapEditorRef>(null);

  return (
    <TiptapEditor
      ref={editorRef}
      output="html"
      minHeight={320}
      placeholder={{ paragraph: "Start typing..." }}
      onChange={(html) => console.log(html)}
    />
  );
}
```

## Tech Stack

| Technology | Version |
|-----------|---------|
| [Next.js](https://nextjs.org/) | 16 (App Router) |
| [React](https://react.dev/) | 19 |
| [Tiptap](https://tiptap.dev/) | v3 |
| [Radix UI](https://www.radix-ui.com/) | Latest |
| [Tailwind CSS](https://tailwindcss.com/) | v4 |
| [Shiki](https://shiki.style/) | 4 |
| [CodeMirror](https://codemirror.net/) | 6 |
| [TypeScript](https://www.typescriptlang.org/) | 5 |

<br />
<p align="center"><strong>Built with ❤️ using Next.js and Tiptap</strong></p>
