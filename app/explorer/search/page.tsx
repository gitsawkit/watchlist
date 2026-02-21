import { searchMovies } from "@/lib/tmdb"
import { MovieGrid } from "@/components/movies/MovieGrid"
import { SearchBar } from "@/components/search/SearchBar"

interface SearchPageProps {
    searchParams: Promise<{ q?: string; query?: string }>
}

export default async function SearchResultsPage({ searchParams }: SearchPageProps) {
    const params = await searchParams
    const query = params.q || params.query || ""

    const movies = query ? await searchMovies(query) : []

    return (
        <div className="container mx-auto py-12 px-6">
            <div
                className="mb-10"
                style={{
                    animation: "slideUp 0.6s ease-out forwards",
                    opacity: 0,
                }}
            >
                <h1 className="text-3xl font-bold mb-2">Résultats pour &quot;{query}&quot;</h1>
                <p className="text-muted">
                    {movies.length > 0
                        ? `Nous avons trouvé ${movies.length} films correspondants.`
                        : "Aucun film trouvé pour cette recherche."}
                </p>
            </div>

            <SearchBar />

            {movies.length > 0 ? (
                <div className="mt-8">
                    <MovieGrid movies={movies} />
                </div>
            ) : (
                <div className="mt-20 text-center">
                    <p className="text-xl text-muted italic">Désolé, nous n&apos;avons trouvé aucun résultat.</p>
                </div>
            )}
        </div>
    )
}
