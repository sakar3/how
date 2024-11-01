"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { BookMarked } from "lucide-react"
import Link from "next/link"
import { AuthButton } from "@/components/auth/auth-button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BookMarked className="h-6 w-6" />
            <span className="font-bold">Memory Lane</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/explore">Explore</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/create">Create Story</Link>
            </Button>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ModeToggle />
          <AuthButton />
        </div>
      </div>
    </header>
  )
}