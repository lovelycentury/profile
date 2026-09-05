import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const appRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Emits .next/standalone — a self-contained server with its own node_modules.
  output: "standalone",
  // @okkly/* ship ESM that Next needs to compile.
  transpilePackages: ["@okkly/react", "@okkly/design-system"],
  sassOptions: {
    implementation: "sass-embedded",
    // Modern Sass API reads `loadPaths`. Both roots let `@use "styles/mixins"`
    // and `@use "@okkly/design-system/styles/..."` resolve from any
    // *.module.scss however deeply it is nested.
    loadPaths: [path.join(appRoot, "src"), path.join(appRoot, "node_modules")],
  },
};

export default withNextIntl(nextConfig);
