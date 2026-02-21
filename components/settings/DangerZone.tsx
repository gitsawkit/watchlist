'use client'

import { useActionState, useState } from 'react'
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
import { deleteAccount } from '@/app/settings/actions'

const initialState = {
    error: undefined as string | undefined,
    success: false,
}

export function DangerZone() {
    const [state, formAction, isPending] = useActionState(deleteAccount, initialState)
    const [isDeleting, setIsDeleting] = useState(false)
    const [confirmText, setConfirmText] = useState('')

    const handleCancel = () => {
        setIsDeleting(false)
        setConfirmText('')
    }

    return (
        <Card className="border-red">
            <CardHeader>
                <CardTitle className="text-red">Zone dangereuse</CardTitle>
                <CardDescription>
                    Les actions suivantes ne peuvent pas être annulées
                </CardDescription>
            </CardHeader>
            <CardContent>
                {!isDeleting ? (
                    <Button
                        variant="destructive"
                        onClick={() => setIsDeleting(true)}
                    >
                        Supprimer mon compte et mes données
                    </Button>
                ) : (
                    <form action={formAction} className="space-y-6">
                        <div className="bg-red/10 border border-red/20 rounded-lg p-4">
                            <p className="text-sm font-medium text-red mb-3">
                                ⚠️ Avertissement important
                            </p>
                            <ul className="text-sm text-red/90 space-y-2 ml-4 list-disc">
                                <li>Toutes vos données seront supprimées définitivement</li>
                                <li>Votre compte ne pourra pas être récupéré</li>
                                <li>Cette action ne peut pas être annulée</li>
                                <li>Vous serez déconnecté immédiatement</li>
                            </ul>
                        </div>

                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="confirmation">
                                    Tapez &quot;SUPPRIMER&quot; pour confirmer
                                </FieldLabel>
                                <Input
                                    id="confirmation"
                                    name="confirmation"
                                    type="text"
                                    value={confirmText}
                                    onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
                                    placeholder="SUPPRIMER"
                                    autoFocus
                                    className="uppercase font-mono tracking-widest"
                                />
                                <FieldDescription>
                                    Cette action est irréversible. Assurez-vous d&apos;avoir sauvegardé vos données.
                                </FieldDescription>
                            </Field>
                        </FieldGroup>

                        {state.error && (
                            <p className="text-sm text-red">{state.error}</p>
                        )}

                        <div className="flex gap-3 pt-4 border-t">
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={isPending || confirmText !== 'SUPPRIMER'}
                            >
                                {isPending ? 'Suppression...' : 'Supprimer'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                disabled={isPending}
                            >
                                Annuler
                            </Button>
                        </div>
                    </form>
                )}
            </CardContent>
        </Card>
    )
}
