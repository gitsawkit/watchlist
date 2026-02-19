"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { LibraryCard } from "@/components/library/LibraryCard"
import { BookMarked, Eye } from "lucide-react"
import type { WatchlistEntry } from "@/types/components"

interface LibraryTabsProps {
    toWatch: WatchlistEntry[]
    watched: WatchlistEntry[]
}

type Tab = "to_watch" | "watched"

export function LibraryTabs({ toWatch, watched }: LibraryTabsProps) {
    const [activeTab, setActiveTab] = useState<Tab>("to_watch")

    const tabs = [
        { id: "to_watch" as Tab, label: "À voir", icon: BookMarked, items: toWatch },
        { id: "watched" as Tab, label: "Déjà vu", icon: Eye, items: watched },
    ]

    const current = tabs.find(t => t.id === activeTab)!

    return (
        <div>
            <div className="flex gap-2 mb-8 border-b border-border pb-0">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200",
                            "border-b-2 -mb-px",
                            activeTab === tab.id
                                ? "border-red text-text"
                                : "border-transparent text-muted hover:text-text hover:border-border"
                        )}
                    >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                        <span className={cn(
                            "ml-1 px-1.5 py-0.5 rounded-full text-xs",
                            activeTab === tab.id
                                ? "bg-red/20 text-red"
                                : "bg-surface-2 text-muted"
                        )}>
                            {tab.items.length}
                        </span>
                    </button>
                ))}
            </div>

            {current.items.length === 0 ? (
                <div
                    className="flex flex-col items-center justify-center py-24 text-muted"
                    style={{ animation: "fadeIn 0.4s ease-out forwards" }}
                >
                    <current.icon className="h-12 w-12 mb-4 opacity-30" />
                    <p className="text-lg font-medium">Aucun film ici</p>
                    <p className="text-sm mt-1">
                        {activeTab === "to_watch"
                            ? "Ajoutez des films à voir depuis Explorer"
                            : "Marquez des films comme vus"}
                    </p>
                </div>
            ) : (
                <div
                    key={activeTab}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                    style={{ animation: "scaleIn 0.3s ease-out forwards", opacity: 0 }}
                >
                    {current.items.map(entry => (
                        <LibraryCard key={entry.id} entry={entry} />
                    ))}
                </div>
            )}
        </div>
    )
}
