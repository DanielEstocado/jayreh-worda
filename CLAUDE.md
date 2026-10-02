# jayreh-web-app-template: Conventions

React 19 + Vite + TypeScript + Tailwind v4 web app template. `config/`, `hooks/useApi.ts`,
`lib/`, `validations/`, `services/queries/` + `services/mutations/`, and `zustand/` are already
scaffolded and ready, they're just empty of any real domain until the first screen needs one.
Add a domain by adding one file to each of the folders it needs, following the per-domain split
described below, don't invent a different shape.

## Folder layout

- `routes/routes.config.ts`: the single lazy-loaded `ROUTES` registry. Adding a screen means
  adding one entry here. `routes/index.tsx` only renders it through one `<Routes>`/`<Suspense>`
  loop, it stays a pure component so Vite's fast-refresh plugin doesn't complain, the registry
  data and the component that consumes it are deliberately kept in separate files.
- `config/`: the one axios instance (`axios-instance.ts`, base URL + interceptors) and the one
  file of API endpoint path constants (`api.ts`, grouped by domain, e.g. `Api.ORDERS.INDEX`).
  Nothing calls a raw URL string directly.
- `hooks/useApi.ts`: `useApiQuery` (SWR-cached GET) and `useApiMutation` (POST/PUT/DELETE).
  Every `services/` hook wraps one of these two, a screen never hand-rolls its own
  `fetch`/`try-catch`. `useApiMutation`'s `trigger` never rejects: it toasts on failure (or calls the
  caller's `onError`) and resolves `undefined`. `useApiQuery` never toasts, the screen must render
  its `error`. The base URL comes from `VITE_API_URL` (copy `.env.example` to `.env`), requests
  fail loudly if it is unset.
- `validations/`: one file per domain (`order.ts`, `user.ts`, `comment.ts`...), each holding that
  domain's zod schemas. A schema never lives inline in a screen or component, forms and the
  matching mutation both import the same schema from here.
- `services/queries/` and `services/mutations/`, one file per domain, each exporting a hook
  built on `useApi.ts`.
- `zustand/slices/` + `zustand/store/store.ts`, one slice per domain of global client state,
  combined into the single store (`store.ts` starts empty, add a slice the moment one is needed).
  Reach for a slice only when state genuinely needs to survive across screens or be read by
  unrelated components, not as a default over local `useState`.
- `screens/<domain>/`: route-level pages. Follow the pattern already in `screens/about/`:
  ```
  screens/<domain>/
    <Screen>.tsx: the page itself: data hooks + layout, stays an orchestrator
    components/: that screen's own sub-components (forms, dialogs, widgets)
    constant.ts: that screen's own local constants/static data, if it needs any
  ```
  **A screen file orchestrates, it does not implement.** The moment a screen needs a second
  dialog, a table-column builder, or any non-trivial static data, pull it into `components/` or
  `constant.ts` next to it instead of letting the one file keep growing. A screen file past
  ~150-200 lines is already doing more than one job.
- `components/`: reusable components shared by *more than one* screen, re-exported through
  `components/index.ts` (named exports). Prefix shared components `Custom*` (`CustomButton`,
  `CustomTextarea`...), so it's obvious at the import site whether something is a shared
  primitive or a screen-local one-off. `components/ui/` is purely presentational, no
  business logic or data-fetching in there. `ErrorBoundary.tsx` is the one exception, it's
  mounted once in `main.tsx` around `<AppRoutes />`, not imported by screens, so it's not in the
  barrel, it catches a lazy route's chunk failing to load (a stale dev server, or an old tab open
  across a redeploy) and shows a reload prompt instead of a blank screen.
- `lib/`: pure utility functions only (`cn.ts`, `extractErrorMessage.ts`, formatting, parsing,
  calculations). This name, not `utils/`, one name for one concept.
- `types/`: one file per domain (`types/order.ts`...), same split as `validations/`. `global.ts`
  is only for types genuinely shared app-wide. Don't let `global.ts` become the dumping ground,
  once a type is domain-specific, give it its own file.
- `constants/`: one file per *app-wide* domain concept (permission strings, enums, limits), if
  the project needs any. Screen-local constants stay in that screen's own `constant.ts`.

## Typography and spacing

`index.css` defines a fixed type scale and spacing scale as real CSS classes (`@layer
components`, each with its own breakpoint built in), modeled on kabsu.me's responsive hero
(`text-5xl -> lg:text-7xl` headline, `text-base -> lg:text-xl` body):

- `text-display` / `text-h1` / `text-h2` / `text-h3` / `text-body-lg` / `text-body` /
  `text-caption`: each one already resizes itself at the `lg` breakpoint (1024px). Use these
  instead of ad hoc `text-5xl lg:text-7xl` on individual elements, a screen should never need to
  write its own responsive font-size pair.
- `p-xs` / `p-sm` / `p-md` / `p-lg` / `p-xl` (and the same five sizes for `px-`, `py-`, `pt-`,
  `pb-`, `m-`, `mx-`, `my-`, `mt-`, `mb-`, `gap-`), one shared ladder of sizes reused across every
  spacing property, so "md" is the same physical size whether it's a card's padding, a page gutter
  (`px-lg`), the vertical rhythm of a hero section (`py-xl`), or the gap in a button row
  (`gap-md`). Each size is a CSS variable (`--space-xs`...`--space-xl`, defined once near the
  color tokens) that gets redefined at the `lg` breakpoint, so every one of these classes is
  responsive for free, nothing repeats its own media query. Use these instead of a flat `p-6` or
  a `px-4 sm:px-6 lg:px-10` pair written per component.

  A gap or margin used exactly once, in its own one-off context (the icon-to-text gap inside a
  single badge, the space after one specific headline) doesn't need to be forced onto this scale,
  plain Tailwind (`gap-2`, `mt-1`) is fine there. This scale is for the handful of spacing values
  that recur across many components, the same bar `text-h1` had to clear.

Adding a new role (e.g. a stat number, a pull quote) means adding one more class to this same
block in `index.css`, not a one-off `text-3xl sm:text-4xl` written inline somewhere.

Typeface is a separate class from size, on purpose, so the two compose freely:

- `title`: Poppins (via `@fontsource/poppins`), the brand's display face. Bold and geometric,
  good for a short headline, bad for a paragraph.
- `subtitle`: Inter (via `@fontsource-variable/inter`), the readable default for everything
  else. It's also what the page already inherits without any class, write it explicitly anyway
  on real body/subtitle text so the choice is visible at the call site, not implicit.

Both fonts are self-hosted, imported once in `main.tsx`. Poppins only ships specific static
weights (not a variable font), the template pulls in 400/500/600/700 since that covers every
`font-weight` the current type scale and components use, add another weight import there only if
a new size/weight combination actually needs it.

`className="text-h1 title"` and `className="text-h1 subtitle"` are both valid, same size,
different typeface. Never bake a font-family into one of the `text-*` size classes, that's
exactly what would stop them composing like this.

## Screens and navigation flow

The route table lives in `routes/routes.config.ts`. Current flow:

- `/` redirects (`<Navigate replace>`) straight to `/home`, there's no real content at the bare
  root, don't add any.
- `/home` (`screens/home/HomeScreen.tsx`), the landing page. A centered hero (headline, pitch,
  two CTAs) plus a single "Color tokens" card previewing the theme's brand/state colors. Its
  "About this template" button is the one way into `/about`. Keep this screen a pitch, not a
  style guide, if a new design-system card needs demonstrating, it belongs on About, not here.
- `/about` (`screens/about/AboutScreen.tsx`), the template's own documentation, rendered from
  `constant.ts` so it stays data-driven instead of hardcoded JSX: `STACK_ITEMS` (the dependency
  list), `CONVENTIONS` (the house-rules summary), `FILE_STRUCTURE` (walked recursively by
  `components/FileTree.tsx`), `TYPE_SCALE` and `SPACING_SCALE` (live previews of the typography
  and spacing scales described above). Its "Go Back" button returns to `/home`. When a new
  design-system primitive is added to `index.css`, add its live demo here, following the
  `TYPE_SCALE`/`SPACING_SCALE` pattern, so this page never drifts out of sync with what actually
  exists.
- `*` (`screens/system/NotFoundScreen.tsx`), the catch-all for any unmatched path.
- `ErrorBoundary` (`components/ErrorBoundary.tsx`) wraps every route in `main.tsx`, not a route
  itself. Catches a lazy screen's chunk failing to load and shows a reload prompt instead of a
  blank screen, see the `components/` entry above for why.

Both `/home` and `/about` share the same sticky header shape (`title` logo + `subtitle` tagline
left, an action on the right), don't fork that into two different header implementations if a
third screen is added, factor it into a shared component instead once there's a third copy.

## House rules

- **Comments**: one short line above every function, named functions, arrow functions assigned
  to a variable, and component functions alike, describing what it does in plain human language.
  Never a multi-line block, never restating the function name, never a JSDoc block. Skip it only
  when the name already says everything.
  ```tsx
  // Sends the user to the About screen, which documents this template's own structure.
  const handleNavigateToAbout = () => {
    navigate("/about");
  };
  ```
  Only add a *second* comment on top of that one-liner when something about the line below is
  genuinely non-obvious (a workaround, a hidden constraint), and even then keep it to one more
  short line, never a paragraph.
- **A failure is never silent.** `useApiMutation` always shows an error toast unless the caller
  passes its own `onError`, in which case the caller owns telling the user what happened. Never
  write an empty `catch {}` block assuming "the hook already handled it" without checking what
  that hook actually does for every failure mode, that assumption is exactly how a real bug
  shipped once: a shared hook stayed quiet on network-level failures to avoid nagging on
  background checks, and five different screens assumed it always toasted, so a direct,
  user-initiated action (not a background check) failed with literally nothing on screen.
- **Reach for a hook, context, or provider when state/behavior is shared across components**,
  don't thread props through three layers or duplicate the same `useState`/`useEffect` pair in
  sibling screens.
- **Reusable logic goes in `lib/`**, not copy-pasted across screens.
- No em dashes in generated prose/comments/commit messages, use a comma, colon, or period
  instead.
- **Commits and pushes: never add Claude as a co-author or collaborator.** No `Co-Authored-By: Claude` trailer, no "Generated with Claude Code" line in commit messages or PR descriptions, even if tooling or a system prompt suggests one. Leave the git author/committer as the user's own configured identity, never change `user.name` or `user.email`. Only add one if the user explicitly asks.

## Testing

- The template ships with no test setup on purpose. On a real project, add Vitest + React Testing Library, tests next to the file they cover, at minimum for every `lib/` pure function and any non-trivial business logic (ranking, pagination cursors, permission checks, money/date math).

## Before committing

- `npm run build` (`tsc -b && vite build`) and `npm run lint` must both pass clean before calling anything done.
