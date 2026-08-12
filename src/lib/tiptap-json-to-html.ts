/**
 * Server-safe TipTap/ProseMirror JSON to HTML converter.
 * Renders description in initial HTML so crawlers see full word count (SEO).
 */

type TipTapNode = {
  type: string;
  content?: TipTapNode[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
  attrs?: Record<string, unknown>;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderMarks(
  text: string,
  marks?: { type: string; attrs?: Record<string, unknown> }[]
): string {
  if (!marks?.length) return escapeHtml(text);
  let out = escapeHtml(text);
  for (const mark of marks) {
    switch (mark.type) {
      case "bold":
        out = `<strong>${out}</strong>`;
        break;
      case "italic":
        out = `<em>${out}</em>`;
        break;
      case "underline":
        out = `<u>${out}</u>`;
        break;
      case "strike":
        out = `<s>${out}</s>`;
        break;
      case "code":
        out = `<code class="rounded bg-muted px-1 py-0.5 text-sm">${out}</code>`;
        break;
      case "link": {
        const href = (mark.attrs?.href as string) ?? "#";
        out = `<a href="${escapeHtml(href)}" class="text-primary underline">${out}</a>`;
        break;
      }
      default:
        break;
    }
  }
  return out;
}

function nodeToHtml(node: TipTapNode): string {
  switch (node.type) {
    case "doc":
      return (node.content ?? []).map(nodeToHtml).join("");
    case "paragraph": {
      const inner = (node.content ?? []).map(nodeToHtml).join("");
      const align = node.attrs?.textAlign as string | undefined;
      const style = align ? ` style="text-align: ${align}"` : "";
      if (!inner || inner.trim() === "" || inner.trim() === "<br>") {
        return "";
      }
      return `<p class="mb-3.5 leading-relaxed text-stone-700 text-base sm:text-lg font-sans"${style}>${inner}</p>`;
    }
    case "heading": {
      const level = Math.min(6, Math.max(1, (node.attrs?.level as number) ?? 1));
      const inner = (node.content ?? []).map(nodeToHtml).join("");
      const hClass =
        level === 1
          ? "text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] mt-6 mb-3 pb-2 border-b border-[#E8E2D9]"
          : level === 2
            ? "text-xl sm:text-2xl font-serif font-semibold text-[#1C1917] mt-6 mb-3 tracking-tight"
            : level === 3
              ? "text-lg sm:text-xl font-serif font-semibold text-[#0555A2] mt-5 mb-2"
              : "font-serif font-semibold text-[#1C1917] mt-4 mb-2";
      return `<h${level} class="${hClass}">${inner}</h${level}>`;
    }
    case "text":
      return renderMarks(node.text ?? "", node.marks);
    case "bulletList":
      return `<ul class="list-disc ml-6 my-4 space-y-2 text-stone-700 text-base font-sans">${(node.content ?? []).map((n) => nodeToHtml(n)).join("")}</ul>`;
    case "orderedList":
      return `<ol class="list-decimal ml-6 my-4 space-y-2 text-stone-700 text-base font-sans">${(node.content ?? []).map((n) => nodeToHtml(n)).join("")}</ol>`;
    case "listItem":
      return `<li class="leading-relaxed">${(node.content ?? []).map((n) => nodeToHtml(n)).join("")}</li>`;
    case "blockquote":
      return `<blockquote class="border-l-4 border-[#0555A2] bg-[#FAF8F5] p-5 sm:p-6 my-6 rounded-r-2xl font-serif text-lg text-[#1C1917] italic shadow-xs">${(node.content ?? []).map((n) => nodeToHtml(n)).join("")}</blockquote>`;
    case "codeBlock": {
      const inner = (node.content ?? []).map(nodeToHtml).join("");
      return `<pre class="bg-stone-900 text-stone-100 rounded-2xl p-5 overflow-x-auto text-sm my-6 font-mono shadow-inner"><code>${inner}</code></pre>`;
    }
    case "hardBreak":
      return "<br>";
    case "horizontalRule":
      return '<hr class="my-8 border-[#E8E2D9]">';
    case "image": {
      const src = (node.attrs?.src as string) ?? "";
      const alt = (node.attrs?.alt as string) ?? "";
      return src
        ? `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" class="rounded-3xl border border-[#E8E2D9] shadow-sm max-h-[480px] w-full object-cover my-6" loading="lazy" />`
        : "";
    }
    default:
      return (node.content ?? []).map(nodeToHtml).join("");
  }
}

/**
 * Converts TipTap/ProseMirror JSON string to HTML.
 * Safe to run on the server (no TipTap/React).
 */
export function tiptapJsonToHtml(json: string | null | undefined): string {
  if (!json || typeof json !== "string") return "";
  try {
    const doc = JSON.parse(json) as TipTapNode;
    if (doc?.type !== "doc") return "";
    return nodeToHtml(doc);
  } catch {
    return "";
  }
}
