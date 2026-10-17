// Edit this file to update all content on the site.

export const profile = {
  name: 'Suraj Kumar',
  title: 'Full Stack AI Developer',
  tagline:
    'I build scalable web applications and AI-powered features using React, Node.js, MongoDB and REST APIs.',
  location: 'Delhi NCR, India',
  email: 'webdev.2301@gmail.com',
  linkedin: 'https://www.linkedin.com/in/surajdev420',
  github: 'https://github.com/wedev001',
  resume: '/resume.pdf',
  heroChips: ['React', 'TypeScript', 'Next.js', 'Node.js', 'MongoDB', 'OpenAI API', 'LLM Integration', 'RAG'],
  summary:
    'Full Stack Developer with production experience at WizCommerce, a B2B e-commerce platform serving 30+ live storefronts. I build React interfaces, REST APIs and database-backed backends, and I am now focused on combining full stack engineering with AI. I care about clean code, performance and systems that hold up under real traffic.',
};

export const stats = [
  { value: '30+', label: 'Live storefronts supported' },
  { value: '80%', label: 'Less custom CSS via design tokens' },
  { value: '8.10', label: 'CGPA, B.E. Computer Science' },
];

export const experience = [
  {
    role: 'Junior Web Developer',
    company: 'Bharat Software Solutions',
    logo: '/bharat-software-logo.jpg',
    logoClass: 'bharat-software',
    period: 'Jul 2026 – Present',
    location: 'New Delhi, India',
    points: [
      'Design and build RESTful APIs and server-side logic in PHP, following OOP principles and design patterns.',
      'Design relational and non-relational database schemas, handle complex queries and optimize performance for high responsiveness.',
      'Collaborate with designers, product managers and front-end engineers on architecture and API integration, using Git for version control.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'WizCommerce',
    logo: '/wizcommerce-logo-white.jpg',
    logoClass: 'wizcommerce',
    period: 'Jul 2025 – Jun 2026',
    location: 'Gurugram, India',
    points: [
      'Migrated PHP-proxy AJAX handlers to direct browser-to-backend REST API calls using a typed JavaScript client.',
      'Built reusable atomic UI components in React using an Atoms, Widgets and Layouts architecture.',
      'Reduced custom CSS by around 80% using CSS variables and design tokens.',
      'Helped reduce PHP-FPM worker usage and eliminate intermittent 502 errors under load.',
      'Optimized page render performance with concurrent and batched API requests.',
    ],
  },
  {
    role: 'Web Developer',
    company: 'Bharat Internships',
    logo: '/bharat-intern-logo.jpg',
    logoClass: 'bharat-intern',
    period: 'Sep 2023 – Nov 2023',
    location: 'Remote',
    points: [
      'Built responsive web pages with HTML, CSS and JavaScript.',
      'Practiced clean-code refactoring, debugging and Git workflows in a remote agile team.',
    ],
  },
];

export const skillGroups = [
  { title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Redux', 'HTML5', 'CSS3', 'Vite', 'Responsive Design'] },
  { title: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'API Integration', 'MongoDB', 'SQL', 'Database Design', 'PHP', 'Socket.io'] },
  { title: 'AI & LLMs', items: ['OpenAI API', 'LLM Integration', 'Generative AI', 'Prompt Engineering', 'Retrieval-Augmented Generation (RAG)', 'Embeddings', 'Vector Databases', 'LangChain', 'Hugging Face', 'AI Agents'] },
  { title: 'Engineering', items: ['Reusable Components', 'Design Tokens', 'Performance Optimization', 'Concurrent & Batched API Requests'] },
  { title: 'Tools & Cloud', items: ['Git', 'Redis', 'WordPress', 'Google Cloud'] },
];

export const projects = [
  {
    title: 'AI-Powered Expense Tracker',
    desc: 'Track spending and get AI-assisted insights on where your money goes. Built with React, Node.js and MongoDB. Currently in progress.',
    tags: ['React', 'Node.js', 'MongoDB', 'AI'],
    link: '',
    github: '',
  },
  {
    title: 'Developer Portfolio',
    desc: 'This site: a MERN-stack portfolio with a contact form that stores messages in MongoDB.',
    tags: ['React', 'Express', 'MongoDB'],
    link: '',
    github: '',
  },
];

export const education = {
  school: 'Chitkara University',
  degree: 'B.E., Computer Science Engineering',
  period: '2022 – 2026',
  detail: 'CGPA 8.10',
};

export const certifications = ['Google Cloud Data Analytics'];
