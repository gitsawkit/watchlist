'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import { updatePassword } from '@/app/settings/actions'

const initialState = {
    error: undefined,
    success: false,
    message: '',
}

export function PasswordSettings() {
    const [state, formAction, isPending] = useActionState(updatePassword, initialState)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mot de passe</CardTitle>
                <CardDescription>
                    Modifiez votre mot de passe pour sécuriser votre compte
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-6">
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="password">Nouveau mot de passe</FieldLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                            />
                            <FieldDescription>
                                Minimum 8 caractères avec une majuscule et un chiffre
                            </FieldDescription>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="confirm-password">Confirmer le mot de passe</FieldLabel>
                            <Input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                placeholder="••••••••"
                                required
                            />
                        </Field>
                    </FieldGroup>

                    {state.error && <p className="text-sm text-red">{state.error}</p>}
                    {state.success && (
                        <p className="text-sm text-gold">{state.message}</p>
                    )}

                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
