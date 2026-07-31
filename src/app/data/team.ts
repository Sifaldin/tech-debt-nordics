// Team data lives outside the carousel component because the /team page is a
// server component and needs this array to build its Person JSON-LD. A
// 'use client' module resolves to client references on the server, so
// importing TEAM from TeamCarousel there yields a proxy, not the data.
// Sayf's stack, from his CV (frontend-leaning full-stack + strong AI/GenAI).
// Yazan reuses the same set per request.
const SAYF_SKILLS = [
  'RAG',
  'LLM APIs',
  'Agentic Workflows',
  'Vector Search',
  'React',
  'React Native',
  'Vue',
  'Angular',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Go',
  'Java',
  'Spring Boot',
  'GraphQL',
  'Kafka',
  'Redis',
  'MongoDB',
  'PostgreSQL',
  'AWS',
  'GCP',
  'Kubernetes',
  'Terraform',
];

export interface Member {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  skills: string[];
}

export const TEAM: Member[] = [
  {
    name: 'Sayf Abbas',
    role: 'Senior Software Engineer',
    bio: 'I take joy in finding a problem worth solving as much as I enjoy implementing the solution. I’m a tireless results-driver, positive-minded, and passionate engineer who works across the stack with a slight preference to frontend. I love picking up new technologies and I’m passionate about AI-assisted development and the velocity it brings to engineering.',
    imageSrc: '/assets/sayf.jpeg',
    skills: SAYF_SKILLS,
  },
  {
    name: 'Mosaab Abbas',
    role: 'Senior Software Engineer',
    bio: 'Senior Backend Engineer with 8+ years designing distributed systems, event-driven architectures, and enterprise integration platforms with Java and Spring. Deep expertise in application modernization, cloud-native services, messaging, and performance optimization.',
    imageSrc: '/assets/mosaab.jpeg',
    skills: [
      'Java',
      'Spring Boot',
      'Quarkus',
      'Spring Security',
      'WebFlux',
      'GraphQL',
      'Apache Camel',
      'Kafka',
      'RabbitMQ',
      'Azure Service Bus',
      'AWS',
      'Azure',
      'Docker',
      'Kubernetes',
      'Terraform',
      'PostgreSQL',
      'DynamoDB',
      'Grafana',
      'Prometheus',
      'ELK Stack',
      'JUnit',
      'CI/CD',
      'GitHub Actions',
      'React',
    ],
  },
  {
    name: 'Anwar Abbas',
    role: 'Planning Lead',
    bio: 'Planning Lead with 15+ years delivering large-scale infrastructure and EPCI mega-projects across Europe and the Middle East. Expert in Primavera P6 scheduling, cost-loaded planning, delay analysis, risk management, and executive Power BI reporting.',
    imageSrc: '/assets/anwar.jpeg',
    skills: [
      'Primavera P6',
      'Power BI',
      'Acumen Risk',
      'AutoCAD',
      'Project Controls',
      'EPCI Scheduling',
      'Cost-Loaded Scheduling',
      'Delay Analysis',
      'Risk Analysis',
      'Stakeholder Mgmt',
      'Resource Planning',
      'Team Leadership',
    ],
  },
  {
    name: 'Yazan Abbas',
    role: 'Senior Software Engineer',
    bio: 'A fearless problem solving software developer. Able to self-direct and handle multiple, competing priorities. A background in architecture gives me a great eye for design, and I love to pick up new technology every now and then.',
    imageSrc: '/assets/yazan.jpeg',
    skills: SAYF_SKILLS,
  },
];
