export type FileNode = {
  name: string;
  type: "file" | "folder";
  description: string;
  children?: FileNode[];
};

// Drives the Typography scale card, one row per size class, shown in both the title and subtitle typeface.
export const TYPE_SCALE = [
  { className: "text-display", label: "text-display", sample: "Display" },
  { className: "text-h1", label: "text-h1", sample: "Heading 1" },
  { className: "text-h2", label: "text-h2", sample: "Heading 2" },
  { className: "text-h3", label: "text-h3", sample: "Heading 3" },
  { className: "text-body-lg", label: "text-body-lg", sample: "Body large" },
  { className: "text-body", label: "text-body", sample: "Body" },
  { className: "text-caption", label: "text-caption", sample: "Caption" },
];

// Drives the Spacing scale card's padding/gap demos.
export const SPACING_SCALE = ["xs", "sm", "md", "lg", "xl"] as const;

export const FILE_STRUCTURE: FileNode[] = [
  {
    name: "src/",
    type: "folder",
    description: "Application source root",
    children: [
      {
        name: "main.tsx",
        type: "file",
        description: "Entry point, mounts React into the DOM",
      },
      {
        name: "index.css",
        type: "file",
        description: "Design tokens, the text-h1 typography scale, the p-md/gap-lg spacing scale, and the title/subtitle typeface classes",
      },
      {
        name: "components/",
        type: "folder",
        description: "Shared, reusable UI components across the entire app",
        children: [
          {
            name: "index.ts",
            type: "file",
            description: "Barrel export, import all components from one place",
          },
          {
            name: "ErrorBoundary.tsx",
            type: "file",
            description: "Mounted once in main.tsx, catches a failed lazy chunk and shows a reload prompt instead of a blank screen",
          },
          {
            name: "ui/",
            type: "folder",
            description: "Primitive UI components, buttons, inputs, badges",
            children: [
              {
                name: "CustomButton.tsx",
                type: "file",
                description: "Themed button with variant and size props",
              },
            ],
          },
        ],
      },
      {
        name: "config/",
        type: "folder",
        description: "The one axios instance and every API endpoint path, nothing calls a raw URL string",
        children: [
          { name: "axios-instance.ts", type: "file", description: "Shared axios client, base URL comes from VITE_API_URL (see .env.example)" },
          { name: "api.ts", type: "file", description: "Endpoint path constants, grouped by domain, empty until the first domain is added" },
        ],
      },
      {
        name: "hooks/",
        type: "folder",
        description: "Hooks shared by more than one screen",
        children: [
          { name: "useApi.ts", type: "file", description: "useApiQuery (SWR-cached GET) + useApiMutation (POST/PUT/DELETE, never rejects) that every services/ hook wraps" },
        ],
      },
      {
        name: "validations/",
        type: "folder",
        description: "One zod schema file per domain, added as each domain is built, a schema never lives inline in a screen",
      },
      {
        name: "services/",
        type: "folder",
        description: "The data layer, one file per domain in each of queries/ and mutations/, added as each domain is built",
      },
      {
        name: "zustand/",
        type: "folder",
        description: "Global client state, one slice per domain, combined into a single store",
        children: [
          { name: "store/store.ts", type: "file", description: "Combines every slice into the one useStore() hook, empty until the first slice is added" },
        ],
      },
      {
        name: "routes/",
        type: "folder",
        description:
          "Centralized route declarations and lazy-loaded screen map",
        children: [
          {
            name: "routes.config.ts",
            type: "file",
            description: "The ROUTES array, add a screen here, nowhere else",
          },
          {
            name: "index.tsx",
            type: "file",
            description: "AppRoutes component, renders ROUTES with Suspense, kept component-only for fast refresh",
          },
        ],
      },
      {
        name: "screens/",
        type: "folder",
        description:
          "Feature screens, each folder owns its screen, constants, and local components",
        children: [
          {
            name: "about/",
            type: "folder",
            description: "About screen feature slice",
            children: [
              {
                name: "AboutScreen.tsx",
                type: "file",
                description: "Root component for the /about route",
              },
              {
                name: "constant.ts",
                type: "file",
                description: "Screen-scoped mock data and static constants",
              },
              {
                name: "components/",
                type: "folder",
                description:
                  "Components used only inside this screen, not shared globally",
                children: [
                  {
                    name: "FileTree.tsx",
                    type: "file",
                    description: "Recursive file structure visualizer",
                  },
                ],
              },
            ],
          },
          {
            name: "system/",
            type: "folder",
            description: "System-level screens, 404, 500, maintenance",
            children: [
              {
                name: "NotFoundScreen.tsx",
                type: "file",
                description: "Rendered on unmatched routes via the * catch-all",
              },
            ],
          },
        ],
      },
      {
        name: "types/",
        type: "folder",
        description: "One file per domain, added as each domain is built, plus global.ts for truly app-wide types",
        children: [
          {
            name: "global.ts",
            type: "file",
            description: "App-wide type definitions shared across features",
          },
        ],
      },
      {
        name: "lib/",
        type: "folder",
        description: "Pure utility functions only, formatting, parsing, calculations",
        children: [
          { name: "cn.ts", type: "file", description: "Merges conditional class names, resolving Tailwind conflicts" },
          { name: "extractErrorMessage.ts", type: "file", description: "Pulls a readable message out of a failed API call" },
        ],
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
    example: "Second dialog or column-builder? Split into components/ next to it.",
  },
  {
    label: "A failure is never silent",
    example: "useApiMutation always toasts unless the caller passes its own onError",
  },
  {
    label: "Comments",
    example: "One short, human line above every function, see CLAUDE.md",
  },
  {
    label: "Responsive text and spacing",
    example: "text-display, text-h1... / p-md, px-lg, gap-sm..., defined once in index.css",
  },
  {
    label: "One shared ladder, every spacing property",
    example: '"md" is the same physical size in p-md, gap-md, and mt-md alike',
  },
  {
    label: "Typeface is a separate class from size",
    example: '"text-h1 title" or "text-h1 subtitle", never baked into the size class',
  },
];
