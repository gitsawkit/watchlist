import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SettingsContent } from '@/components/settings/SettingsContent'

export const metadata = {
    title: 'Paramètres - Reelmark',
    description: 'Gérez vos paramètres personnels et votre compte',
}

export default async function SettingsPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto py-12 px-6">
                <div
                    style={{ animation: 'slideUp 0.6s ease-out forwards', opacity: 0 }}
                    className="mb-10"
                >
                    <h1 className="text-3xl font-bold mb-2">Paramètres</h1>
                    <p className="text-muted">
                        Gérez votre compte et vos préférences
                    </p>
                </div>

                <SettingsContent user={user} />
            </div>
        </main>
    )
}
