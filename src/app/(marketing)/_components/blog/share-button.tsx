"use client";

import { Share2, LinkIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  RiFacebookFill,
  RiLinkedinBoxFill,
  RiMessengerFill,
  RiTwitterXFill,
  RiWhatsappFill,
} from "@remixicon/react";

const socialMediaLinks = (url: string, title: string) => [
  {
    name: "Facebook",
    icon: <RiFacebookFill className="w-5 h-5 mr-2" />,
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "LinkedIn",
    icon: <RiLinkedinBoxFill className="w-5 h-5 mr-2" />,
    href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    name: "WhatsApp",
    icon: <RiWhatsappFill className="w-5 h-5 mr-2" />,
    href: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  },
  {
    name: "Messenger",
    icon: <RiMessengerFill className="w-5 h-5 mr-2" />,
    href: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&redirect_uri=${encodeURIComponent(url)}`,
  },
  {
    name: "X",
    icon: <RiTwitterXFill className="w-5 h-5 mr-2" />,
    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
];

const ShareDialog = ({ title, url }: { title: string; url: string }) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-center">Share</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4 py-4">
        {socialMediaLinks(url, title).map((link) => (
          <Button
            key={link.name}
            variant="outline"
            className="w-full justify-between"
            asChild
          >
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <div className="flex items-center">
                {link.icon}
                {link.name}
              </div>
              <ExternalLinkIcon className="h-4 w-4 text-neutral-500" />
            </a>
          </Button>
        ))}
      </div>
    </DialogContent>
  );
};

export default function ShareButtons({
  fullWidth = false,
}: {
  fullWidth?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : "https://example.com";
  const title = typeof document !== "undefined" ? document.title : "Share";

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op
    }
  }

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url,
        });
      } catch {}
    } else {
      copy();
    }
  }

  return (
    <div className={`flex items-center gap-2 ${fullWidth ? "w-full" : ""}`}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className={`border-neutral-200 ${fullWidth ? "flex-1" : ""}`}
            aria-label="Share"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </DialogTrigger>
        <ShareDialog title={title} url={url} />
      </Dialog>
      <Button
        size="sm"
        variant="outline"
        className={`border-neutral-200 ${fullWidth ? "flex-1" : ""}`}
        onClick={copy}
        aria-label="Copy link"
      >
        <LinkIcon className="mr-2 h-4 w-4" />
        {copied ? "Copied" : "Copy link"}
      </Button>
    </div>
  );
}
