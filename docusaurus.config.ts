import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Open Projects Hub",
  tagline:
    "Empowering Freelancers with AI-Assisted Project Management and Structured Delivery.",
  favicon: "img/favicon.svg",

  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here.
  // For GitHub Pages, it is usually 'https://<organizationName>.github.io'.
  url: "https://alonsovndev.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served.
  // For GitHub Pages deployment, it is often '/<projectName>/'.
  baseUrl: "/",

  // GitHub Pages deployment config.
  organizationName: "alonsovndev",
  projectName: "open-projects-hub-docs",

  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
    // All existing docs are plain .md (no .mdx files) and were written as
    // CommonMark, not MDX/JSX — "detect" parses .md as CommonMark so literal
    // `<` characters (e.g. "<1KB") in existing content don't break as JSX.
    format: "detect",
  },

  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Point this to your repository to enable the "Edit this page" links.
          editUrl:
            "https://github.com/alonsovndev/open-projects-hub-docs/edit/main/",
          // Keep numeric folder prefixes (00-context, 04-decisions, ...) in
          // routes. Existing docs' relative links (e.g. "../04-decisions/")
          // were written against the literal folder names, matching GitHub's
          // browsing paths — Docusaurus's default prefix-stripping would break
          // every one of those links.
          numberPrefixParser: false,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    // Diagrams must stay legible in both color modes, since colorMode follows
    // the reader's OS preference.
    mermaid: {
      theme: { light: "neutral", dark: "dark" },
    },
    navbar: {
      title: "Open Projects Hub",
      logo: {
        alt: "Open Projects Hub Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://github.com/alonsovndev/open-projects-hub-docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "/docs/intro",
            },
            {
              label: "Getting Started",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/alonsovndev/open-projects-hub-docs",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Alonsovndev. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
