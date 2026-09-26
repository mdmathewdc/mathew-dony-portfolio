import { searchJevMovies } from "@/lib/jev/search";

export async function POST(request: Request) {
  let query = "";

  try {
    const body = (await request.json()) as { query?: unknown };
    if (typeof body.query === "string") query = body.query.slice(0, 300);
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const result = await searchJevMovies(query, request.signal);
    return Response.json(result);
  } catch (error) {
    if (request.signal.aborted) return new Response(null, { status: 499 });
    const message = error instanceof Error ? error.message : "Search failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
