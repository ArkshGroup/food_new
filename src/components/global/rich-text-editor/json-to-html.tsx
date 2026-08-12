/** biome-ignore-all lint/correctness/useHookAtTopLevel: <explanation> */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Highlight from "@tiptap/extension-highlight";
import History from "@tiptap/extension-history";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TableKit } from "@tiptap/extension-table";
import ImageResize from "tiptap-extension-resize-image";
import Youtube from "@tiptap/extension-youtube";

export function JsonToHtml({ json, className = "" }: { json?: string | null; className?: string }) {
  if (!json) {
    return (
      <div className="text-muted-foreground text-center text-sm">
        No content available
      </div>
    );
  }
  const content = JSON.parse(json);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        codeBlock: false,
        strike: false,
        history: false,
      }),
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      ImageResize,
      TableKit.configure({
        table: { resizable: true },
      }),
      TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 hover:text-blue-700 underline cursor-pointer",
        },
      }),
      Typography,
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
      // Image.configure({
      //   HTMLAttributes: {
      //     class: "rounded-lg h-64 my-4 shadow-none",
      //   },
      //   inline: true,
      // }),
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-4",
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class:
            "bg-gray-100 dark:bg-gray-800 rounded-md p-4 font-mono text-sm my-4 overflow-x-auto",
        },
      }),
      Strike,
      History.configure({
        depth: 50,
        newGroupDelay: 1000,
      }),
    ],
    editable: false,
    editorProps: {
      attributes: {
        class: `rich-text-editor text-stone-700 text-sm sm:text-base leading-relaxed max-w-none ${className}`,
      },
    },
    content,
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
}
