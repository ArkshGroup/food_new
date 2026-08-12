/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import { useState } from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  Link,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Table,
  TableProperties,
  Underline,
  Undo,
  VideoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Toggle } from "@/components/ui/toggle";
import type { Editor } from "@tiptap/react";
import { handleImageUploadFromRichTextEditor } from "@/lib/handle-upload";
import { getYoutubeEmbedUrl } from "./get-youtube-embedded-url";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [tableDialogOpen, setTableDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<File | string | null>(null);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [height, setHeight] = useState(480);
  const [width, setWidth] = useState(640);
  const [videoUrl, setVideoUrl] = useState("");

  if (!editor) return null;
  const addYoutubeVideo = () => {
    if (videoUrl.length > 0) {
      const url = getYoutubeEmbedUrl(videoUrl);
      editor.commands.setYoutubeVideo({
        src: url || videoUrl,
        height: height,
        width: width,
      });
    }
  };

  const removeYoutubeVideo = () => {
    editor.chain().focus().deleteSelection().run();
  };

  const executeCommand = (command: () => void) => {
    const currentScrollPosition = window.scrollY;
    command();
    requestAnimationFrame(() => {
      if (window.scrollY !== currentScrollPosition) {
        window.scrollTo(0, currentScrollPosition);
      }
    });
  };

  const addImage = async () => {
    if (!imageUrl) {
      console.error("No file provided for upload.");
      throw new Error("No file provided.");
    }

    if (typeof imageUrl === "string") {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageDialogOpen(false);
      return;
    }

    try {
      setIsImageUploading(true);
      const result = await handleImageUploadFromRichTextEditor(imageUrl);
      executeCommand(() => {
        editor
          .chain()
          .focus()
          .setImage({
            src: result.url,
            alt: imageUrl.name,
            title: imageUrl.name,
          })
          .run();
      });
      setImageUrl(null);
      setImageDialogOpen(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    } finally {
      setIsImageUploading(false);
    }
  };

  const addLink = () => {
    if (linkUrl) {
      executeCommand(() => {
        editor.chain().focus().setLink({ href: linkUrl }).run();
      });
      setLinkDialogOpen(false);
      setLinkUrl("");
    }
  };

  const removeLink = () => {
    executeCommand(() => {
      editor.chain().focus().unsetLink().run();
    });
  };

  const insertTable = () => {
    executeCommand(() => {
      editor
        .chain()
        .focus()
        .insertTable({ rows: tableRows, cols: tableCols, withHeaderRow: true })
        .run();
    });
    setTableDialogOpen(false);
  };

  const setBackgroundColor = (color: string) => {
    executeCommand(() => {
      editor.chain().focus().setHighlight({ color }).run();
    });
  };

  const fontSizes = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "28px",
    "32px",
  ];

  const Options = [
    {
      icon: <Undo className="size-4" />,
      onClick: () => executeCommand(() => editor.chain().focus().undo().run()),
      tooltip: "Undo",
    },
    {
      icon: <Redo className="size-4" />,
      onClick: () => executeCommand(() => editor.chain().focus().redo().run()),
      tooltip: "Redo",
    },
    {
      icon: <Eraser className="size-4" />,
      onClick: () =>
        executeCommand(() =>
          editor.chain().focus().clearNodes().unsetAllMarks().run()
        ),
      tooltip: "Clear Formatting",
    },
    {
      icon: <Heading1 className="size-4" />,
      onClick: () =>
        executeCommand(() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        ),
      pressed: editor.isActive("heading", { level: 1 }),
      tooltip: "Heading 1",
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () =>
        executeCommand(() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        ),
      pressed: editor.isActive("heading", { level: 2 }),
      tooltip: "Heading 2",
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () =>
        executeCommand(() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        ),
      pressed: editor.isActive("heading", { level: 3 }),
      tooltip: "Heading 3",
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () =>
        executeCommand(() => editor.chain().focus().toggleBold().run()),
      pressed: editor.isActive("bold"),
      tooltip: "Bold",
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () =>
        executeCommand(() => editor.chain().focus().toggleItalic().run()),
      pressed: editor.isActive("italic"),
      tooltip: "Italic",
    },
    {
      icon: <Underline className="size-4" />,
      onClick: () =>
        executeCommand(() =>
          editor.chain().focus().toggleMark("underline").run()
        ),
      pressed: editor.isActive("underline"),
      tooltip: "Underline",
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () =>
        executeCommand(() => editor.chain().focus().toggleStrike().run()),
      pressed: editor.isActive("strike"),
      tooltip: "Strikethrough",
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () =>
        executeCommand(() => editor.chain().focus().setTextAlign("left").run()),
      pressed: editor.isActive({ textAlign: "left" }),
      tooltip: "Align Left",
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () =>
        executeCommand(() =>
          editor.chain().focus().setTextAlign("center").run()
        ),
      pressed: editor.isActive({ textAlign: "center" }),
      tooltip: "Align Center",
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () =>
        executeCommand(() =>
          editor.chain().focus().setTextAlign("right").run()
        ),
      pressed: editor.isActive({ textAlign: "right" }),
      tooltip: "Align Right",
    },
    {
      icon: <AlignJustify className="size-4" />,
      onClick: () =>
        executeCommand(() =>
          editor.chain().focus().setTextAlign("justify").run()
        ),
      pressed: editor.isActive({ textAlign: "justify" }),
      tooltip: "Justify",
    },
    {
      icon: <List className="size-4" />,
      onClick: () =>
        executeCommand(() => editor.chain().focus().toggleBulletList().run()),
      pressed: editor.isActive("bulletList"),
      tooltip: "Bullet List",
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () =>
        executeCommand(() => editor.chain().focus().toggleOrderedList().run()),
      pressed: editor.isActive("orderedList"),
      tooltip: "Ordered List",
    },
    {
      icon: <Quote className="size-4" />,
      onClick: () =>
        executeCommand(() => editor.chain().focus().toggleBlockquote().run()),
      pressed: editor.isActive("blockquote"),
      tooltip: "Blockquote",
    },
    {
      icon: <Code className="size-4" />,
      onClick: () =>
        executeCommand(() => editor.chain().focus().toggleCodeBlock().run()),
      pressed: editor.isActive("codeBlock"),
      tooltip: "Code Block",
    },
    {
      icon: <Minus className="size-4" />,
      onClick: () =>
        executeCommand(() => editor.chain().focus().setHorizontalRule().run()),
      tooltip: "Horizontal Rule",
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () =>
        executeCommand(() =>
          editor.chain().focus().toggleMark("highlight").run()
        ),
      pressed: editor.isActive("highlight"),
      tooltip: "Highlight",
    },
    {
      icon: <ImageIcon className="size-4" />,
      onClick: () => setImageDialogOpen(true),
      pressed: editor.isActive("image"),
      tooltip: "Upload Image",
    },
    {
      icon: <Link className="size-4" />,
      onClick: () => setLinkDialogOpen(true),
      pressed: editor.isActive("link"),
      tooltip: "Add Link",
    },
    {
      icon: <VideoIcon className="size-4" />,
      onClick: () => setVideoDialogOpen(true),
      pressed: editor.isActive("video"),
      tooltip: "Add Video",
    },
  ];

  return (
    <div className="sticky z-50 mb-1 flex items-center space-x-1 flex-wrap gap-y-1 rounded-md border bg-inherit p-1.5">
      {/* Regular Options */}
      {Options.map((option, i) => (
        <Toggle
          key={i}
          size="sm"
          className="bg-primary text-white"
          pressed={option.pressed}
          onPressedChange={option.onClick}
          aria-label={option.tooltip}
        >
          {option.icon}
        </Toggle>
      ))}

      {/* Table Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Table className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setTableDialogOpen(true)}>
            <TableProperties className="size-4 mr-2" />
            Insert Table
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              executeCommand(() =>
                editor.chain().focus().addColumnBefore().run()
              )
            }
            disabled={!editor.isActive("table")}
          >
            Add Column Before
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              executeCommand(() =>
                editor.chain().focus().addColumnAfter().run()
              )
            }
            disabled={!editor.isActive("table")}
          >
            Add Column After
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              executeCommand(() => editor.chain().focus().deleteColumn().run())
            }
            disabled={!editor.isActive("table")}
          >
            Delete Column
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              executeCommand(() => editor.chain().focus().addRowBefore().run())
            }
            disabled={!editor.isActive("table")}
          >
            Add Row Before
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              executeCommand(() => editor.chain().focus().addRowAfter().run())
            }
            disabled={!editor.isActive("table")}
          >
            Add Row After
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              executeCommand(() => editor.chain().focus().deleteRow().run())
            }
            disabled={!editor.isActive("table")}
          >
            Delete Row
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              executeCommand(() => editor.chain().focus().deleteTable().run())
            }
            disabled={!editor.isActive("table")}
          >
            Delete Table
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Table Insert Dialog */}
      <Dialog open={tableDialogOpen} onOpenChange={setTableDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Table</DialogTitle>
          </DialogHeader>
          <div className="grid w-full max-w-sm items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tableRows">Rows</Label>
              <Input
                id="tableRows"
                type="number"
                min="1"
                max="20"
                value={tableRows}
                onChange={(e) => setTableRows(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tableCols">Columns</Label>
              <Input
                id="tableCols"
                type="number"
                min="1"
                max="20"
                value={tableCols}
                onChange={(e) => setTableCols(Number(e.target.value))}
              />
            </div>
            <Button onClick={insertTable}>Insert Table</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Upload Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
          </DialogHeader>
          <div className="grid w-full max-w-sm items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                placeholder="Enter image URL"
                value={typeof imageUrl === "string" ? imageUrl : ""}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="imageFile">Upload from PC</Label>
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageUrl(file);
                  }
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Preview</Label>
              {imageUrl && (
                <img
                  src={
                    typeof imageUrl === "string"
                      ? imageUrl
                      : imageUrl instanceof File
                        ? URL.createObjectURL(imageUrl)
                        : ""
                  }
                  alt="Preview"
                  className="h-auto max-w-full rounded border"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-image.svg";
                    e.currentTarget.alt = "Invalid image URL";
                  }}
                />
              )}
            </div>
            <Button onClick={addImage} disabled={isImageUploading || !imageUrl}>
              {isImageUploading ? "Uploading..." : "Insert Image"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="linkUrl">URL</Label>
              <Input
                id="linkUrl"
                placeholder="Enter URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <Button onClick={addLink} disabled={!linkUrl}>
                Add Link
              </Button>
              {editor.isActive("link") && (
                <Button variant="destructive" onClick={removeLink}>
                  Remove Link
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* YouTube Video Dialog */}
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Video</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="videoUrl">URL</Label>
              <Input
                id="videoUrl"
                placeholder="Enter URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="videoWidth">Width</Label>
              <Input
                id="videoWidth"
                type="number"
                min="100"
                max="1920"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="videoHeight">Height</Label>
              <Input
                id="videoHeight"
                type="number"
                min="100"
                max="1080"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </div>
            <div className="flex justify-between">
              <Button onClick={addYoutubeVideo} disabled={!videoUrl}>
                Add Video
              </Button>
              {editor.isActive("video") && (
                <Button variant="destructive" onClick={removeYoutubeVideo}>
                  Remove Video
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
