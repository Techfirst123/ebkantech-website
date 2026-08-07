import {
  Code2,
  Cloud,
  BarChart3,
  BrainCircuit,
  MessagesSquare,
  Building2,
  Users,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
  heroPoints: string[];
  capabilities: { title: string; description: string }[];
  process: { title: string; description: string }[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    short: "Fast, scalable web platforms",
    description:
      "Custom web applications and marketing sites engineered for performance, accessibility, and growth — from first sprint to enterprise scale.",
    icon: Code2,
    heroPoints: [
      "Modern frontend architecture (React, Next.js)",
      "Headless CMS & API-first builds",
      "Performance and Core Web Vitals tuning",
    ],
    capabilities: [
      { title: "Product engineering", description: "Full-stack builds using modern, maintainable frameworks tailored to your roadmap." },
      { title: "Design systems", description: "Reusable component libraries that keep your brand consistent as you scale." },
      { title: "API & integrations", description: "Secure REST/GraphQL APIs that connect your web app to internal and third-party systems." },
      { title: "Performance engineering", description: "Sub-second load times, optimized Core Web Vitals, and accessibility built in from day one." },
    ],
    process: [
      { title: "Discover", description: "Align on goals, users, and technical constraints." },
      { title: "Design", description: "Wireframes and UI systems validated with stakeholders." },
      { title: "Build", description: "Agile sprints with continuous demos and QA." },
      { title: "Launch & scale", description: "Deployment, monitoring, and iterative improvement." },
    ],
  },
  {
    slug: "devops-cloud-engineering",
    name: "DevOps & Cloud Engineering",
    short: "Reliable infrastructure at scale",
    description:
      "Cloud architecture, CI/CD pipelines, and infrastructure automation that keep your systems fast, secure, and resilient as you grow.",
    icon: Cloud,
    heroPoints: [
      "AWS, Azure & GCP architecture",
      "CI/CD pipeline automation",
      "Infrastructure as Code & observability",
    ],
    capabilities: [
      { title: "Cloud architecture", description: "Right-sized, secure infrastructure designed for cost efficiency and uptime." },
      { title: "CI/CD automation", description: "Automated build, test, and deploy pipelines that ship safely, faster." },
      { title: "Infrastructure as Code", description: "Version-controlled, repeatable environments using Terraform and similar tooling." },
      { title: "Monitoring & observability", description: "Full-stack visibility with alerting that catches issues before customers do." },
    ],
    process: [
      { title: "Assess", description: "Audit current infrastructure, costs, and reliability gaps." },
      { title: "Design", description: "Blueprint a cloud architecture matched to your scale and budget." },
      { title: "Automate", description: "Stand up IaC, pipelines, and guardrails." },
      { title: "Operate", description: "Ongoing monitoring, optimization, and incident support." },
    ],
  },
  {
    slug: "data-analytics-bi",
    name: "Data Analytics & BI Reporting",
    short: "Decisions backed by data",
    description:
      "Turn scattered data into clear, actionable dashboards and reports that give your leadership team real-time visibility.",
    icon: BarChart3,
    heroPoints: [
      "Data warehousing & pipelines",
      "Executive dashboards & BI reporting",
      "Automated, scheduled reporting",
    ],
    capabilities: [
      { title: "Data pipelines", description: "Reliable ETL/ELT pipelines that consolidate data from every source you rely on." },
      { title: "BI dashboards", description: "Interactive dashboards that give teams self-serve access to the metrics that matter." },
      { title: "Automated reporting", description: "Scheduled reports delivered to stakeholders without manual spreadsheet work." },
      { title: "Data governance", description: "Clean, trustworthy data models with clear ownership and access controls." },
    ],
    process: [
      { title: "Audit", description: "Map existing data sources, quality issues, and reporting gaps." },
      { title: "Model", description: "Design a data warehouse and metrics layer built for your business." },
      { title: "Visualize", description: "Build dashboards tailored to each stakeholder group." },
      { title: "Automate", description: "Schedule pipelines and reports so insights stay current." },
    ],
  },
  {
    slug: "machine-learning-ai",
    name: "Machine Learning & AI Solutions",
    short: "Applied AI for real outcomes",
    description:
      "Custom ML models and AI systems — from predictive analytics to intelligent automation — built to solve specific business problems.",
    icon: BrainCircuit,
    heroPoints: [
      "Predictive analytics & forecasting",
      "Computer vision & document intelligence",
      "MLOps & model lifecycle management",
    ],
    capabilities: [
      { title: "Predictive analytics", description: "Forecasting models for demand, risk, and resource planning." },
      { title: "Document & vision AI", description: "Automate extraction and classification from documents, images, and site photos." },
      { title: "Recommendation systems", description: "Personalized recommendations that improve engagement and conversion." },
      { title: "MLOps", description: "Reliable pipelines for training, deploying, and monitoring models in production." },
    ],
    process: [
      { title: "Frame the problem", description: "Translate a business goal into a measurable ML problem." },
      { title: "Prototype", description: "Rapidly validate feasibility with real data." },
      { title: "Productionize", description: "Harden models and pipelines for live traffic." },
      { title: "Monitor & retrain", description: "Track drift and performance, retraining on a schedule." },
    ],
  },
  {
    slug: "ai-chatbot-virtual-assistant",
    name: "AI Chatbot & Virtual Assistant Development",
    short: "Conversational AI that works",
    description:
      "Custom AI chat assistants that handle support, sales, and internal workflows — embedded directly into your products and websites.",
    icon: MessagesSquare,
    heroPoints: [
      "LLM-powered conversational agents",
      "Embedded product & website assistants",
      "Workflow & CRM/ERP integrations",
    ],
    capabilities: [
      { title: "Conversational design", description: "Natural, on-brand conversation flows grounded in your knowledge base." },
      { title: "LLM integration", description: "Secure integration with leading language models, tuned to your domain." },
      { title: "Embedded assistants", description: "Chat assistants embedded directly in your product, portal, or website." },
      { title: "Workflow automation", description: "Assistants that can trigger actions across your CRM, ERP, and internal tools." },
    ],
    process: [
      { title: "Define scope", description: "Identify the highest-value conversations to automate." },
      { title: "Design & train", description: "Build flows and ground responses in your data." },
      { title: "Integrate", description: "Embed the assistant into your product or support stack." },
      { title: "Improve", description: "Monitor conversations and continuously refine accuracy." },
    ],
  },
];

export type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: LucideIcon;
  audience: string;
  features: { title: string; description: string }[];
  aiFeatures: string[];
};

export const products: Product[] = [
  {
    slug: "erp-construction-epc",
    name: "ERP for Construction & EPC",
    short: "End-to-end project & resource control",
    description:
      "A purpose-built ERP for construction and EPC firms — unifying project planning, procurement, site operations, and finance in one system.",
    icon: Building2,
    audience: "Construction, EPC & infrastructure contractors",
    features: [
      { title: "Project & budget control", description: "Track costs, schedules, and milestones across every active site." },
      { title: "Procurement & inventory", description: "Manage vendors, purchase orders, and material inventory in real time." },
      { title: "Site & workforce management", description: "Digitize daily site reporting, attendance, and equipment tracking." },
      { title: "Finance & billing", description: "Integrated invoicing, billing, and financial reporting for every project." },
    ],
    aiFeatures: [
      "Predictive cost & schedule overrun alerts",
      "AI chat assistant for instant project status queries",
      "Automated daily site report generation",
    ],
  },
  {
    slug: "crm-vendor-site-management",
    name: "CRM for Vendor & Site Management",
    short: "Every vendor and site relationship, organized",
    description:
      "A CRM designed for vendor onboarding, site coordination, and relationship management across multi-site operations.",
    icon: Users,
    audience: "Enterprises managing multiple vendors and sites",
    features: [
      { title: "Vendor onboarding & compliance", description: "Centralize vendor documents, approvals, and compliance tracking." },
      { title: "Site coordination", description: "Coordinate schedules, tasks, and communications across every active site." },
      { title: "Relationship & pipeline tracking", description: "Track vendor performance and site-level opportunities in one view." },
      { title: "Custom workflows", description: "Configure approval chains and workflows to match your operations." },
    ],
    aiFeatures: [
      "AI-scored vendor performance & risk ranking",
      "Embedded chat assistant for vendor and site queries",
      "Automated compliance and renewal reminders",
    ],
  },
  {
    slug: "ai-add-ons",
    name: "AI-Powered Add-ons",
    short: "AI capability across every product",
    description:
      "Modular AI add-ons — predictive analytics, embedded chat assistants, and automated reporting — that layer onto any Ebkan Tech product.",
    icon: Sparkles,
    audience: "Any team running ERP, CRM, or custom platforms",
    features: [
      { title: "Predictive analytics module", description: "Add forecasting and anomaly detection to your existing dashboards." },
      { title: "Embedded AI assistant", description: "Drop a trained chat assistant into any product surface." },
      { title: "Automated reporting", description: "Generate narrative reports and summaries from raw operational data." },
      { title: "Custom model integration", description: "Connect your own models or fine-tuned LLMs into the platform." },
    ],
    aiFeatures: [
      "Plug-and-play predictive analytics",
      "Cross-product embedded AI chat assistant",
      "Narrative, automated executive reporting",
    ],
  },
];

export type Industry = {
  slug: string;
  name: string;
  description: string;
  points: string[];
};

export const industries: Industry[] = [
  {
    slug: "construction-epc",
    name: "Construction & EPC",
    description:
      "Purpose-built ERP and site management tools that bring visibility to every project, from groundbreaking to closeout.",
    points: ["Project & budget control", "Site reporting digitization", "Vendor & procurement management"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    description:
      "Data pipelines and analytics that connect shop-floor operations to executive decision-making in real time.",
    points: ["Production & inventory visibility", "Predictive maintenance analytics", "Supply chain reporting"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    description:
      "Custom platforms and dashboards that unify property, tenant, and construction data across your portfolio.",
    points: ["Portfolio & asset dashboards", "Tenant & vendor CRM", "Automated financial reporting"],
  },
  {
    slug: "enterprise-erp-crm",
    name: "Enterprises needing custom ERP/CRM",
    description:
      "Tailored ERP and CRM builds for organizations whose workflows don't fit off-the-shelf software.",
    points: ["Custom workflow design", "Legacy system integration", "AI-enhanced reporting & automation"],
  },
];
