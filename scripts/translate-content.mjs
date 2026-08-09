import "dotenv/config"

import pg from "pg"

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const q = (sql, params = []) => pool.query(sql, params).then((r) => r.rows)

/**
 * pt-BR overrides for the content that lives in the database.
 *
 * The base columns hold English and `translations` holds the Portuguese
 * version keyed by field name, so adding a language never migrates a row.
 * Only the fields the interface actually localizes are filled here.
 */

const PROJECTS = {
  "OMD Farm": {
    description:
      "SaaS de gestão agrícola em que trabalho na OMD do Brasil. Escrevi o backend do zero em NestJS, Prisma e PostgreSQL, com arquitetura em camadas de domínio, casos de uso e repositórios, que o time adotou como padrão. Também containerizei a aplicação e escrevi o pipeline de deploy, que foi o que permitiu tirar a plataforma do Google App Engine.",
    features: [
      "Backend em camadas no NestJS: domínio, casos de uso e repositórios",
      "Autenticação por sessão, resolução de contexto de tenant e RBAC por middleware",
      "Ingestão de dados de dispositivos via MQTT, alimentando rastreamento em tempo real e notificações",
      "Mapa interativo com a API do Google Maps, com histórico de trajeto e dados em tempo real",
      "Docker Compose para produção, desenvolvimento e banco, com deploy no GitHub Actions",
    ],
    challenges: [
      "Manter o tempo de resposta estável nas rotas de maior volume conforme o banco cresceu",
      "Containerizar uma aplicação que era publicada direto no Google App Engine",
      "Fazer um time de oito pessoas adotar uma arquitetura nova sem travar a entrega",
    ],
    learnings: [
      "Como a ingestão por MQTT se comporta quando o volume de dispositivos deixa de ser demonstração",
      "Onde o cache em Redis compensa, e onde ele só esconde uma query ruim",
      "Que uma arquitetura só vira padrão se o time conseguir seguir sem mim",
    ],
  },
  "OMD Eco Control": {
    description:
      "Plataforma de telemetria de frotas na OMD do Brasil. Iniciei o projeto e escrevi sua estrutura inicial: o monorepo, a modelagem de dados, o isolamento multi-tenant e a camada geoespacial. Hoje seis desenvolvedores trabalham nela.",
    features: [
      "Monorepo em Turborepo com quatro aplicações e oito pacotes compartilhados",
      "Isolamento multi-tenant com Row Level Security, aplicado por requisição",
      "Autorização por políticas com CASL, com grupos de permissão e gestão de sessões",
      "Dados geoespaciais em PostGIS: frota, pontos de interesse e rotas, com RLS por tenant e por equipe",
      "Base de mapas com Google Maps: canvas, overlays e ferramentas de desenho",
    ],
    challenges: [
      "Fazer o Row Level Security valer por requisição, sem depender de cada query lembrar do tenant",
      "Separar telemetria e telemetria de vídeo em serviços próprios sem duplicar os contratos",
      "Definir os padrões de frontend cedo o bastante para seis pessoas construírem sobre os mesmos",
    ],
    learnings: [
      "Que controle de acesso no banco sobrevive a erros que a camada de aplicação não perdoa",
      "Como o PostGIS muda o formato de um schema quando rota e área viram cidadãos de primeira classe",
      "Onde um monorepo compensa, e onde ele só muda o acoplamento de lugar",
    ],
  },
  "Multi-tenant scheduling platform": {
    description:
      "SaaS de agendamento que construí sozinho, com cerca de 13 mil linhas. A cliente marca por um widget embutido no site do próprio negócio, a dona administra tudo por um painel, e os dados de cada tenant ficam isolados por Row Level Security.",
    features: [
      "Row Level Security com 16 políticas sobre 29 tabelas",
      "Widget de agendamento que se embute em sites de terceiros",
      "Painel da dona com semana, pedidos pendentes, bloqueios e serviços",
      "Roda em VPS com Docker Compose, proxy reverso e rotina de backup diário",
      "Regras de negócio e políticas de acesso cobertas por testes",
    ],
    challenges: [
      "Impedir overbooking de vez, o que virou uma constraint de exclusão no Postgres em vez de uma verificação no código",
      "Manter o cálculo de disponibilidade num lugar só, compartilhado pelo widget, pelo painel e pela API",
      "Tirar tudo de uma plataforma gerenciada sem reescrever as regras de negócio",
    ],
    learnings: [
      "Que um invariante que o banco consegue garantir não deveria morar no código da aplicação",
      "O quanto vale um arquivo de migration versionado no dia em que você troca de plataforma",
      "Testar o que quebra caro, regra de negócio e política de acesso, em vez de perseguir cobertura",
    ],
  },
  "Curriculum SaaS": {
    description:
      "Gerador de currículos em PDF, com cobrança em três moedas e roteamento entre Stripe e PIX conforme o país. Interface e conteúdo saem em inglês e português via next-intl.",
    features: [
      "Geração de PDF a partir de templates em HTML",
      "Cobrança em três moedas, roteando entre Stripe e PIX pelo país",
      "Inglês e português com next-intl, com o idioma na URL",
      "Ciclo de vida da assinatura: teste, upgrade e cancelamento",
    ],
    challenges: [
      "Fazer o PDF sair igual ao template mesmo com conteúdo de tamanhos diferentes",
      "Escolher entre moeda por IP e idioma por URL sem cegar o rastreador",
      "Lidar com dois meios de pagamento de regras distintas: o Stripe cobra inline, o de PIX exige produto no catálogo",
    ],
    learnings: [
      "Que a moeda pode seguir o visitante, mas o idioma tem que seguir a URL",
      "Como o ciclo de assinatura do Stripe se comporta fora do caminho feliz",
      "Onde a geração de PDF fica cara, e o que vale guardar em cache",
    ],
  },
  "SaaS Templates": {
    description:
      "Ponto de partida opinativo para produtos SaaS, com Hono, Drizzle ORM, Better Auth e Biome. Uso como base dos meus projetos, que é também onde as regras dele são testadas e, quando não sobrevivem, derrubadas de propósito.",
    features: [
      "Autenticação pronta com Better Auth: email, OAuth e magic link",
      "Camada de dados tipada com Drizzle ORM e migrations versionadas",
      "Biome para lint e formatação, no lugar de ESLint e Prettier",
      "Docker Compose igual ao que roda em produção",
    ],
    challenges: [
      "Desenhar uma estrutura flexível para tipos diferentes de SaaS sem virar framework",
      "Decidir quais regras do template vale quebrar num projeto real, e escrever o porquê",
      "Sair do Auth.js para o Better Auth sem perder segurança de tipos",
    ],
    learnings: [
      "Que um template só ganha suas regras depois que um projeto real quebra algumas delas",
      "Hono como camada de API leve ao lado do Next.js",
      "Padrões do Drizzle para queries tipadas sem abrir mão de SQL cru onde ele lê melhor",
    ],
  },
}

const EXPERIENCES = {
  "Full-Stack Software Engineer": {
    description:
      "Trabalho em duas plataformas SaaS: um sistema de gestão agrícola, onde escrevi o backend, e uma plataforma de telemetria de frotas, que iniciei.",
    responsibilities: [
      "Escrevi o backend da plataforma agrícola em NestJS, Prisma e PostgreSQL, com arquitetura em camadas que o time adotou",
      "Iniciei a plataforma de telemetria: monorepo, modelagem de dados, isolamento multi-tenant com Row Level Security e dados geoespaciais em PostGIS",
      "Containerizei as aplicações com Docker Compose e escrevi o pipeline de deploy no GitHub Actions",
      "Construí a ingestão de dados de dispositivos via MQTT para rastreamento em tempo real e notificações",
      "Implementei autenticação por sessão, contexto de tenant e RBAC por middleware",
    ],
  },
  "Innovation Analyst": {
    description:
      "Desenvolvimento full-stack em web e mobile, com participação nas decisões de arquitetura técnica.",
    responsibilities: [
      "Construí aplicações web em Next.js e TypeScript, e mobile em React Native",
      "Construí APIs REST em Node.js com Fastify, Prisma e PostgreSQL, containerizadas com Docker",
      "Refatorei um portal corporativo para renderização no servidor, o que reduziu o tempo de carregamento",
      "Participei da análise de requisitos, da modelagem de dados e das decisões de arquitetura",
    ],
  },
  "Project Engineering and Quality": {
    description:
      "De estagiário a desenhista pleno em engenharia elétrica e mecatrônica. É de onde vem a base industrial por trás do meu trabalho com telemetria.",
    responsibilities: [
      "Elaborei diagramas elétricos e layouts mecânicos",
      "Revisei e validei especificações técnicas de projeto",
      "Gerenciei o ciclo de vida de projetos e acompanhei a entrega por indicadores",
      "Inspecionei painéis elétricos e mantive a documentação de inspeção em ordem",
    ],
  },
}

const DEGREES = {
  "Postgraduate in Software Engineering": {
    title: "Pós-graduação em Engenharia de Software",
    description:
      "Estudo avançado de engenharia de software, com base em arquitetura, lógica, algoritmos e estrutura de dados. É o que uso no dia a dia quando o sistema precisa crescer.",
  },
  "Technologist in Industrial Mechatronics": {
    title: "Tecnólogo em Mecatrônica Industrial",
    description:
      "Curso de lógica de automação, integração entre hardware e software e método de resolução de problema. É de onde vem a cabeça de engenharia que ainda uso para construir sistema confiável.",
  },
}

const CERTIFICATIONS = {
  "Node.js Path": { title: "Trilha Node.js" },
  "React.js Path": { title: "Trilha React.js" },
  "Full Stack Web Development": { title: "Desenvolvimento Web Full Stack" },
}

const ABOUT_ME_PT = `Construo SaaS full-stack no ecossistema TypeScript, quase sempre a partir do modelo de dados. A parte de que mais gosto fica no backend: controle de acesso que mora no banco em vez de espalhado pelas queries, invariantes que o próprio schema garante, e migrations que dá pra rodar de novo.

Antes de escrever software passei dois anos em engenharia elétrica e mecatrônica na indústria. Foi lá que aprendi a desconfiar de sistema que só funciona quando todo mundo lembra do passo certo, que é mais ou menos como encaro código hoje.

No momento estou na OMD do Brasil, trabalhando num SaaS agrícola e numa plataforma de telemetria de frotas, e tocando meus próprios produtos em paralelo.`

async function merge(table, matchColumn, matchValue, patch) {
  const rows = await q(
    `update ${table}
        set translations = coalesce(translations, '{}'::jsonb) || $1::jsonb
      where ${matchColumn} = $2
      returning id`,
    [JSON.stringify(patch), matchValue]
  )
  const fields = Object.keys(patch).join(", ")
  console.log(
    rows.length
      ? `  ok   ${matchValue.slice(0, 42).padEnd(44)} (${fields})`
      : `  MISS ${matchValue}`
  )
  return rows.length
}

async function main() {
  let done = 0

  console.log("PROJETOS")
  for (const [name, patch] of Object.entries(PROJECTS)) {
    done += await merge("projects", "name", name, patch)
  }

  console.log("\nEXPERIENCIAS")
  for (const [position, patch] of Object.entries(EXPERIENCES)) {
    done += await merge("experiences", "position", position, patch)
  }

  console.log("\nFORMACAO")
  for (const [title, patch] of Object.entries(DEGREES)) {
    done += await merge("degrees", "title", title, patch)
  }

  console.log("\nCERTIFICACOES")
  for (const [title, patch] of Object.entries(CERTIFICATIONS)) {
    done += await merge("certifications", "title", title, patch)
  }

  console.log("\nSOBRE")
  await q(
    `update about_me
        set translations = coalesce(translations, '{}'::jsonb) || $1::jsonb`,
    [JSON.stringify({ content: ABOUT_ME_PT })]
  )
  console.log("  ok   about_me (content)")

  console.log(`\n${done + 1} registros com traducao pt-BR`)

  const missing = await q(`
    select 'projects' as t, name as label from projects where translations is null
    union all select 'experiences', position from experiences where translations is null
    union all select 'degrees', title from degrees where translations is null
    union all select 'certifications', title from certifications where translations is null
    union all select 'about_me', 'content' from about_me where translations is null
  `)
  console.log(
    missing.length
      ? `\nAINDA SEM TRADUCAO:\n${missing.map((m) => `  ${m.t}: ${m.label}`).join("\n")}`
      : "\nNenhum registro sem traducao."
  )

  await pool.end()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
