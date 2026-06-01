import React from 'react';
import './styles.css';

const IconLanguages = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
    <path d="M12 12l9-5M12 12v10M12 12L3 7" />
  </svg>
);

const IconFrontend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="12" cy="12" r="2.5" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
  </svg>
);

const IconBackend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M4 7h16v10H4z" />
    <path d="M8 7V5h8v2M12 17v2" />
  </svg>
);

const IconDatabase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
    <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
  </svg>
);

const IconDevOps = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <path d="M8.5 6h7M6 8.5v7M18 8.5v7M8.5 18h7" />
  </svg>
);

const IconCSCore = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M8 4h8v4H8zM4 12h6v8H4zM14 10h6v10h-6z" />
    <path d="M12 8v4" />
  </svg>
);

export const expertiseCategories = [
  {
    title: 'Languages',
    icon: IconLanguages,
    skills: ['Python', 'JavaScript (ES6+)', 'TypeScript', 'C++', 'Go', 'Rust', 'Java'],
  },
  {
    title: 'Frontend',
    icon: IconFrontend,
    skills: ['React', 'Vue.js', 'Angular', 'HTML5/CSS3', 'Sass', 'Svelte', 'Webpack', 'Vite', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: IconBackend,
    skills: ['Node.js', 'Express', 'Django', 'FastAPI', 'GraphQL', 'REST APIs', 'Microservices', 'Socket.io'],
  },
  {
    title: 'Database',
    icon: IconDatabase,
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase', 'Cassandra', 'SQL Server'],
  },
  {
    title: 'DevOps',
    icon: IconDevOps,
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Git', 'Terraform', 'Jenkins', 'Prometheus', 'Grafana'],
  },
  {
    title: 'CS Core',
    icon: IconCSCore,
    skills: ['Data Structures', 'Algorithms', 'System Design', 'OOP', 'Networking', 'Security', 'Agile/Scrum'],
  },
];

const ExpertiseMarqueeCard = ({ title, skills, icon: Icon }) => (
  <article className="expertise-marquee-card">
    <div className="expertise-marquee-card-top">
      <h3>{title}</h3>
      <div className="expertise-marquee-icon">
        <Icon />
      </div>
    </div>
    <div className="expertise-pills">
      {skills.map((skill) => (
        <span key={skill} className="expertise-pill">
          {skill}
        </span>
      ))}
    </div>
  </article>
);

const SkillsMarquee = ({ categories = expertiseCategories }) => {
  const cards = categories.map((cat) => (
    <ExpertiseMarqueeCard
      key={cat.title}
      title={cat.title}
      skills={cat.skills}
      icon={cat.icon}
    />
  ));

  return (
    <div className="expertise-marquee" aria-label="Technical skills">
      <div className="expertise-marquee-track">
        <div className="expertise-marquee-group">{cards}</div>
        <div className="expertise-marquee-group" aria-hidden="true">
          {categories.map((cat) => (
            <ExpertiseMarqueeCard
              key={`${cat.title}-dup`}
              title={cat.title}
              skills={cat.skills}
              icon={cat.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsMarquee;
