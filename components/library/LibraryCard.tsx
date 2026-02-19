import Image from "next/image"
import Link from "next/link"
import { getImageUrl } from "@/lib/tmdb"
import { WatchButton } from "@/components/movies/WatchButton"
import { cn } from "@/lib/utils"
import { Eye, Clock } from "lucide-react"
import type { WatchlistEntry } from "@/types/components"

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
}

export function LibraryCard({ entry }: { entry: WatchlistEntry }) {
    const isWatched = entry.status === "watched"

    return (
        <div className="group relative overflow-hidden rounded-(--radius-cinema) bg-surface">
            <Link href={`/movie/${entry.movie_id}`} className="block">
                <div className="relative aspect-2/3 w-full overflow-hidden">
                    <Image
                        src={getImageUrl(entry.poster_path)}
                        alt={entry.movie_title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-surface/90 via-surface/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className={cn(
                        "absolute inset-x-0 bottom-0 p-4 z-10",
                        "flex items-center gap-1.5",
                        "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
                        "transition-all duration-300"
                    )}>
                        {isWatched
                            ? <Eye className="h-3 w-3 text-muted shrink-0" />
                            : <Clock className="h-3 w-3 text-muted shrink-0" />
                        }
                        <span className="text-xs text-muted leading-tight">
                            {isWatched ? "Vu le" : "Ajouté le"} {formatDate(entry.created_at)}
                        </span>
                    </div>
                </div>
            </Link>

            <div className={cn(
                "absolute top-2 right-2 z-10 transition-all duration-300",
                "flex gap-1.5",
                "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
            )}>
                {!isWatched && (
                    <WatchButton
                        movieId={entry.movie_id}
                        movieTitle={entry.movie_title}
                        posterPath={entry.poster_path}
                        status="watched"
                        initialActive={false}
                        fallbackStatus="to_watch"
                        variant="icon"
                    />
                )}

                <WatchButton
                    movieId={entry.movie_id}
                    movieTitle={entry.movie_title}
                    posterPath={entry.poster_path}
                    status={entry.status}
                    initialActive={true}
                    fallbackStatus={isWatched ? "to_watch" : undefined}
                    variant="icon"
                />
            </div>
        </div>
    )
}