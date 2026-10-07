<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Published leadership portraits use Lovable asset pointers so image URLs remain stable across preview and production builds.
- The public home is an unauthenticated leaf inside AppShell with a dedicated public navigation branch; this preserves the institutional header without exposing MIS controls.
- Home proposal figures are presentational constants and never overwrite operational mock data; this keeps proposal content independent of MIS analytics.
