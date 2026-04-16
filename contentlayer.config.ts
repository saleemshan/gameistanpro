import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer2/source-files";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { remarkStripEmbeddedFaq } from "./lib/remark-strip-embedded-faq";
import { remarkStripEmbeddedProsCons } from "./lib/remark-strip-embedded-pros-cons";
import { remarkStripGuideBoilerplate } from "./lib/remark-strip-guide-boilerplate";
import { remarkStripManualToc } from "./lib/remark-strip-manual-toc";

const FaqNested = defineNestedType(() => ({
  name: "FaqItem",
  fields: {
    question: { type: "string", required: true },
    answer: { type: "string", required: true },
  },
}));

const InstallStepNested = defineNestedType(() => ({
  name: "InstallStepItem",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
  },
}));

/** Short player-style notes shown on game pages (optional per MDX). */
const PlayerReviewNested = defineNestedType(() => ({
  name: "PlayerReviewItem",
  fields: {
    name: { type: "string", required: true },
    place: { type: "string", required: false },
    rating: { type: "number", required: true },
    text: { type: "string", required: true },
  },
}));

const ProsConNested = defineNestedType(() => ({
  name: "ProsConItem",
  fields: {
    pro: { type: "string", required: true },
    con: { type: "string", required: true },
  },
}));

const SystemRequirementNested = defineNestedType(() => ({
  name: "SystemRequirementItem",
  fields: {
    label: { type: "string", required: true },
    value: { type: "string", required: true },
  },
}));

const VersionHistoryNested = defineNestedType(() => ({
  name: "VersionHistoryItem",
  fields: {
    version: { type: "string", required: true },
    released: { type: "string", required: true },
    size: { type: "string", required: false },
    notes: { type: "string", required: false },
  },
}));

export const App = defineDocumentType(() => ({
  name: "App",
  filePathPattern: "apps/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    shortDescription: { type: "string", required: true },
    description: { type: "string", required: true },
    version: { type: "string", required: true },
    size: { type: "string", required: true },
    requirements: { type: "string", required: true },
    downloads: { type: "string", required: true },
    rating: { type: "number", required: true },
    votes: { type: "number", required: true },
    category: {
      type: "enum",
      options: ["tools", "injectors", "utilities", "apps"],
      required: true,
    },
    tags: { type: "list", of: { type: "string" }, default: [] },
    coverImage: { type: "string", required: true },
    screenshots: { type: "list", of: { type: "string" }, default: [] },
    downloadLinks: { type: "list", of: { type: "string" }, default: [] },
    isNew: { type: "boolean", default: false },
    featured: { type: "boolean", default: false },
    publishedAt: { type: "date", required: true },
    updatedAt: { type: "date", required: true },
    views: { type: "number", default: 0 },
    faqs: { type: "list", of: FaqNested, default: [] },
    installSteps: { type: "list", of: InstallStepNested, default: [] },
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/apps/${doc.slug}` },
  },
}));

export const Game = defineDocumentType(() => ({
  name: "Game",
  filePathPattern: "games/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    shortDescription: { type: "string", required: true },
    description: { type: "string", required: true },
    version: { type: "string", required: true },
    size: { type: "string", required: true },
    requirements: { type: "string", required: true },
    downloads: { type: "string", required: true },
    rating: { type: "number", required: true },
    votes: { type: "number", required: true },
    category: {
      type: "enum",
      options: [
        "casino-games",
        "color-prediction",
        "sports-betting",
        "card-games",
      ],
      required: true,
    },
    tags: { type: "list", of: { type: "string" }, default: [] },
    coverImage: { type: "string", required: true },
    screenshots: { type: "list", of: { type: "string" }, default: [] },
    downloadLinks: { type: "list", of: { type: "string" }, default: [] },
    isNew: { type: "boolean", default: false },
    featured: { type: "boolean", default: false },
    publishedAt: { type: "date", required: true },
    updatedAt: { type: "date", required: true },
    views: { type: "number", default: 0 },
    faqs: { type: "list", of: FaqNested, default: [] },
    installSteps: { type: "list", of: InstallStepNested, default: [] },
    playerReviews: { type: "list", of: PlayerReviewNested, default: [] },
    /** Optional; when empty, UI fills EarningGames-style rows from slug + dates. */
    prosAndCons: { type: "list", of: ProsConNested, default: [] },
    systemRequirementRows: {
      type: "list",
      of: SystemRequirementNested,
      default: [],
    },
    versionHistory: { type: "list", of: VersionHistoryNested, default: [] },
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/${doc.slug}` },
  },
}));

export const Guide = defineDocumentType(() => ({
  name: "Guide",
  filePathPattern: "guides/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    excerpt: { type: "string", required: true },
    description: { type: "string", required: true },
    category: {
      type: "enum",
      options: ["general", "how-to", "reviews", "news"],
      required: true,
    },
    author: { type: "string", required: true },
    publishedAt: { type: "date", required: true },
    updatedAt: { type: "date", required: true },
    coverImage: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
    featured: { type: "boolean", default: false },
    faqs: { type: "list", of: FaqNested, default: [] },
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/guides/${doc.slug}` },
    readingTime: {
      type: "number",
      resolve: (doc) =>
        Math.max(
          1,
          Math.round((doc.body.raw as string).split(/\s+/).filter(Boolean).length / 200),
        ),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [App, Game, Guide],
  disableImportAliasWarning: true,
  mdx: {
    // GFM pipe tables (Pros | Cons), strikethrough, autolinks, etc.
    remarkPlugins: [
      remarkGfm,
      remarkStripManualToc,
      remarkStripEmbeddedProsCons,
      remarkStripEmbeddedFaq,
      remarkStripGuideBoilerplate,
    ],
    rehypePlugins: [rehypeSlug],
  },
});
