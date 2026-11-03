// Portfolio content follows Suraj's current resume.
export const profile = {
  name: 'Suraj Kumar',
  title: 'Full Stack Software Engineer',
  tagline:
    'I build REST APIs, reliable data layers, and React interfaces, then connect them to useful AI features.',
  location: 'Delhi, India',
  email: 'webdev.2301@gmail.com',
  phone: '+91 8527949448',
  linkedin: 'https://www.linkedin.com/in/surajdev420',
  github: 'https://github.com/suraaaaaj-code',
  resume: '/resume.pdf',
  heroChips: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API', 'Google Gemini API'],
  summary:
    'Full Stack Software Engineer building REST APIs, SQL and MongoDB data layers, and React.js interfaces. Delivered API-driven features for 30+ live B2B storefronts and AI-powered modules using the OpenAI and Google Gemini APIs.',
};

export const stats = [
  { value: '30+', label: 'Live B2B storefronts' },
  { value: '15+', label: 'REST API endpoints delivered' },
  { value: '40%', label: 'Fewer recurring backend errors' },
  { value: '8.10', label: 'Engineering CGPA / 10' },
];

export const experience = [
  {
    role: 'Junior Web Developer, Backend Development',
    company: 'Bharat Software Solutions',
    logo: '/bharat-software-logo.jpg',
    logoClass: 'bharat-software',
    period: 'Jul 2026 – Oct 2026',
    location: 'Delhi, India',
    points: [
      'Developed and maintained 15+ REST API endpoints and SQL database operations for production modules powering client-facing features.',
      'Validated API requests and responses with Postman during end-to-end testing before release.',
      'Diagnosed backend failures through edge-case reproduction and server-log analysis, reducing recurring production errors by 40%.',
      'Integrated RESTful and third-party APIs to connect application modules with external systems.',
    ],
    stack: ['PHP', 'MySQL', 'SQL', 'REST APIs', 'Postman', 'Git', 'Debugging'],
  },
  {
    role: 'Software Developer Intern',
    company: 'WizCommerce (Oritur Technologies)',
    logo: '/wizcommerce-logo-white.jpg',
    logoClass: 'wizcommerce',
    period: 'Jul 2025 – Jun 2026',
    location: 'Gurugram, India',
    points: [
      'Built reusable React.js components deployed across 30+ live B2B storefronts, reducing duplicate UI code by 35% and accelerating releases.',
      'Connected React frontends to Node.js and Express.js REST APIs backed by MongoDB for efficient JSON data exchange.',
      'Integrated OpenAI and Google Gemini APIs into production workflows to power AI features in API-driven modules.',
      'Developed Android Studio application screens consuming REST APIs and tested on emulators and physical devices.',
    ],
    stack: ['Python', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'Android Studio', 'MongoDB', 'OpenAI API', 'Gemini API', 'Git'],
  },
];

export const skillGroups = [
  { title: 'Languages', items: ['JavaScript', 'TypeScript', 'Dart', 'Python', 'SQL', 'PHP', 'C/C++'] },
  { title: 'Frontend & Mobile', items: ['Flutter', 'React.js', 'Tailwind CSS', 'Responsive Web Design', 'Android Studio'] },
  { title: 'Backend & APIs', items: ['Node.js', 'Express.js', 'REST APIs', 'RESTful API Design', 'JSON', 'API Integration', 'Debugging', 'TDD'] },
  { title: 'Databases', items: ['MySQL', 'MongoDB', 'Database Design', 'Query Writing', 'Relational Data', 'NoSQL'] },
  { title: 'AI APIs', items: ['OpenAI API', 'Google Gemini API'] },
  { title: 'Core Concepts', items: ['Object-Oriented Programming', 'Data Structures & Algorithms', 'System Design Fundamentals'] },
  { title: 'Tools & Cloud', items: ['Git', 'GitHub', 'Postman', 'Docker', 'CI/CD', 'Google Cloud'] },
];

export const projects = [
  {
    index: '01',
    title: 'AI-Powered Expense Tracker',
    status: 'In development',
    desc: 'Building a cross-platform app for uploading PDF bank statements, storing parsed transactions in MongoDB, viewing category-based expenses, and getting AI-generated spending insights.',
    tags: ['Flutter', 'Dart', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API', 'Gemini API'],
    visual: 'tracker',
  },
  {
    index: '02',
    title: 'Full-Stack Web Application',
    status: 'Completed',
    desc: 'Responsive web interfaces connected to RESTful backend APIs for secure, database-driven application features.',
    tags: ['Node.js', 'Express.js', 'PHP', 'MySQL', 'MongoDB'],
    visual: 'web',
  },
];

export const education = {
  school: 'Chitkara University, Himachal Pradesh',
  degree: 'B.E. in Computer Science and Engineering',
  period: 'Sep 2022 – Aug 2026',
  detail: 'CGPA 8.10 / 10',
  coursework: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems'],
};

export const certifications = ['Google Cloud Data Analytics · 2025'];
