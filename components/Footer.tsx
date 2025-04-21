import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-muted py-6 md:py-12">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link
            href="/"
            className="font-bold text-1xl text-primary neon-text"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Aunteq
          </Link>
          <p className="text-center text-sm leading-loose md:text-left text-muted-foreground">
            © 2025 Aunteq. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm font-medium hover:text-primary transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm font-medium hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

