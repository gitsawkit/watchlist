'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function updateEmail(prevState: unknown, formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Non authentifié', success: false }
    }

    const newEmail = formData.get('email') as string

    if (!newEmail) {
        return { error: 'L\'adresse e-mail est obligatoire', success: false }
    }

    const { error } = await supabase.auth.updateUser({
        email: newEmail,
    })

    if (error) {
        return { error: error.message, success: false }
    }

    return { error: undefined, success: true, message: 'Email mis à jour. Veuillez confirmer le nouveau email.' }
}

export async function updatePassword(prevState: unknown, formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Non authentifié', success: false }
    }

    const newPassword = formData.get('password') as string
    const confirmPassword = formData.get('confirm-password') as string

    if (!newPassword || !confirmPassword) {
        return { error: 'Tous les champs sont obligatoires', success: false }
    }

    if (newPassword !== confirmPassword) {
        return { error: 'Les mots de passe ne correspondent pas', success: false }
    }

    if (newPassword.length < 8) {
        return { error: 'Le mot de passe doit contenir au moins 8 caractères', success: false }
    }

    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    })

    if (error) {
        return { error: error.message, success: false }
    }

    return { error: undefined, success: true, message: 'Mot de passe mis à jour avec succès' }
}

export async function updateProfile(prevState: unknown, formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Non authentifié', success: false }
    }

    const fullName = formData.get('fullName') as string
    const username = formData.get('username') as string

    if (!fullName || !username) {
        return { error: 'Tous les champs sont obligatoires', success: false }
    }

    const { error } = await supabase.auth.updateUser({
        data: {
            full_name: fullName,
            username: username,
        },
    })

    if (error) {
        return { error: error.message, success: false }
    }

    revalidatePath('/settings')
    return { error: undefined, success: true, message: 'Profil mis à jour avec succès' }
}

export async function updateAvatar(prevState: unknown, formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Non authentifié', success: false }
    }

    const avatarUrl = formData.get('avatarUrl') as string

    if (!avatarUrl) {
        return { error: 'URL d\'avatar invalide', success: false }
    }

    const { error } = await supabase.auth.updateUser({
        data: {
            avatar_url: avatarUrl,
        },
    })

    if (error) {
        return { error: error.message, success: false }
    }

    revalidatePath('/settings')
    return { error: undefined, success: true, message: 'Photo de profil mise à jour avec succès' }
}

export async function deleteAccount(prevState: unknown, formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Non authentifié', success: false }
    }

    const confirmation = formData.get('confirmation') as string

    if (confirmation !== 'SUPPRIMER') {
        return { error: 'Texte de confirmation incorrect. Veuillez taper "SUPPRIMER".', success: false }
    }


    await supabase.auth.signOut()

    // TODO: Implement account deletion through a Supabase function
    // Example:
    // const { data, error } = await supabase
    //   .rpc('delete_user_account', { user_id: user.id })

    revalidatePath('/', 'layout')
    redirect('/login?deleted=true')
}
