export interface SeoRoadmapStepDefinition {
  id: number
  slug: string
  side: 'left' | 'right'
  phase: {
    en: string
    fr: string
  }
  title: {
    en: string
    fr: string
  }
  points: {
    en: string[]
    fr: string[]
  }
}

export const seoRoadmapSteps: SeoRoadmapStepDefinition[] = [
  {
    id: 1,
    slug: "basics-of-seo",
    side: "left" as 'left' | 'right',
    phase: { en: "Foundations", fr: "Fondations" },
    title: { en: "Basics of SEO", fr: "Bases du SEO" },
    points: { en: ["What SEO is and why it matters","Organic vs paid visibility","Core ranking principles"], fr: ["Ce qu est le SEO et pourquoi il compte","Visibilité organique vs payante","Principes generaux de classement"] }
  },
  {
    id: 2,
    slug: "role-of-seo",
    side: "right" as 'left' | 'right',
    phase: { en: "Foundations", fr: "Fondations" },
    title: { en: "Role of SEO", fr: "Rôle du SEO" },
    points: { en: ["SEO in product growth","Acquisition and retention impact","Long-term compounding effects"], fr: ["SEO dans la croissance produit","Impact sur acquisition et retention","Effets cumulatifs à long terme"] }
  },
  {
    id: 3,
    slug: "keyword-research-in-seo",
    side: "left" as 'left' | 'right',
    phase: { en: "Foundations", fr: "Fondations" },
    title: { en: "Keyword Research in SEO", fr: "Recherche de mots-clés en SEO" },
    points: { en: ["Search intent mapping","Topic clustering","Keyword prioritization"], fr: ["Cartographier l'intention de recherche","Organiser les sujets en clusters","Prioriser les mots-clés"] }
  },
  {
    id: 4,
    slug: "understanding-how-search-engine-algorithms-work",
    side: "right" as 'left' | 'right',
    phase: { en: "Foundations", fr: "Fondations" },
    title: { en: "How Search Algorithms Work", fr: "Comprendre le fonctionnement des algorithmes de recherche" },
    points: { en: ["Crawling and indexing basics","Ranking signals overview","Why relevance and authority matter"], fr: ["Bases du crawl et de l'indexation","Vue d ensemble des signaux de classement","Pourquoi la pertinence et l autorite comptent"] }
  },
  {
    id: 5,
    slug: "choosing-your-domain-name-for-seo",
    side: "left" as 'left' | 'right',
    phase: { en: "Foundations", fr: "Fondations" },
    title: { en: "Choosing a Domain for SEO", fr: "Choisir un nom de domaine pour le SEO" },
    points: { en: ["Brandability and trust","Domain history checks","Long-term naming strategy"], fr: ["Memorisation et confiance","Verifier l historique du domaine","Penser au long terme"] }
  },
  {
    id: 6,
    slug: "how-to-structure-a-website-for-better-seo",
    side: "right" as 'left' | 'right',
    phase: { en: "Site Architecture", fr: "Architecture du site" },
    title: { en: "Structure Your Website and URLs for SEO", fr: "Structurer son site et ses URLs pour le SEO" },
    points: { en: ["Clear hierarchy","Internal linking strategy","Stable URL conventions"], fr: ["Hiérarchie claire","Stratégie de maillage interne","Conventions d URL stables"] }
  },
  {
    id: 7,
    slug: "mobile-seo",
    side: "left" as 'left' | 'right',
    phase: { en: "Technical SEO", fr: "SEO technique" },
    title: { en: "Mobile SEO", fr: "SEO mobile" },
    points: { en: ["Mobile-first indexing","Responsive UX","Touch-friendly navigation"], fr: ["Indexation mobile-first","UX responsive","Navigation adaptee au tactile"] }
  },
  {
    id: 8,
    slug: "what-is-robots-txt",
    side: "right" as 'left' | 'right',
    phase: { en: "Technical SEO", fr: "SEO technique" },
    title: { en: "Robots.txt Fundamentals", fr: "Fondamentaux du robots.txt" },
    points: { en: ["Control crawler access","Avoid accidental blocking","Validate directives"], fr: ["Controler l acces des robots","Eviter les blocages accidentels","Verifier les directives"] }
  },
  {
    id: 9,
    slug: "introduction-to-xml-sitemap",
    side: "left" as 'left' | 'right',
    phase: { en: "Technical SEO", fr: "SEO technique" },
    title: { en: "XML Sitemap Setup", fr: "Mise en place d'un sitemap XML" },
    points: { en: ["Expose important URLs","Handle canonical pages","Submit and monitor"], fr: ["Exposer les URLs importantes","Ne garder que les pages canoniques","Soumettre et surveiller"] }
  },
  {
    id: 10,
    slug: "site-speed-optimization",
    side: "right" as 'left' | 'right',
    phase: { en: "Technical SEO", fr: "SEO technique" },
    title: { en: "Site Speed Optimization", fr: "Optimisation de la vitesse du site" },
    points: { en: ["Core Web Vitals basics","Rendering and asset optimization","Performance budget mindset"], fr: ["Bases des Core Web Vitals","Optimisation du rendu et des assets","Culture budget performance"] }
  },
  {
    id: 11,
    slug: "multilanguage-seo",
    side: "left" as 'left' | 'right',
    phase: { en: "International SEO", fr: "SEO international" },
    title: { en: "Multi-language SEO", fr: "SEO multilingue" },
    points: { en: ["Language targeting strategy","Locale-aware architecture","Regional content consistency"], fr: ["Stratégie de ciblage linguistique","Architecture adaptee aux locales","Cohherence du contenu par region"] }
  },
  {
    id: 12,
    slug: "meta-tags",
    side: "right" as 'left' | 'right',
    phase: { en: "On-Page SEO", fr: "SEO on-page" },
    title: { en: "Meta Tags", fr: "Balises méta" },
    points: { en: ["Meta descriptions and robots directives","Snippet quality","What helps SEO and what does not"], fr: ["Meta descriptions et directives robots","Qualité de l extrait dans les SERP","Ce qui aide le SEO et ce qui ne change rien"] }
  },
  {
    id: 13,
    slug: "understanding-heading-tags-in-seo",
    side: "left" as 'left' | 'right',
    phase: { en: "On-Page SEO", fr: "SEO on-page" },
    title: { en: "Heading Tags and Content Hierarchy", fr: "Titres Hn et hiérarchie du contenu" },
    points: { en: ["H1/H2/H3 semantics","Readable structure","Keyword placement with intent"], fr: ["Semantique des H1 H2 H3","Structure lisible","Placement des mots-clés avec intention"] }
  },
  {
    id: 14,
    slug: "title-tag-a-key-element-in-seo",
    side: "right" as 'left' | 'right',
    phase: { en: "On-Page SEO", fr: "SEO on-page" },
    title: { en: "Title Tag Optimization", fr: "Optimisation de la balise title" },
    points: { en: ["Title clarity","SERP CTR impact","Brand and keyword balance"], fr: ["Clarte du title","Impact sur le taux de clic dans les SERP","Equilibre marque et mot-cle"] }
  },
  {
    id: 15,
    slug: "understanding-the-noindex-meta-tag-in-seo",
    side: "left" as 'left' | 'right',
    phase: { en: "On-Page SEO", fr: "SEO on-page" },
    title: { en: "Noindex Strategy", fr: "Stratégie noindex" },
    points: { en: ["When to hide pages","Avoid index bloat","Audit noindex usage"], fr: ["Quand masquer une page","Eviter la pollution de l'index","Auditer l'usage du noindex"] }
  },
  {
    id: 16,
    slug: "keyword-usage-and-placement",
    side: "right" as 'left' | 'right',
    phase: { en: "On-Page SEO", fr: "SEO on-page" },
    title: { en: "Keyword Usage and Placement", fr: "Usage et placement des mots-clés" },
    points: { en: ["Match query intent","Avoid stuffing","Place terms naturally in strategic sections"], fr: ["Correspondre à l'intention de recherche","Eviter le bourrage","Placer les termes naturellement aux bons endroits"] }
  },
  {
    id: 17,
    slug: "content-quality",
    side: "left" as 'left' | 'right',
    phase: { en: "On-Page SEO", fr: "SEO on-page" },
    title: { en: "Content Quality", fr: "Qualité du contenu" },
    points: { en: ["Depth and clarity","Unique value per page","Content freshness strategy"], fr: ["Profondeur et clarte","Valeur unique par page","Stratégie de fraicheur du contenu"] }
  },
  {
    id: 18,
    slug: "internal-linking",
    side: "right" as 'left' | 'right',
    phase: { en: "On-Page SEO", fr: "SEO on-page" },
    title: { en: "Internal Linking", fr: "Maillage interne" },
    points: { en: ["Contextual anchors","Topical relevance","Crawl depth control"], fr: ["Ancres contextuelles","Pertinence thematique","Controle de la profondeur de crawl"] }
  },
  {
    id: 19,
    slug: "image-optimization-for-seo",
    side: "left" as 'left' | 'right',
    phase: { en: "Media SEO", fr: "SEO media" },
    title: { en: "Image Optimization", fr: "Optimisation des images" },
    points: { en: ["Compression and formats","Alt text quality","Performance impact"], fr: ["Compression et formats","Qualité du texte alternatif","Impact sur la performance"] }
  },
  {
    id: 20,
    slug: "understanding-hrefang-tags-and-their-importance-in-seo",
    side: "right" as 'left' | 'right',
    phase: { en: "International SEO", fr: "SEO international" },
    title: { en: "Hreflang Tags", fr: "Balises hreflang" },
    points: { en: ["Language targeting","Regional variants","Avoid duplicate language conflicts"], fr: ["Ciblage linguistique","Variantes regionales","Eviter les conflits entre versions linguistiques"] }
  },
  {
    id: 21,
    slug: "open-graph-and-social-metadata",
    side: "left" as 'left' | 'right',
    phase: { en: "On-Page SEO", fr: "SEO on-page" },
    title: { en: "Open Graph and Social Metadata", fr: "Open Graph et métadonnées sociales" },
    points: { en: ["Control social previews","Consistent brand snippets","Improve share CTR"], fr: ["Controler les aperçus sociaux","Uniformiser les extraits de marque","Ameliorer le CTR des partages"] }
  },
  {
    id: 22,
    slug: "duplicate-content",
    side: "right" as 'left' | 'right',
    phase: { en: "On-Page SEO", fr: "SEO on-page" },
    title: { en: "Duplicate Content", fr: "Contenu duplique" },
    points: { en: ["Canonical strategy","Prevent URL variant duplication","Consolidate ranking signals"], fr: ["Stratégie canonique","Eviter les doublons d URL","Consolider les signaux de classement"] }
  },
  {
    id: 23,
    slug: "understanding-backlinks-and-their-importance-in-seo",
    side: "left" as 'left' | 'right',
    phase: { en: "Authority", fr: "Autorite" },
    title: { en: "Backlinks and Link Signals", fr: "Backlinks et signaux de liens" },
    points: { en: ["Link quality over quantity","Natural acquisition","Anchor profile awareness"], fr: ["Qualité des liens avant quantite","Acquisition naturelle","Attention au profil d ancres"] }
  },
  {
    id: 24,
    slug: "social-signals",
    side: "right" as 'left' | 'right',
    phase: { en: "Off-Page SEO", fr: "SEO off-page" },
    title: { en: "Social Signals", fr: "Signaux sociaux" },
    points: { en: ["Amplify content reach","Engagement-driven discovery","Brand trust reinforcement"], fr: ["Amplifier la portee du contenu","Découverte via l engagement","Renforcer la confiance dans la marque"] }
  },
  {
    id: 25,
    slug: "brand-mentions",
    side: "left" as 'left' | 'right',
    phase: { en: "Off-Page SEO", fr: "SEO off-page" },
    title: { en: "Brand Mentions", fr: "Mentions de marque" },
    points: { en: ["Track linked and unlinked mentions","Authority correlation","Digital PR opportunities"], fr: ["Suivre les mentions liees et non liees","Lien avec l autorite percue","Opportunites de RP digitales"] }
  },
  {
    id: 26,
    slug: "guest-blogging",
    side: "right" as 'left' | 'right',
    phase: { en: "Off-Page SEO", fr: "SEO off-page" },
    title: { en: "Guest Blogging", fr: "Guest blogging" },
    points: { en: ["Editorial placement quality","Topical relevance","Avoid low-quality link schemes"], fr: ["Qualité des publications editoriales","Pertinence thematique","Eviter les schemas de liens de faible qualité"] }
  },
  {
    id: 27,
    slug: "content-marketing",
    side: "left" as 'left' | 'right',
    phase: { en: "Off-Page SEO", fr: "SEO off-page" },
    title: { en: "Content Marketing", fr: "Content marketing" },
    points: { en: ["Content distribution loops","Lead magnet strategy","Evergreen assets"], fr: ["Bouclés de distribution de contenu","Stratégie de lead magnets","Actifs evergreen"] }
  },
  {
    id: 28,
    slug: "structured-data-markup-enhancing-seo-and-search-visibility",
    side: "right" as 'left' | 'right',
    phase: { en: "Entity and Rich Results", fr: "Entites et resultats enrichis" },
    title: { en: "Structured Data Markup", fr: "Balisage des données structurees" },
    points: { en: ["Schema.org basics","Rich results eligibility","Validation and monitoring"], fr: ["Bases de Schema.org","Eligibilite aux resultats enrichis","Validation et suivi"] }
  },
  {
    id: 29,
    slug: "google-search-console",
    side: "left" as 'left' | 'right',
    phase: { en: "SEO Analytics and Reporting", fr: "Analyse SEO et reporting" },
    title: { en: "Google Search Console", fr: "Google Search Console" },
    points: { en: ["Coverage and indexing checks","Query and page performance","Technical issue alerts"], fr: ["Controle de la couverture et de l'indexation","Performance des requêtes et des pages","Alertes techniques"] }
  },
  {
    id: 30,
    slug: "traffic-analysis",
    side: "right" as 'left' | 'right',
    phase: { en: "SEO Analytics and Reporting", fr: "Analyse SEO et reporting" },
    title: { en: "Traffic Analysis", fr: "Analyse du trafic" },
    points: { en: ["Landing page performance","Engagement and conversion reading","Trend and seasonality analysis"], fr: ["Performance des landing pages","Lecture de l engagement et des conversions","Analyse des tendances et de la saisonnalite"] }
  },
  {
    id: 31,
    slug: "pagespeed-insights",
    side: "left" as 'left' | 'right',
    phase: { en: "SEO Tools", fr: "Outils SEO" },
    title: { en: "PageSpeed Insights", fr: "PageSpeed Insights" },
    points: { en: ["CWV diagnostics","Performance opportunities","Template-level optimization"], fr: ["Diagnostic des Core Web Vitals","Opportunites d optimisation","Optimisation au niveau des templates"] }
  },
  {
    id: 32,
    slug: "google-keyword-planner",
    side: "right" as 'left' | 'right',
    phase: { en: "SEO Tools", fr: "Outils SEO" },
    title: { en: "Google Keyword Planner", fr: "Google Keyword Planner" },
    points: { en: ["Search volume validation","Topic expansion ideas","Intent-informed planning"], fr: ["Verifier les volumes de recherche","Trouver des idees d extension","Planifier avec l'intention de recherche"] }
  }
]

export const normalizeSeoRoadmapPath = (value: string) => {
  if (value.startsWith('/seo/')) {
    return value
  }

  if (value.startsWith('/roadmaps/seo/')) {
    return value.replace('/roadmaps/seo/', '/seo/')
  }

  if (value.startsWith('/roadmaps-fr/seo/')) {
    return value.replace('/roadmaps-fr/seo/', '/seo/')
  }

  return value
}

export const seoRoadmapPathOrder = seoRoadmapSteps.map((step) => `/seo/${step.slug}`)

export const sortSeoRoadmapItems = <T extends { path: string }>(items: T[]) => {
  const order = new Map(seoRoadmapPathOrder.map((path, index) => [path, index]))

  return [...items].sort((a, b) => {
    const left = order.get(normalizeSeoRoadmapPath(a.path)) ?? Number.MAX_SAFE_INTEGER
    const right = order.get(normalizeSeoRoadmapPath(b.path)) ?? Number.MAX_SAFE_INTEGER
    return left - right
  })
}
