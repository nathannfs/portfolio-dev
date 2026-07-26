import { Github, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center py-8">
      <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:gap-0">
        <div className="flex items-center gap-2">
          <span className="text-center font-medium text-muted-foreground text-sm md:text-start">
            © {new Date().getFullYear()} Nathan Santos. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            aria-label="Instagram de Nathan Santos"
            href="https://instagram.com/nathannfss"
            rel="noreferrer"
            target="_blank"
          >
            <Instagram className="size-5 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
          <Link
            aria-label="LinkedIn de Nathan Santos"
            href="https://linkedin.com/in/nathannfs"
            rel="noreferrer"
            target="_blank"
          >
            <Linkedin className="size-5 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
          <Link
            aria-label="GitHub de Nathan Santos"
            href="https://github.com/nathannfs"
            rel="noreferrer"
            target="_blank"
          >
            <Github className="size-5 text-muted-foreground transition-colors hover:text-foreground" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
