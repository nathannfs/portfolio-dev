import type { Locale } from "./config"

// Nested, namespaced translation messages.
// Proper nouns, tech names, and the name "Nathan Santos" are intentionally
// NOT translated. pt-BR is natural, professional Brazilian Portuguese.
export const messages: Record<Locale, Record<string, unknown>> = {
  en: {
    common: {
      nav: {
        home: "Home",
        about: "About",
        expertise: "Expertise",
        projects: "Projects",
        stack: "Stack",
        contact: "Contact",
      },
      availability: "Open to Full-Stack Engineer Roles",
      skipLink: "Skip to main content",
      backToTop: "Back to top",
      toggleTheme: "Toggle light/dark theme",
      openMenu: "Open navigation menu",
      scrollCue: "Scroll to explore",
      signOut: "Sign Out",
      viewAll: "View all",
      viewProject: "View project",
      viewDetails: "View details",
      moreAboutMe: "More about me",
      learnMore: "Learn more",
      status: {
        completed: "Completed",
        in_progress: "In Progress",
        planned: "Planned",
      },
    },
    hero: {
      role: "Full-Stack Software Engineer",
      tagline: "Full-Stack · TypeScript · NestJS · Next.js · PostgreSQL",
      description:
        "I build full-stack products, from the NestJS API up to the Next.js interface. Right now I'm shipping at OMD do Brasil and building my own SaaS on the side.",
      scrollToWork: "Scroll to selected work",
      socialLinks: "Social links",
    },
    work: {
      label: "Selected Work",
      headingLine1: "Selected",
      headingLine2: "Work",
      intro:
        "Products I've built and shipped, from SaaS platforms to internal infrastructure.",
      shipped: "Shipped",
      projectsCount: "{count} Projects",
    },
    about: {
      label: "About",
      heading:
        "I build full-stack SaaS platforms that solve real business problems.",
      paragraph1:
        "I work in the TypeScript ecosystem (Next.js, React, NestJS, Node.js, PostgreSQL), taking products from zero to production and caring about performance, clean architecture, and the developer experience along the way.",
      paragraph2:
        "I keep up with the newer parts of the stack and ship production code with Next.js, React 19, Tailwind, and Biome. I'll pick up a new tool early when it actually earns its place. Right now I'm open to full-stack roles where I own a feature from the API to the UI.",
      education: "Education & Certifications",
      moreAboutMe: "More about me",
      hoursSuffix: "hours",
    },
    aboutPage: {
      label: "About",
      heading: "About Me",
      intro:
        "I build full-stack SaaS in the TypeScript ecosystem, usually starting from the data model. Most of what I enjoy sits on the backend: access control that lives in the database, invariants the schema can enforce on its own, and migrations you can replay.",
      education: "Education",
      certifications: "Courses & Certifications",
      experience: "Professional Experience",
      hobbies: "Hobbies & Interests",
      more: "More About Me",
    },
    expertise: {
      label: "Expertise",
      statement:
        "End-to-end product engineering, from system design to the finished UI.",
      items: [
        {
          title: "Full-Stack Product Engineering",
          description:
            "I build and ship complete SaaS products, from the database schema to the polished UI, using the Next.js App Router, Server Actions, and edge-first deploys.",
        },
        {
          title: "API Design & Backend Architecture",
          description:
            "Built REST APIs with Node.js, NestJS, and Hono. I isolate tenants with Row Level Security in Postgres, applied per request, instead of trusting every query to remember the filter.",
        },
        {
          title: "Performance & DX Optimization",
          description:
            "Built performance-first frontends with React Server Components, Turbopack, and code-splitting. Cut build times and improved time-to-interactive through profiling and disciplined tooling.",
        },
      ],
    },
    stack: {
      label: "Tech Stack",
      heading:
        "The tools I reach for to design, build, and ship production products.",
      description:
        "The core technologies I reach for to design, build, and ship production products. Highlighted tools are the ones I use every day.",
      highlightNote: "Highlighted items are the ones I use every day.",
      categories: {
        Frontend: "Frontend",
        "Backend & Infra": "Backend & Infra",
        Tooling: "Tooling",
      },
    },
    contact: {
      label: "Contact",
      headingLine1: "Let's build",
      headingLine2: "something",
      intro:
        "Working on something, have an idea, or just want to talk about engineering? Reach out through any channel below, or send a message here.",
      location: "Sertãozinho, SP, Brazil",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your name",
        emailLabel: "Email",
        emailPlaceholder: "your@email.com",
        messageLabel: "Message",
        messagePlaceholder: "Tell me about your project or idea…",
        submit: "Send message",
        success: "Message sent successfully!",
        error: "Failed to send message",
      },
    },
    projects: {
      label: "Selected Work",
      heading: "Products I've built and shipped.",
      intro:
        "Products I've designed, built, and shipped, from SaaS platforms to internal tooling. Open any one to see how it came together.",
      projectsCount: "{count} Projects",
      shipped: "Shipped",
      viewDetails: "View details",
    },
    projectDetail: {
      backToProjects: "Back to projects",
      visitProject: "Visit project",
      shipped: "Shipped",
      description: "Description",
      features: "Features",
      challenges: "Challenges",
      learnings: "Learnings",
    },
    signin: {
      heading: "Sign in",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Your password",
      submit: "Sign in",
      invalidCredentials: "Invalid email or password",
    },
    notFound: {
      title: "404",
      copy: "This page got lost in the aurora. The path you're looking for doesn't exist here.",
      returnHome: "Return home",
    },
    footer: {
      rights: "© {year} Nathan Santos. All rights reserved.",
    },
  },
  "pt-BR": {
    common: {
      nav: {
        home: "Início",
        about: "Sobre",
        expertise: "Especialidades",
        projects: "Projetos",
        stack: "Stack",
        contact: "Contato",
      },
      availability: "Aberto a vagas de Engenheiro Full-Stack",
      skipLink: "Ir ao conteúdo principal",
      backToTop: "Voltar ao topo",
      toggleTheme: "Alternar tema claro/escuro",
      openMenu: "Abrir menu de navegação",
      scrollCue: "Role para explorar",
      signOut: "Sair",
      viewAll: "Ver todos",
      viewProject: "Ver projeto",
      viewDetails: "Ver detalhes",
      moreAboutMe: "Mais sobre mim",
      learnMore: "Saiba mais",
      status: {
        completed: "Concluído",
        in_progress: "Em andamento",
        planned: "Planejado",
      },
    },
    hero: {
      role: "Engenheiro de Software Full-Stack",
      tagline: "Full-Stack · TypeScript · NestJS · Next.js · PostgreSQL",
      description:
        "Construo produtos full-stack, da API em NestJS até a interface em Next.js. No momento estou entregando na OMD do Brasil e tocando meus próprios SaaS nas horas vagas.",
      scrollToWork: "Rolar para os trabalhos selecionados",
      socialLinks: "Redes sociais",
    },
    work: {
      label: "Trabalhos Selecionados",
      headingLine1: "Trabalhos",
      headingLine2: "Selecionados",
      intro:
        "Produtos que construí e coloquei em produção, de plataformas SaaS a ferramentas internas de infraestrutura.",
      shipped: "Em produção",
      projectsCount: "{count} Projetos",
    },
    about: {
      label: "Sobre",
      heading:
        "Construo plataformas SaaS full-stack que resolvem problemas reais de negócio.",
      paragraph1:
        "Trabalho no ecossistema TypeScript (Next.js, React, NestJS, Node.js, PostgreSQL), levando produtos do zero à produção e cuidando de performance, arquitetura limpa e experiência do desenvolvedor no caminho.",
      paragraph2:
        "Acompanho de perto as partes mais novas da stack e coloco código em produção com Next.js, React 19, Tailwind e Biome. Adoto uma ferramenta nova cedo quando ela realmente prova seu valor. No momento estou aberto a vagas full-stack em que eu cuide da feature da API até a UI.",
      education: "Formação e Certificações",
      moreAboutMe: "Mais sobre mim",
      hoursSuffix: "horas",
    },
    aboutPage: {
      label: "Sobre",
      heading: "Sobre mim",
      intro:
        "Construo SaaS full-stack no ecossistema TypeScript, quase sempre começando pelo modelo de dados. A parte que mais gosto fica no backend: controle de acesso que mora no banco, invariantes que o schema garante sozinho, e migrations que dá pra rodar de novo.",
      education: "Formação",
      certifications: "Cursos e certificações",
      experience: "Experiência profissional",
      hobbies: "Hobbies e interesses",
      more: "Mais sobre mim",
    },
    expertise: {
      label: "Especialidades",
      statement:
        "Engenharia de produto de ponta a ponta, do design do sistema à interface final.",
      items: [
        {
          title: "Engenharia de Produto Full-Stack",
          description:
            "Construo e entrego produtos SaaS completos, do schema do banco de dados à UI refinada, usando o App Router do Next.js, Server Actions e deploys edge-first.",
        },
        {
          title: "Design de APIs e Arquitetura de Backend",
          description:
            "Construí APIs REST com Node.js, NestJS e Hono. Isolo tenants com Row Level Security no Postgres, aplicado por requisição, em vez de confiar que toda query lembrou do filtro.",
        },
        {
          title: "Otimização de Performance e DX",
          description:
            "Construí frontends com foco em performance usando React Server Components, Turbopack e code-splitting. Reduzi tempos de build e melhorei o time-to-interactive por meio de profiling e ferramentas disciplinadas.",
        },
      ],
    },
    stack: {
      label: "Tech Stack",
      heading:
        "As ferramentas que uso para projetar, construir e entregar produtos em produção.",
      description:
        "As principais tecnologias que uso para projetar, construir e entregar produtos em produção. As ferramentas em destaque são as que uso todos os dias.",
      highlightNote: "Os itens em destaque são os que uso todos os dias.",
      categories: {
        Frontend: "Frontend",
        "Backend & Infra": "Backend e Infra",
        Tooling: "Ferramentas",
      },
    },
    contact: {
      label: "Contato",
      headingLine1: "Vamos construir",
      headingLine2: "algo juntos",
      intro:
        "Está tocando algum projeto, tem uma ideia ou só quer trocar uma ideia sobre engenharia? Fale comigo por qualquer canal abaixo, ou mande uma mensagem por aqui.",
      location: "Sertãozinho, SP, Brasil",
      form: {
        nameLabel: "Nome",
        namePlaceholder: "Seu nome",
        emailLabel: "Email",
        emailPlaceholder: "seu@email.com",
        messageLabel: "Mensagem",
        messagePlaceholder: "Conte-me sobre seu projeto ou ideia…",
        submit: "Enviar mensagem",
        success: "Mensagem enviada com sucesso!",
        error: "Falha ao enviar a mensagem",
      },
    },
    projects: {
      label: "Trabalhos Selecionados",
      heading: "Produtos que construí e coloquei em produção.",
      intro:
        "Produtos que projetei, construí e coloquei em produção, de plataformas SaaS a ferramentas internas. Abra qualquer um para ver como foi feito.",
      projectsCount: "{count} Projetos",
      shipped: "Em produção",
      viewDetails: "Ver detalhes",
    },
    projectDetail: {
      backToProjects: "Voltar aos projetos",
      visitProject: "Acessar projeto",
      shipped: "Em produção",
      description: "Descrição",
      features: "Funcionalidades",
      challenges: "Desafios",
      learnings: "Aprendizados",
    },
    signin: {
      heading: "Entrar",
      emailLabel: "Email",
      emailPlaceholder: "seu@email.com",
      passwordLabel: "Senha",
      passwordPlaceholder: "Sua senha",
      submit: "Entrar",
      invalidCredentials: "Email ou senha inválidos",
    },
    notFound: {
      title: "404",
      copy: "Esta página se perdeu na aurora. O caminho que você procura não existe por aqui.",
      returnHome: "Voltar para o início",
    },
    footer: {
      rights: "© {year} Nathan Santos. Todos os direitos reservados.",
    },
  },
}
