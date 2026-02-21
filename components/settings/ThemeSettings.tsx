'use client'

import { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field'
import { useRouter } from 'next/navigation'

const THEMES = [
    { value: 'light' as const, label: '☀️ Clair', description: 'Thème clair classique' },
    { value: 'dark' as const, label: '🌙 Sombre', description: 'Thème sombre pour les yeux' },
    { value: 'system' as const, label: '💻 Système', description: 'Suivre les paramètres système' },
] as const

export function ThemeSettings() {
    const [isMounted, setIsMounted] = useState(false)
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light')
    const router = useRouter()

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
        const initialTheme = savedTheme ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        setTheme(initialTheme)
        setIsMounted(true)
    }, [])

    const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)

        const root = document.documentElement
        if (newTheme === 'system') {
            root.removeAttribute('data-theme')
            root.classList.remove('light', 'dark')
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            root.classList.add(prefersDark ? 'dark' : 'light')
        } else {
            root.setAttribute('data-theme', newTheme)
            root.classList.remove('light', 'dark')
            root.classList.add(newTheme)
        }

        router.refresh()
    }

    if (!isMounted) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle>Apparence</CardTitle>
                <CardDescription>
                    Personnalisez l&apos;apparence de l&apos;application
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Thème</FieldLabel>
                        <div className="space-y-3 mt-4">
                            {THEMES.map(({ value, label, description }) => (
                                <label
                                    key={value}
                                    className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-surface transition-colors"
                                    onClick={() => handleThemeChange(value)}
                                >
                                    <input
                                        type="radio"
                                        name="theme"
                                        value={value}
                                        checked={theme === value}
                                        onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark' | 'system')}
                                        className="w-4 h-4"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{label}</p>
                                        <FieldDescription className="mt-1">
                                            {description}
                                        </FieldDescription>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </Field>
                </FieldGroup>
            </CardContent>
        </Card>
    )
}
