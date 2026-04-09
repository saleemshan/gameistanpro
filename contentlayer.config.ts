import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer2/source-files";
import rehypeSlug from "rehype-slug";

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
    rehypePlugins: [rehypeSlug],
  },
});
