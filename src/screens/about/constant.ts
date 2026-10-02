import type { FileNode } from "@/types/about";

// Drives the Typography scale card, one row per size class, shown in both the title and subtitle typeface.
export const TYPE_SCALE = [
  { className: "text-display", label: "text-display", sample: "Display" },
  { className: "text-h1", label: "text-h1", sample: "Heading 1" },
  { className: "text-h2", label: "text-h2", sample: "Heading 2" },
  { className: "text-h3", label: "text-h3", sample: "Heading 3" },
  { className: "text-body-lg", label: "text-body-lg", sample: "Body large" },
  { className: "text-body", label: "text-body", sample: "Body" },
  { className: "text-caption", label: "text-caption", sample: "Caption" },
  { className: "text-micro", label: "text-micro", sample: "Micro" },
];

// Drives the Spacing scale card's padding/gap demos.
export const SPACING_SCALE = ["xs", "sm", "md", "lg", "xl"] as const;

// One level of src/ on purpose: a full file-by-file mirror drifts the moment a file is added, the folders are what the conventions are about.
export const FILE_STRUCTURE: FileNode[] = [
  {
    name: "src/",
    type: "folder",
    description: "Application source root",
    children: [
      {
        name: "components/",
        type: "folder",
        description:
          "Shared Custom* components, ui/ is presentational, shell/ is the app frame, re-exported through index.ts",
      },
      {
        name: "config/",
        type: "folder",
        description:
          "The one axios instance and every API endpoint path, nothing calls a raw URL string",
      },
      {
        name: "constants/",
        type: "folder",
        description:
          "App-wide reference lists and the MOCK_ data, delete every MOCK_ export when the API exists",
      },
      {
        name: "hooks/",
        type: "folder",
        description:
          "Generic hooks (useApi, useToggle, useShellTitle), data hooks live in services/",
      },
      {
        name: "lib/",
        type: "folder",
        description:
          "Pure functions only: nothing here imports constants, assets or React state",
      },
      {
        name: "routes/",
        type: "folder",
        description:
          "routes.config.ts is the one ROUTES registry, ShellLayout mounts the app frame once",
      },
      {
        name: "screens/",
        type: "folder",
        description:
          "One folder per route-level page, each owns its screen, its components/ and its constant.ts",
      },
      {
        name: "services/",
        type: "folder",
        description:
          "The data layer: queries/ and mutations/, one file per domain, the only place screens get data from",
      },
      {
        name: "types/",
        type: "folder",
        description: "One file per domain, plus global.ts for app-wide types",
      },
      {
        name: "validations/",
        type: "folder",
        description:
          "One zod schema file per domain, a schema never lives inline in a screen",
      },
      {
        name: "zustand/",
        type: "folder",
        description:
          "Global client state, one slice per domain, combined into a single store",
      },
      {
        name: "index.css",
        type: "file",
        description:
          "Design tokens, the type and spacing scales, and the title/subtitle typeface classes",
      },
      {
        name: "main.tsx",
        type: "file",
        description: "Entry point, mounts React into the DOM",
      },
    ],
  },
];

export const STACK_ITEMS = [
  { label: "React", description: "UI library" },
  { label: "Vite", description: "Build tool" },
  { label: "TypeScript", description: "Type safety" },
  { label: "Tailwind v4", description: "Styling" },
  { label: "Poppins + Inter", description: "title / subtitle typefaces" },
  { label: "React Router v7", description: "Routing" },
  { label: "Zustand", description: "Global client state" },
  { label: "SWR + Axios", description: "Data fetching and caching" },
  { label: "React Hook Form + Zod", description: "Forms and validation" },
  { label: "Sonner", description: "Toasts" },
];

export const CONVENTIONS = [
  { label: "Screen naming", example: "AboutScreen.tsx, NotFoundScreen.tsx" },
  {
    label: "Component exports",
    example: 'import { CustomButton } from "@/components"',
  },
  {
    label: "Route registration",
    example: "Add to ROUTES[] in routes/routes.config.ts only",
  },
  {
    label: "Screen-local components",
    example: "screens/<domain>/components/, never imported globally",
  },
  {
    label: "One schema, one place",
    example: "validations/<domain>.ts, never an inline zod schema in a screen",
  },
  {
    label: "A screen orchestrates, it doesn't implement",
    example:
      "Second dialog or column-builder? Split into components/ next to it.",
  },
  {
    label: "A failure is never silent",
    example:
      "useApiMutation always toasts unless the caller passes its own onError",
  },
  {
    label: "Data comes from services/",
    example:
      "A screen calls a hook from services/queries or mutations, never a MOCK_ constant or useStore",
  },
  {
    label: "One source for brand colors",
    example:
      "lib/tones.ts holds pink, teal and yellow once, cards and chips read from it",
  },
  {
    label: "Comments",
    example: "One short, human line above every function, see CLAUDE.md",
  },
  {
    label: "Responsive text and spacing",
    example:
      "text-display, text-h1... / p-md, px-lg, gap-sm..., defined once in index.css",
  },
  {
    label: "One shared ladder, every spacing property",
    example: '"md" is the same physical size in p-md, gap-md, and mt-md alike',
  },
  {
    label: "Typeface is a separate class from size",
    example:
      '"text-h1 title" or "text-h1 subtitle", never baked into the size class',
  },
];
