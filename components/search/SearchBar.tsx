"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, Loader2, PlayCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Movie } from "@/types/tmdb"
import { getImageUrl } from "@/lib/tmdb"
import Image from "next/image"
import Link from "next/link"

export function SearchBar() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.trim().length < 2) {
                setResults([])
                return
            }

            setIsLoading(true)
            try {
                const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
                const data = await response.json()
                setResults(data.results?.slice(0, 6) || [])
                setIsOpen(true)
            } catch (error) {
                console.error("Search error:", error)
            } finally {
                setIsLoading(false)
            }
        }

        const timer = setTimeout(fetchSuggestions, 300)
        return () => clearTimeout(timer)
    }, [query])

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (query.trim().length >= 2) {
            setIsOpen(false)
            router.push(`/explorer/search?q=${encodeURIComponent(query.trim())}`)
        }
    }

    return (
        <div className="relative w-full max-w-2xl mx-auto mb-12" ref={dropdownRef}>
            <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted transition-colors group-focus-within:text-red">
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                </div>
                <Input
                    type="text"
                    placeholder="Rechercher un film..."
                    className="pl-10 pr-10 py-6 h-14 bg-surface/50 backdrop-blur-md border-border hover:border-red/50 focus:border-red text-lg shadow-xl transition-all duration-300 rounded-2xl"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="absolute inset-y-0 right-3 flex items-center text-muted hover:text-text transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </form>

            {isOpen && results.length > 0 && (
                <div
                    className="absolute top-full mt-2 w-full bg-surface/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{
                        boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(220, 38, 38, 0.1)"
                    }}
                >
                    <div className="p-2">
                        {results.map((movie) => (
                            <Link
                                key={movie.id}
                                href={`/movie/${movie.id}`}
                                className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-xl transition-all group relative overflow-hidden"
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="relative w-12 h-18 shrink-0 rounded-lg overflow-hidden shadow-md">
                                    <Image
                                        src={getImageUrl(movie.poster_path, "w500")}
                                        alt={movie.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-red/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <PlayCircle className="w-6 h-6 text-white text-shadow" />
                                    </div>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="font-semibold text-text truncate group-hover:text-red transition-colors duration-200">
                                        {movie.title}
                                    </span>
                                    <span className="text-sm text-muted">
                                        {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
                                    </span>
                                </div>
                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                                    <span className="text-xs font-bold px-2 py-1 bg-red/10 text-red rounded-full border border-red/20">
                                        Voir
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="bg-white/5 px-4 py-3 border-t border-border flex justify-between items-center">
                        <span className="text-xs text-muted">Suggestions de films</span>
                        <Link
                            href={`/explorer/search?q=${encodeURIComponent(query)}`}
                            className="text-xs font-bold text-red hover:underline"
                            onClick={() => setIsOpen(false)}
                        >
                            Voir tout
                        </Link>
                    </div>
                </div>
            )}

            {isOpen && query.length >= 2 && !isLoading && results.length === 0 && (
                <div className="absolute top-full mt-2 w-full bg-surface/80 backdrop-blur-xl border border-border rounded-2xl p-8 text-center shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p className="text-muted italic text-lg">Aucun film trouvé pour &quot;{query}&quot;</p>
                </div>
            )}
        </div>
    )
}
