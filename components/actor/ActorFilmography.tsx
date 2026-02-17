"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Film, Tv } from "lucide-react"
import type { ActorFilmographyProps } from "@/types/components"
import type { Movie } from "@/types/tmdb"
import type { ActorMovieCredit, ActorTvCredit } from "@/types/tmdb"
import { InfiniteScrollMovies } from "@/components/movies/InfiniteScrollMovies"

type Tab = "movies" | "tv"

function creditToMovie(credit: ActorMovieCredit): Movie {
    return {
        id: credit.id,
        title: credit.title,
        original_title: credit.title,
        overview: credit.overview,
        poster_path: credit.poster_path,
        backdrop_path: credit.backdrop_path,
        release_date: credit.release_date,
        vote_average: credit.vote_average,
        vote_count: 0,
        popularity: credit.popularity,
    }
}

function tvCreditToMovie(credit: ActorTvCredit): Movie {
    return {
        id: credit.id,
        title: credit.name,
        original_title: credit.name,
        overview: credit.overview,
        poster_path: credit.poster_path,
        backdrop_path: credit.backdrop_path,
        release_date: credit.first_air_date,
        vote_average: credit.vote_average,
        vote_count: 0,
        popularity: credit.popularity,
    }
}

export function ActorFilmography({ movies, tvShows }: ActorFilmographyProps) {
    const [activeTab, setActiveTab] = useState<Tab>("movies")


    const sortedMovies = useMemo(() => {
        return [...movies]
            .filter((m) => m.poster_path)
            .sort((a, b) => b.popularity - a.popularity)
            .map(creditToMovie)
    }, [movies])

    const sortedTvShows = useMemo(() => {
        return [...tvShows]
            .filter((s) => s.poster_path)
            .sort((a, b) => b.popularity - a.popularity)
            .map(tvCreditToMovie)
    }, [tvShows])

    const hasMovies = sortedMovies.length > 0
    const hasTvShows = sortedTvShows.length > 0

    if (!hasMovies && !hasTvShows) {
        return null
    }

    return (
        <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-text">Filmographie</h2>

            {hasMovies && hasTvShows && (
                <div className="flex gap-2">
                    <TabButton
                        active={activeTab === "movies"}
                        onClick={() => setActiveTab("movies")}
                        icon={<Film className="h-4 w-4" />}
                        label={`Films (${sortedMovies.length})`}
                    />
                    <TabButton
                        active={activeTab === "tv"}
                        onClick={() => setActiveTab("tv")}
                        icon={<Tv className="h-4 w-4" />}
                        label={`Séries (${sortedTvShows.length})`}
                    />
                </div>
            )}

            {activeTab === "movies" && hasMovies && (
                <InfiniteScrollMovies
                    initialMovies={sortedMovies.slice(0, 20)}
                    category="movie"
                    clientSideData={sortedMovies}
                />
            )}
            {activeTab === "tv" && hasTvShows && (
                <InfiniteScrollMovies
                    initialMovies={sortedTvShows.slice(0, 20)}
                    category="tv"
                    clientSideData={sortedTvShows}
                />
            )}
        </section>
    )
}

function TabButton({ active, onClick, icon, label }: {
    active: boolean
    onClick: () => void
    icon: React.ReactNode
    label: string
}) {
    return (
        <Button
            variant={active ? "default" : "outline"}
            className={`gap-2 cursor-pointer ${active
                ? "bg-red hover:bg-red-2 text-text border-none"
                : "bg-surface-2 text-muted hover:text-text hover:bg-surface border-border/20"
                }`}
            onClick={onClick}
        >
            {icon}
            {label}
        </Button>
    )
}
