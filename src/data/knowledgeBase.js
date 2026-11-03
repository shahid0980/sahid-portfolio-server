// This is the chatbot's source of truth. Update this file as your portfolio grows.
// Do not add private information that should not be visible to website visitors.

const knowledgeBase = {
  personal: {
    name: "Sahid Khan",
    dateOfBirth: "14-july-2002",
    today: new Date().toISOString().split("T")[0],
    headline: "Developer and technology enthusiast",
    location: "Dubai, UAE",
    education: "passed Bachelor in Computer Applications (BCA), NIIS Institute of Information Science & Management, Utkal University, Odisha, India,  2022–2025",
    email: "shahdk827@gmail.com",
    github: "https://github.com/shahid0980",
    linkedin: "https://www.linkedin.com/in/sahid-khan-073157157/"
  },
  professionalSummary:
    "Sahid builds modern web and mobile applications and has experience across frontend development, backend development, databases, deployment, SEO, and data reporting.",
  skills: {
    frontend: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "SASS", "Tailwind CSS", "Material UI", "Bootstrap", "Framer Motion", "Responsive Design"],
    mobile: ["React Native", "Expo", "Expo Router", "React Navigation"],
    backend: ["Node.js", "Express.js", "REST API Design", "Serverless Functions", "Authentication", "Postman"],
    databases: ["PostgreSQL", "Prisma ORM", "MongoDB", "MySQL", "SQL Query Optimization"],
    aiAssistedDevelopment: ["AI coding assistants and LLM tools", "Prompt engineering", "AI-powered code generation", "Refactoring", "Debugging", "Unit test generation", "Documentation", "Code review and output validation"],
    devopsAndTools: ["Git", "GitHub", "GitHub Actions", "CI/CD", "Vercel", "Netlify", "Render", "DigitalOcean", "Vite", "Webpack", "npm", "yarn"],
    seoAndPerformance: ["Technical SEO", "Google Search Console", "Core Web Vitals optimization", "Domain and hosting management"],
    dataAndReporting: ["Python", "Pandas", "NumPy", "Excel", "Pivot Tables", "XLOOKUP", "VBA", "Power BI"]
  },
  experience: [
    {
      title: "Freelance Full Stack Developer",
      organization: "Independent",
      arrangement: "Remote and client-based",
      highlights: [
        "Designed, developed, and deployed full-stack web applications using React, Next.js, TypeScript, Node.js/Express, and PostgreSQL/MongoDB.",
        "Built and launched fihorizon.in, a multi-page platform for a real estate and construction firm, including Home, About, Blog, and Contact pages.",
        "Implemented technical SEO and performance optimization.",
        "Created responsive, animated interfaces with Tailwind CSS and Framer Motion.",
        "Used AI-assisted development for code generation, debugging, testing, and documentation, with manual review of generated code.",
        "Managed hosting, domain configuration, professional email setup, and Git/GitHub version control."
      ]
    },
    {
      title: "Technical & Operations Support (Business Development)",
      organization: "Fi Horizon Pvt. Ltd.",
      duration: "July 2025 – July 2026",
      highlights: [
        "Maintained daily data and reporting workflows.",
        "Queried and managed structured data in SQL for business and investor reporting.",
        "Automated recurring data preparation with Python and Excel.",
        "Built Power BI and Excel dashboards for performance metrics.",
        "Resolved data and reporting issues raised by cross-functional teams."
      ]
    }
  ],
  projects: [
    {
      name: "Fi Horizon: Real Estate & Construction Platform",
      description: "A live multi-page business website with a blog, contact module, and custom domain.",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "SEO"],
      url: "https://fihorizon.in"
    },
    // {
    //   name: "Coffee Cafe App: Mobile Ordering System",
    //   description: "A cross-platform mobile app for browsing a menu and placing orders.",
    //   technologies: ["React Native", "Expo", "Expo Router"]
    // },
    {
      name: "GitHub Portfolio",
      description: "Source code and project repositories.",
      url: "https://github.com/shahid0980"
    }
  ],
  certification: "IBM Data Analytics Professional Certificate, Coursera (in progress)",
  languages: ["English", "Hindi", "Odia", "Urdu"]
};

export default knowledgeBase;
