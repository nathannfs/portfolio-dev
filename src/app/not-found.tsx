import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 overflow-hidden p-6">
      <Image src="/not-found.png" alt="404" width={300} height={300} />

      <h2 className="text-xl">Oops, está página não foi encontrada</h2>

      <Link href="/">Voltar para a página inicial</Link>
    </main>
  )
}
