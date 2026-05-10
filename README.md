# Next Tiptap Editor

> **Acknowledgments**: A special thanks to the original author! This project is inspired by and adapted from the excellent foundation provided by [ndtrung341/next-tiptap](https://github.com/ndtrung341/next-tiptap).

A modern, feature-rich WYSIWYG rich text editor built with [Tiptap](https://tiptap.dev/), [Radix UI](https://www.radix-ui.com/), and [Tailwind CSS v4](https://tailwindcss.com/) for React and Next.js applications.

Designed as a **boilerplate feature module** — you can simply copy the `tiptap-editor` folder into your own project and use it instantly, without worrying about conflicting global styles.

![Next Tiptap Editor](https://i.imgur.com/WW1QbSW.png)

## Demo

Try it yourself in this [live demo!](https://nextjs-tiptap.vercel.app/)

## ✨ Features

### 📝 Rich Text Editing

- **Text Formatting**: Bold, italic, underline, strikethrough, code, subscript, superscript
- **Headings**: Multiple heading levels (H1-H6)
- **Lists**: Ordered and unordered lists with nested support
- **Text Alignment**: Left, center, right, and justify alignment
- **Text Styling**: Custom text color and background highlighting
- **Links**: Insert and edit hyperlinks with custom text

### 📦 Advanced Content

- **Media Management**: Advanced image handling with **Cloudinary integration** (upload, resize, align, captions)
- **Tables**: Create and edit tables with cell alignment and formatting
- **Code Blocks**: Syntax-highlighted code blocks (using **Shiki** or **Lowlight**) with language selection
- **YouTube Embeds**: Embed YouTube videos directly in your content
- **Drag & Drop**: Reorder content blocks with intuitive drag handles
- **Source View**: Built-in HTML source code editor powered by CodeMirror
- **Export**: Export content directly to Word (.docx) format

---

## 🚀 Quick Start (Demo Application)

To run the demo application locally:

### Installation

```bash
# Clone the repository
git clone https://github.com/vanthuan52/nextjs-tiptap.git

# Navigate to project directory
cd nextjs-tiptap

# Install dependencies
pnpm install

# or
npm install

# or
yarn install
```

### Environment Variables

Create a `.env.local` file for Cloudinary image upload to work:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Development

```bash
# Start development server
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the editor in action.

---

## 📂 Project Structure

```
tiptap-editor-next/
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router (Demo Pages & API Routes)
│   │   ├── api/upload/     # Cloudinary upload proxy API
│   │   └── ...
│   ├── features/
│   │   ├── tiptap-editor/  # 📦 THE CORE MODULE (Copy this to your project)
│   │   │   ├── components/ # Editor UI (toolbar, buttons, dialogs)
│   │   │   ├── extensions/ # Custom Tiptap extensions
│   │   │   ├── renderer/   # CSR & SSR HTML renderers
│   │   │   ├── styles/     # Tailwind CSS & UI Variables
│   │   │   └── README.md   # Detailed module documentation
│   │   │
│   │   └── tiptap-editor-demo/ # Demo implementations (Forms, CSR, SSR pages)
│   │
│   └── lib/                # Shared application utilities
├── tailwind.css            # Tailwind v4 configuration
└── package.json
```

---

## 🔌 Integration Guide (For Your Projects)

Integrating this editor into your own Next.js or React project is straightforward. **This is not an npm package**, but rather a feature module designed for maximum flexibility.

### Step 1: Copy the Module

Copy the entire `src/features/tiptap-editor/` directory into your project's `src/features/` (or `src/components/`) folder.

### Step 2: Install Dependencies

Install the required packages. This editor uses Tiptap, Radix UI, CodeMirror, and Tailwind CSS.

_For the full list of dependencies, see the [Module README](src/features/tiptap-editor/README.md#step-2--install-dependencies)._

### Step 3: Setup Styles

Import the module's styles in your root layout (`app/layout.tsx` or `main.tsx`):

```tsx
import "@/features/tiptap-editor/styles/index.css";
```

### Step 4: Add CSS Variables

The editor relies on CSS variables for its theme. Add them to your `globals.css` (or equivalent):

```css
:root {
  --rte-bg: #fff;
  --rte-fg: #1f2328;
  --rte-border: #d1d9e0;
  --rte-primary: #0969da;
  --rte-primary-fg: #fff;
  /* ... copy the rest from the Module README ... */
}
```

### Step 5: Implementation

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
      onChange={(content: string) => console.log("Content updated:", content)}
      placeholder={{ paragraph: "Start typing..." }}
      onImageUpload={async (file: File) => {
        // Implement your upload logic here (e.g., Cloudinary API proxy)
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        return { url: data.url };
      }}
    />
  );
}
```

> **For complete details on Props, SSR Rendering, Theming, and Image Upload modes**, please read the detailed **[Module Documentation](src/features/tiptap-editor/README.md)**.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - App Router
- **React**: [React 19](https://react.dev/)
- **Editor**: [Tiptap v3](https://tiptap.dev/) - Headless editor framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Syntax Highlighting**: [Shiki](https://shiki.style/) & [CodeMirror](https://codemirror.net/)

<br />
<p align="center"><strong>Built with ❤️ using Next.js and Tiptap</strong></p>
