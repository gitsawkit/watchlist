'use client'

import { cn } from '@/lib/utils'

export type SettingsTab = 'profile' | 'security' | 'appearance' | 'data'

interface SettingsNavProps {
    onTabChange: (tab: SettingsTab) => void
    activeTab: SettingsTab
}

const TABS: Array<{ id: SettingsTab; label: string; icon: string }> = [
    { id: 'profile', label: 'Profil', icon: '👤' },
    { id: 'security', label: 'Sécurité', icon: '🔒' },
    { id: 'appearance', label: 'Apparence', icon: '🎨' },
    { id: 'data', label: 'Données', icon: '🗑️' },
]

export function SettingsNav({ onTabChange, activeTab }: SettingsNavProps) {
    return (
        <nav className="flex lg:flex-col gap-2">
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                        'flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-200 font-medium text-sm whitespace-nowrap lg:whitespace-normal',
                        activeTab === tab.id
                            ? 'bg-red-2 text-black shadow-sm'
                            : 'text-muted hover:bg-surface-2 active:bg-surface'
                    )}
                >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="hidden lg:inline">{tab.label}</span>
                </button>
            ))}
        </nav>
    )
}
