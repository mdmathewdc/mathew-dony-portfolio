## Plan: JEV Movie Retrieval Demo and Blog Draft

Build a standalone client-side experiment and companion MDX post. The project will define **JEV (Just Enough Vectors)** as a deliberately small, inspectable semantic-retrieval model: enough relevance scoring to communicate the effect, while keeping the movie-poster animation as the story. The initial version is deterministic and requires neither API credentials nor a vector database.

### Discovery
- Target workspace is `c:\Users\mathe\Desktop\mathew-dony-portfolio\2025-refresh`, a Next.js 16 App Router site using TypeScript, Tailwind v4, local Satoshi/Instrument Serif fonts, MDX posts, and Motion.
- Blog posts live in `content/blog/*.mdx` and must also be registered in `app/data/articles.ts`.
- The linked X post’s actual media cannot be accessed through public page/syndication fetches. The app will implement the described behavior rather than copy its visuals.
- No test framework is installed. Available executable checks are `npm run lint` and `npm run build`.

### Scope and Decisions
- Included: a new `/jev` interactive route, a curated in-repository movie metadata dataset, remote TMDb-hosted poster URLs with visible attribution, animated rank/filter transitions, and a hybrid technical/product blog draft.
- Excluded: live JEV SDK/API calls, user data persistence, real IMDb scraping, full Top 250 coverage, and a physics-engine dependency. The initial data set will contain roughly 30 recognisable IMDb Top 250-adjacent films, enough to make query changes visually legible.
- Retrieval is deterministic: query normalisation plus a small concept dictionary maps natural phrases such as `mind bending`, `sci-fi`, and `after 2003` to explicit tags and a year constraint. Results are scored locally, ordered stably, and the top five displayed. Unknown/zero-result queries retain an intelligible empty state.
- `JEV` is an editorial framing, not an assertion that this local prototype operates a real vector index. The post explicitly separates this prototype's tagged scoring from a production embedding/vector-database replacement.

### Steps
1. **Define the static retrieval model**
   - Create `app/data/jev-movies.ts` with a typed `JevMovie` record: stable ID, title, release year, IMDb chart rank/reference, TMDb poster URL, and concept tags.
   - Keep data and query logic separate. Create `app/lib/jev-search.ts` with normalisation, phrase aliases, year parsing, weighted tag scoring, deterministic tie-breaking, and the `top 5` retrieval function.
   - Seed the movie set to support the core sequence: `mind-bending sci-fi movies` returns five high-scoring titles; appending `after 2003` removes at least two current cards and admits qualifying replacements. Add a handful of unrelated titles so the bottom pile feels substantial.

2. **Build the interactive route** *(depends on 1)*
   - Add `app/jev/page.tsx` as the route-level shell and `app/components/JevMovieSearch.tsx` as the client component managing the query, initial seeded prompt, derived candidates, focused result state, and empty state.
   - Use the installed `motion` package and `AnimatePresence` to make entering matches lift from the bottom stack, departing matches fall below the viewport, and retained cards settle/reorder. Use keyed cards so a constraint update visibly distinguishes a retained title from a replaced title.
   - Compose the page as a proper experiment rather than a generic dashboard: a compact masthead, an always-visible prompt field, a fixed-dimension five-card result rail, and a deep, slightly irregular poster deck anchored beneath it. The result rail should preserve layout while cards animate.
   - Provide a few small query presets for the intended states, but keep free-text entry as the primary path. Debounce updates briefly so typing produces a coherent transition rather than a card drop on every keystroke.
   - Adapt the composition for narrow screens: retain the prompt and result-first reading order, use a constrained horizontal card strip or smaller fanned stack, preserve legible poster aspect ratios, and respect reduced-motion preferences.
   - Use TMDb CDN URLs solely as static artwork references, include a compact TMDb attribution, and avoid an IMDb API/scrape. Add a graceful poster-load fallback that preserves the card dimensions and displays title/year.

3. **Write the companion post** *(can proceed in parallel with 1 and 2 after the route name is fixed)*
   - Create `content/blog/jev-just-enough-vectors.mdx` with working title **“JEV: Just Enough Vectors”**, caption **“A tiny movie search experiment where relevance changes the interface”**, and a direct `/jev` link near the opening.
   - Draft it as a hybrid narrative: begin with the thought experiment of a pile of movie posters responding to a natural-language request; define JEV; introduce the `mind-bending sci-fi movies` to `after 2003` constraint change; explain the curated metadata, local concept scoring, and Motion transition design; then candidly separate this prototype from real embeddings/vector search and describe the upgrade path.
   - Include only implementation snippets that match the final search helper and component behavior. Use the existing MDX headings, prose, code-fence, link, and inline-code patterns; do not add an MDX-specific custom component unless it improves the finished post.

4. **Publish it into the site** *(depends on 3)*
   - Add the article metadata to `app/data/articles.ts`, using the final publishing date supplied at implementation time and the `jev-just-enough-vectors` slug.
   - Do not modify the global navigation unless the current navigation design has a clear app/demo pattern. The article's prominent in-content link is the initial discovery path for `/jev`.

5. **Validate** *(depends on all implementation steps)*
   - Run `npm run lint` and `npm run build` in `2025-refresh`.
   - Run the local dev server and manually test the two canonical queries, a no-results query, image failure/fallback conditions, keyboard input, mobile-width layout, and reduced-motion behavior.
   - Confirm the article resolves at `/blog/jev-just-enough-vectors`, the demo link opens `/jev`, and the new article is visible in the blog list (and homepage if it falls within the four newest dates).

### Relevant Existing Files
- `c:\Users\mathe\Desktop\mathew-dony-portfolio\2025-refresh\app\data\articles.ts` — manually maintained article registration; add the new post's title, caption, date, and slug.
- `c:\Users\mathe\Desktop\mathew-dony-portfolio\2025-refresh\app\components\MemeGenerator.tsx` — client-component precedent for stateful interactive UI.
- `c:\Users\mathe\Desktop\mathew-dony-portfolio\2025-refresh\content\blog\querying-my-life-with-a-vector-database.mdx` — closest editorial and technical-explanation template.
- `c:\Users\mathe\Desktop\mathew-dony-portfolio\2025-refresh\app\globals.css` — reserve only for shared/responsive or reduced-motion CSS that Tailwind utilities cannot express locally.

### Verification
1. `npm run lint` passes without suppressing new rules except a narrowly justified image-rule exception when remote poster rendering requires it.
2. `npm run build` completes and statically renders both the route and post.
3. Manual behavior check: initial query yields five posters; adding `after 2003` visibly drops nonqualifying cards and replaces them; clearing/changing the query produces stable, non-jarring transitions.
4. Responsive checks at mobile and desktop sizes show no clipped input, illegible poster text, or controls/content overlap.

### Future Considerations
- A follow-up could replace the tag scorer with genuine JEV/embedding retrieval behind the same `searchMovies()` boundary, keeping the animation contract unchanged.
- If the demo needs exact, auditable IMDb Top 250 coverage later, use a licensed dataset/provider and revise the attribution/data pipeline rather than scrape IMDb.
