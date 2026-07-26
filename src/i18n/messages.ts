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
      role: "Product Engineer",
      tagline: "Product Engineer · TypeScript · Next.js · Supabase",
      description:
        "I build full-stack products end-to-end — from NestJS APIs to Next.js interfaces. Currently shipping at OMD do Brasil and building SaaS products on the side.",
      scrollToWork: "Scroll to selected work",
      socialLinks: "Social links",
    },
    work: {
      label: "Selected Work",
      headingLine1: "Selected",
      headingLine2: "Work",
      intro:
        "Products I've architected and shipped — from SaaS platforms to infrastructure tooling. Scroll to explore.",
      shipped: "Shipped",
      projectsCount: "{count} Projects",
    },
    about: {
      label: "About",
      heading:
        "Product Engineer architecting full-stack SaaS platforms that solve real business problems.",
      paragraph1:
        "I specialize in the TypeScript ecosystem (Next.js, React, Node.js, Supabase), building products from zero to production with a focus on performance, clean architecture, and developer experience.",
      paragraph2:
        "I stay close to the frontier of the stack — shipping production code with Next.js, React 19, Tailwind, and Biome, and adopting new tools early when they earn their place. Currently open to full-stack roles where I can own features from API to UI.",
      education: "Education & Certifications",
      moreAboutMe: "More about me",
      hoursSuffix: "hours",
    },
    expertise: {
      label: "Expertise",
      statement:
        "End-to-end product engineering — from system design to shipped pixels.",
      items: [
        {
          title: "Full-Stack Product Engineering",
          description:
            "I architect and ship complete SaaS products from database schema to polished UI, leveraging Next.js App Router, Server Actions, and edge-first deployment strategies.",
        },
        {
          title: "API Design & Backend Architecture",
          description:
            "Engineered scalable REST and GraphQL APIs with Node.js, NestJS, and Hono. Deep experience with Supabase real-time, Row-Level Security, and multi-tenant data isolation.",
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
        "Interested in working together, have a project idea, or just want to talk about engineering? Reach out through any channel below or send a message.",
      location: "Sertãozinho, SP — Brazil",
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
      heading: "Products I've architected & shipped.",
      intro:
        "A collection of products I've designed, built, and shipped — from SaaS platforms to infrastructure tooling. Explore the details behind each one.",
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
      role: "Product Engineer",
      tagline: "Product Engineer · TypeScript · Next.js · Supabase",
      description:
        "Construo produtos full-stack de ponta a ponta — de APIs em NestJS a interfaces em Next.js. Atualmente entregando na OMD do Brasil e desenvolvendo produtos SaaS paralelamente.",
      scrollToWork: "Rolar para os trabalhos selecionados",
      socialLinks: "Redes sociais",
    },
    work: {
      label: "Trabalhos Selecionados",
      headingLine1: "Trabalhos",
      headingLine2: "Selecionados",
      intro:
        "Produtos que arquitetei e coloquei em produção — de plataformas SaaS a ferramentas de infraestrutura. Role para explorar.",
      shipped: "Em produção",
      projectsCount: "{count} Projetos",
    },
    about: {
      label: "Sobre",
      heading:
        "Product Engineer arquitetando plataformas SaaS full-stack que resolvem problemas reais de negócio.",
      paragraph1:
        "Sou especializado no ecossistema TypeScript (Next.js, React, Node.js, Supabase), construindo produtos do zero à produção com foco em performance, arquitetura limpa e experiência do desenvolvedor.",
      paragraph2:
        "Mantenho-me na fronteira da stack — entregando código em produção com Next.js, React 19, Tailwind e Biome, e adotando novas ferramentas cedo quando elas conquistam seu espaço. Atualmente aberto a vagas full-stack onde eu possa cuidar das features da API à UI.",
      education: "Formação e Certificações",
      moreAboutMe: "Mais sobre mim",
      hoursSuffix: "horas",
    },
    expertise: {
      label: "Especialidades",
      statement:
        "Engenharia de produto de ponta a ponta — do design de sistema aos pixels em produção.",
      items: [
        {
          title: "Engenharia de Produto Full-Stack",
          description:
            "Arquiteto e entrego produtos SaaS completos, do schema do banco de dados à UI refinada, aproveitando o App Router do Next.js, Server Actions e estratégias de deploy edge-first.",
        },
        {
          title: "Design de APIs e Arquitetura de Backend",
          description:
            "Desenvolvi APIs REST e GraphQL escaláveis com Node.js, NestJS e Hono. Ampla experiência com Supabase real-time, Row-Level Security e isolamento de dados multi-tenant.",
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
        "Tem interesse em trabalhar comigo, uma ideia de projeto ou só quer conversar sobre engenharia? Fale comigo por qualquer canal abaixo ou envie uma mensagem.",
      location: "Sertãozinho, SP — Brasil",
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
      heading: "Produtos que arquitetei e coloquei em produção.",
      intro:
        "Uma coleção de produtos que projetei, construí e coloquei em produção — de plataformas SaaS a ferramentas de infraestrutura. Explore os detalhes por trás de cada um.",
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
