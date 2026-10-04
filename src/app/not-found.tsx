import { redirect } from "next/navigation";

// Rendered for requests that never reach a locale segment (unknown top-level paths)
// or carry an unsupported locale — send them to the root, where the proxy picks a locale.
export default function GlobalNotFound() {
  redirect("/");
}
