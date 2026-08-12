/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import Youtube from "@tiptap/extension-youtube";

import ImageResize from "tiptap-extension-resize-image";

import MenuBar from "./menu-bar";

interface RichTextEditorProps {
  field: any;
}

export default function RichTextEditor({ field }: RichTextEditorProps) {
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
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal  ml-4",
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
    editorProps: {
      attributes: {
        class:
          "min-h-[400px] p-4 max-w-none rich-text-editor focus:outline-none prose prose-sm sm:prose lg:prose-lg max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : "",
    immediatelyRender: false,
  });

  // // Update editor content when form value changes externally
  // useEffect(() => {
  // 	if (editor && field.value && editor.getHTML() !== field.value) {
  // 		try {
  // 			const parsedContent = JSON.parse(field.value);
  // 			editor.commands.setContent(parsedContent);
  // 		} catch (error) {
  // 			console.warn("Failed to parse editor content:", error);
  // 			// Fallback to setting as HTML if JSON parsing fails
  // 			editor.commands.setContent(field.value);
  // 		}
  // 	}
  // }, [editor, field.value]);

  return (
    <div className="w-full">
      <div className="bg-card  overflow-hidden  rounded-lg border">
        <MenuBar editor={editor} />
        <div className=" h-[50vh] rich-text-editor  overflow-y-auto">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
