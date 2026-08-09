# portfolio-dev

Meu portfólio pessoal, no ar em **[nathannfs.com](https://nathannfs.com)**.

Não é uma página estática. Os projetos vivem no Postgres e são editados por uma área administrativa protegida, o conteúdo é servido em português e inglês a partir do banco, e o SEO técnico é gerado no build.

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Estilo | Tailwind CSS, next-themes para claro e escuro |
| Dados | PostgreSQL com Drizzle ORM |
| Autenticação | NextAuth v5 |
| Animação | GSAP, Framer Motion, Lenis para scroll suave |
| Deploy | Vercel |

## Decisões que valem explicar

**Conteúdo no banco, não em arquivo.** Os projetos ficam em Postgres e são editados pela área autenticada em `/auth/sign-in`. Trocar uma descrição ou publicar um projeto novo não exige commit nem redeploy.

**Tradução aditiva, em coluna separada.** Em vez de duplicar cada registro por idioma, cada projeto guarda suas traduções numa coluna própria. Adicionar um idioma novo não altera o schema nem migra dado existente.

**Idioma por conteúdo, nunca por redirecionamento de IP.** Redirecionar visitante por geolocalização cega o rastreador do Google, que chega sempre do mesmo lugar e acaba indexando uma versão só. Aqui a rota decide o idioma e o Googlebot enxerga as duas.

**SEO gerado, não escrito à mão.** `sitemap.ts` e `robots.ts` são gerados a partir do banco, cada projeto tem metadata própria, e o site expõe um `llms.txt` para os rastreadores de busca por IA.

**Scroll com Lenis em contexto compartilhado.** A navegação por âncora e o botão de voltar ao topo usam a mesma instância do Lenis via contexto, em vez de cada componente criar a sua e disputar o scroll.

## Estrutura

```
src/
├── app/
│   ├── (public)/          # home e autenticação
│   ├── about/
│   ├── projects/          # listagem e detalhe por id
│   ├── api/
│   ├── sitemap.ts         # gerado a partir do banco
│   └── robots.ts
├── components/            # botão, modal, formulário, motion
├── db/                    # schema e cliente Drizzle
├── i18n/                  # config, provider e localização
└── http/                  # cliente de API
```

## Rodando local

Requer Node 20+, pnpm e um PostgreSQL acessível.

```bash
pnpm install
```

Crie um `.env` na raiz:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/portfolio
AUTH_SECRET=  # gere com: openssl rand -base64 32
```

Depois:

```bash
pnpm drizzle-kit push     # cria o schema
pnpm dev
```

A aplicação sobe em `http://localhost:3000`.

## Licença

Código aberto para leitura e referência. O conteúdo, os textos e as imagens são meus.
