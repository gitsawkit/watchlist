import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 font-display text-4xl font-normal text-text md:text-5xl">
        Oups ! Erreur d&apos;authentification
      </h1>
      <p className="mb-8 max-w-md text-lg text-muted">
        Une erreur est survenue lors de la tentative de connexion avec le fournisseur tiers. Le lien a peut-être expiré ou a déjà été utilisé.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/login">Réessayer</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
      </div>
    </div>
  )
}

