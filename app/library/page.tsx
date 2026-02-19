import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getUserWatchlist } from "@/app/actions/watchlist"
import { LibraryTabs } from "@/components/library/LibraryTabs"

export default async function LibraryPage() {
    const supabase = await createClient()
    const { data: { user }} = await supabase.auth.getUser()

    if (!user) redirect("/login")

    const watchlist = await getUserWatchlist()

    const toWatch = watchlist.filter(e => e.status === "to_watch")
    const watched = watchlist.filter(e => e.status === "watched")

    return (
        <div className="container mx-auto py-12 px-6">
            <div
                style={{ animation: "slideUp 0.6s ease-out forwards", opacity: 0 }}
                className="mb-10"
            >
                <h1 className="text-3xl font-bold mb-2">Ma bibliothèque</h1>
                <p className="text-muted">
                    {watchlist.length} film{watchlist.length > 1 ? "s" : ""} dans votre collection
                </p>
            </div>

            <LibraryTabs toWatch={toWatch} watched={watched} />
        </div>
    )
}