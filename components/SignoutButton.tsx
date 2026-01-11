"use client"

import { useTransition } from "react"
import { signout } from "@/app/auth/actions"
import { LogOut } from "lucide-react"

export function SignoutButton() {
  const [isPending, startTransition] = useTransition()

  const handleSignout = () => {
    startTransition(async () => {
      await signout()
    })
  }

  return (
    <button 
      type="button"
      onClick={handleSignout}
      disabled={isPending}
      className="cursor-pointer flex w-full py-1.5 px-2 gap-2 items-center text-red-2 hover:text-red disabled:opacity-50"
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>{isPending ? "Déconnexion..." : "Déconnexion"}</span>
    </button>
  )
}
