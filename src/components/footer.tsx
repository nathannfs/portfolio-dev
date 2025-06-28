import { Github, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center py-8">
      <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:gap-0">
        <div className="flex items-center gap-2">
          <span className="text-center text-sm font-medium text-muted-foreground md:text-start">
            © {new Date().getFullYear()} Nathan Santos. Todos os direitos
            reservados.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="https://instagram.com/nathannfs.dev" target="_blank" rel="noreferrer">
            <Instagram className="size-5 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
          <Link href="https://linkedin.com/in/nathannfs" target="_blank" rel="noreferrer">
            <Linkedin className="size-5 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
          <Link href="https://github.com/nathannfs" target="_blank" rel="noreferrer">
            <Github className="size-5 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
