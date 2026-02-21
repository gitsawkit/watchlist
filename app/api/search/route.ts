import { NextRequest, NextResponse } from "next/server"
import { searchMovies } from "@/lib/tmdb"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  try {
    const movies = await searchMovies(query)
    return NextResponse.json({ results: movies })
  } catch (error) {
    console.error("Search API Error:", error)
    return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500 })
  }
}
