import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

export function renderMarkdown(body: string): string {
  return marked.parse(body) as string;
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[m - 1]} ${d}, ${y}`;
}
