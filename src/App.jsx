import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsMarquee from './components/SkillsMarquee/SkillsMarquee';
import './App.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.name || formData.name.trim().length < 2) errs.name = 'Please enter your name';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = 'Please enter a valid email';
    if (!formData.subject) errs.subject = 'Please select a project type';
    if (!formData.message || formData.message.trim().length < 10) errs.message = 'Please enter a message (min 10 chars)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const resp = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await resp.json();

      if (!resp.ok) {
        console.error('Server error:', data);
        setSubmitStatus({ status: 'error', message: data?.error || 'Failed to send message' });
      } else {
        setSubmitStatus({ status: 'success' });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (err) {
      console.error('Request error:', err);
      setSubmitStatus({ status: 'error', message: 'Network error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      className="contact-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
        />
        {errors.name && <div className="form-error">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Business Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.company@email.com"
        />
        {errors.email && <div className="form-error">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="subject">Project Type</label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select project type</option>
          <option value="web-development">Web Development</option>
          <option value="mobile-app">Mobile Application</option>
          <option value="e-commerce">E-commerce Platform</option>
          <option value="api-integration">API Integration</option>
          <option value="consultation">Technical Consultation</option>
          <option value="other">Other</option>
        </select>
        {errors.subject && <div className="form-error">{errors.subject}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="message">Project Details</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Please provide detailed information about your project requirements, timeline, budget, and specific goals..."
          rows="6"
        />
        {errors.message && <div className="form-error">{errors.message}</div>}
      </div>

      <motion.button
        type="submit"
        className="btn-primary submit-btn"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Submit Project Inquiry'}
      </motion.button>

      {submitStatus?.status === 'success' && (
        <motion.div
          className="success-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✓ Thank you for your inquiry! I've received your project details and will respond within 24 hours with a comprehensive proposal.
        </motion.div>
      )}

      {submitStatus?.status === 'error' && (
        <motion.div
          className="error-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✕ {submitStatus.message}
        </motion.div>
      )}
    </motion.form>
  );
};

function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const latestArticles = [
    {
      title: "Building Scalable React Applications",
      description:
        "Master advanced patterns, performance optimization, and state management for enterprise-level React applications.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
          <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
        </svg>
      ),
    },
    {
      title: "Integrating AI into Web Applications",
      description:
        "Explore how to leverage machine learning APIs, implement chatbots, and create intelligent user experiences.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9h.01M15 9h.01M8 14s1.5 2 4 2 4-2 4-2" />
        </svg>
      ),
    },
    {
      title: "Web Performance Optimization",
      description:
        "A comprehensive guide to Core Web Vitals, lazy loading, code splitting, and advanced optimization techniques.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
        </svg>
      ),
    },
    {
      title: "Modern UI/UX Design Principles",
      description:
        "From micro-interactions to accessibility, learn what makes interfaces both beautiful and functional.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      ),
    },
    {
      title: "Python for Backend Development",
      description:
        "Build robust APIs with Flask and Django, from database design to deployment and testing best practices.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M14 4l-4 16" />
        </svg>
      ),
    },
    {
      title: "Deploying Apps with Docker & CI/CD",
      description:
        "Streamline releases with containerization, automated pipelines, and cloud-ready deployment workflows.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 17h16M6 13h12M8 9h8M10 5h4" />
          <path d="M12 5v12" />
        </svg>
      ),
    },
  ];

  return (
    <div className="App">
      <Navbar />
      <Hero />
      
      <div className="content-section" id="about">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>About Me</h2>
            <p className="about-intro">
              I'm <strong>Makbel Kebede</strong>, a passionate <strong>Full-Stack Developer</strong> and <strong>Computer Science Expert</strong> dedicated to building innovative, scalable, and user-centric applications. I love turning complex problems into elegant, efficient solutions through clean code and modern technologies.
            </p>
            
            <div className="about-grid">
              <div className="about-card">
                <div className="about-icon">🎯</div>
                <h3>My Mission</h3>
                <p>To create impactful digital solutions that solve real-world problems and enhance user experiences through cutting-edge technology.</p>
              </div>
              <div className="about-card">
                <div className="about-icon">💡</div>
                <h3>My Approach</h3>
                <p>Combining strong computer science fundamentals with modern development practices to build robust, maintainable, and scalable applications.</p>
              </div>
              <div className="about-card">
                <div className="about-icon">🚀</div>
                <h3>My Goal</h3>
                <p>To continuously learn, innovate, and contribute to the tech community while delivering exceptional value through software solutions.</p>
              </div>
            </div>

            <div className="about-stats">
              <div className="stat-box">
                <span className="stat-box-number">18+</span>
                <span className="stat-box-label">Projects Completed</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-number">6+</span>
                <span className="stat-box-label">Technologies</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-number">2+</span>
                <span className="stat-box-label">Years Experience</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-number">500+</span>
                <span className="stat-box-label">GitHub Contributions</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
     {/* PROJECTS SECTION - GREEN CARD GRID LAYOUT */}
<div className="content-section" id="projects">
  <div className="section-container">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>Featured Projects</h2>
      <p>Innovative solutions • Real-world applications • Modern tech stack</p>
    </motion.div>

    <div className="projects-grid">
      <motion.div
        className="project-card accent-1"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
      >
        <div className="project-card-accent" />
        <div className="project-card-body">
          <div className="project-card-header">
            <h3>Task Manager Pro</h3>
            <span>Featured</span>
          </div>
          <p>Productivity dashboard for team workflows, live syncing, and analytics in a sleek modern UI.</p>
          <div className="project-card-tech">
            <span>React</span>
            <span>Node.js</span>
            <span>MongoDB</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="project-card accent-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
      >
        <div className="project-card-accent" />
        <div className="project-card-body">
          <div className="project-card-header">
            <h3>OSINT Application</h3>
            <span>Security</span>
          </div>
          <p>Data-gathering toolkit with automated analysis and reporting for intelligence workflows.</p>
          <div className="project-card-tech">
            <span>Python</span>
            <span>React</span>
            <span>APIs</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="project-card accent-3"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.3 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
      >
        <div className="project-card-accent" />
        <div className="project-card-body">
          <div className="project-card-header">
            <h3>Car Rental System</h3>
            <span>Platform</span>
          </div>
          <p>Booking experience with fleet management, payment integration, and an admin dashboard.</p>
          <div className="project-card-tech">
            <span>Express</span>
            <span>PostgreSQL</span>
            <span>Stripe</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="project-card accent-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.4 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
      >
        <div className="project-card-accent" />
        <div className="project-card-body">
          <div className="project-card-header">
            <h3>E-commerce Platform</h3>
            <span>Retail</span>
          </div>
          <p>Online store experience with product catalog, cart flow, and secure checkout integration.</p>
          <div className="project-card-tech">
            <span>React</span>
            <span>Redux</span>
            <span>MongoDB</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="project-card accent-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
      >
        <div className="project-card-accent" />
        <div className="project-card-body">
          <div className="project-card-header">
            <h3>Kebele Management</h3>
            <span>Admin</span>
          </div>
          <p>Local government system for citizen records, service requests, and document workflows.</p>
          <div className="project-card-tech">
            <span>Django</span>
            <span>Bootstrap</span>
            <span>SQLite</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="project-card accent-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.6 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
      >
        <div className="project-card-accent" />
        <div className="project-card-body">
          <div className="project-card-header">
            <h3>Portfolio Dashboard</h3>
            <span>Design</span>
          </div>
          <p>Modern showcase with interactive sections, performance metrics, and smooth animations.</p>
          <div className="project-card-tech">
            <span>Vite</span>
            <span>React</span>
            <span>CSS</span>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</div>
      
      {/* TECHNICAL EXPERTISE — MARQUEE */}
      <div className="content-section skills-section" id="skills">
        <div className="section-container skills-intro">
          <h2>Technical Expertise</h2>
          <p>
            A curated overview of my core technology stack &amp; professional skills.
          </p>
        </div>
        <SkillsMarquee />
      </div>
      
      
      {/* EXPERIENCE SECTION - TIMELINE DESIGN */}
      <div className="content-section" id="experience">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Professional Experience</h2>
            <p>My journey in software development and technical expertise</p>
                  
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>Full-Stack Developer</h3>
                    <span className="timeline-date">2023 - Present</span>
                  </div>
                  <h4>Freelance & Personal Projects</h4>
                  <ul>
                    <li>Developed 18+ full-stack applications using React, Node.js, and Python</li>
                    <li>Built scalable web applications with modern architecture patterns</li>
                    <li>Implemented RESTful APIs and integrated third-party services</li>
                    <li>Collaborated with clients to deliver custom software solutions</li>
                  </ul>
                  <div className="timeline-tech">
                    <span>React</span>
                    <span>Node.js</span>
                    <span>Python</span>
                    <span>MongoDB</span>
                  </div>
                </div>
              </div>
      
              
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>Software Developer Intern</h3>
                    <span className="timeline-date">2022 - 2023</span>
                  </div>
                  <h4>Tech Company</h4>
                  <ul>
                    <li>Assisted in developing and maintaining web applications</li>
                    <li>Participated in code reviews and agile development processes</li>
                    <li>Gained hands-on experience with version control and CI/CD</li>
                    <li>Contributed to team projects and learned industry best practices</li>
                  </ul>
                  <div className="timeline-tech">
                    <span>JavaScript</span>
                    <span>Express</span>
                    <span>PostgreSQL</span>
                    <span>Git</span>
                  </div>
                </div>
              </div>
      
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>Computer Science Student</h3>
                    <span className="timeline-date">2021 - Present</span>
                  </div>
                  <h4>University Education</h4>
                  <ul>
                    <li>Studying core CS fundamentals: Data Structures, Algorithms, OOP</li>
                    <li>Completed projects in web development, databases, and software engineering</li>
                    <li>Active participation in coding competitions and hackathons</li>
                    <li>Strong foundation in problem-solving and computational thinking</li>
                  </ul>
                  <div className="timeline-tech">
                    <span>Java</span>
                    <span>C++</span>
                    <span>Python</span>
                    <span>SQL</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
        {/* EDUCATION & CERTIFICATIONS SECTION */}
      <div className="content-section" id="education">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Education & Certifications</h2>
            <p>Academic background and professional certifications</p>
                  
            <div className="education-grid">
              <div className="education-card">
                <div className="education-icon">🎓</div>
                <h3>Bachelor of Science in Computer Science</h3>
                <p className="education-institution">University Name</p>
                <p className="education-date">2021 - Present</p>
                <ul className="education-details">
                  <li>Focus on Software Engineering & Web Development</li>
                  <li>Strong foundation in algorithms and data structures</li>
                  <li>Projects in full-stack development and databases</li>
                </ul>
              </div>
      
              <div className="education-card">
                <div className="education-icon">📜</div>
                <h3>Professional Certifications</h3>
                <ul className="certifications-list">
                  <li>
                    <span className="cert-badge">✓</span>
                    <div>
                      <strong>Full-Stack Web Development</strong>
                      <p>Completed comprehensive bootcamp</p>
                    </div>
                  </li>
                  <li>
                    <span className="cert-badge">✓</span>
                    <div>
                      <strong>React Developer Certification</strong>
                      <p>Modern React with Redux</p>
                    </div>
                  </li>
                  <li>
                    <span className="cert-badge">✓</span>
                    <div>
                      <strong>Python Programming</strong>
                      <p>Advanced Python development</p>
                    </div>
                  </li>
                </ul>
              </div>
      
              <div className="education-card">
                <div className="education-icon">🏆</div>
                <h3>Achievements & Awards</h3>
                <ul className="achievements-list">
                  <li>🥇 Hackathon Winner - Best Innovation Award</li>
                  <li>🌟 Dean's List for Academic Excellence</li>
                  <li>💻 Open Source Contributor - 500+ GitHub contributions</li>
                  <li>📚 Published technical articles on web development</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* LATEST ARTICLES SECTION */}
      <div className="content-section articles-section" id="blog">
        <div className="section-container">
          <motion.div
            className="articles-showcase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <header className="articles-header">
              <span className="articles-badge">Articles</span>
              <h2 className="articles-title">Latest Articles</h2>
              <p className="articles-subtitle">
                Insights, tutorials, and thoughts on web development, design, and technology
              </p>
            </header>

            <div className="articles-grid">
              {latestArticles.map((article, index) => (
                <motion.article
                  key={article.title}
                  className="article-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="article-card-icon">{article.icon}</div>
                  <h3 className="article-card-title">{article.title}</h3>
                  <p className="article-card-text">{article.description}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="content-section" id="contact">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Get In Touch</h2>
            <p>Reach out for professional collaboration, project strategy, or technical consulting. I build clean, </p>
              <p>scalable software for ambitious products and teams.</p>

            <div className="contact-wrapper">
              <div className="contact-panel">
                <div className="contact-panel-content">
                  <span className="contact-tag">Work with me</span>
                  <h3>Let's design your next product together.</h3>
                  
                  <p>Whether you’re launching a SaaS platform, modernizing an existing product, or building a new digital experience from scratch, I combine design clarity, backend reliability, and deployment readiness to move your project forward.</p>

                  <div className="contact-highlights">
                    <div className="highlight-card">
                      <strong>Fast professional replies</strong>
                      <span>Within 24 hours for project requests</span>
                    </div>
                    <div className="highlight-card">
                      <strong>Trusted delivery</strong>
                      <span>From idea validation to launch</span>
                    </div>
                    <div className="highlight-card">
                      <strong>Strategic execution</strong>
                      <span>Clear planning, technical recommendations, and actionable next steps</span>
                    </div>
                  </div>

                  <div className="contact-details-row">
                    <div>
                      <p className="detail-label">Email</p>
                      <p className="detail-value">makbelkebede35@gmail.com</p>
                    </div>
                    <div>
                      <p className="detail-label">Availability</p>
                      <p className="detail-value">Mon - Fri, 9am - 6pm EST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-form-container contact-form-panel">
                <div className="contact-form-header">
                  <h3>Project Consultation</h3>
                  <p className="form-description">Tell me about your challenge, desired outcome, and timeline. I’ll respond with a tailored plan and next steps.</p>
                </div>
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section footer-about">
            <h3>Makbel Kebede</h3>
            <p className="footer-title">Full-Stack Developer & Computer Science Expert</p>
            <p>Building innovative, scalable, and user-centric applications with modern technologies. Passionate about creating impactful digital solutions.</p>
            <div className="footer-tech-stack">
              <span>React</span>
              <span>Node.js</span>
              <span>Python</span>
              <span>TypeScript</span>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>About Me</button></li>
              <li><button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>Projects</button></li>
              <li><button onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}>Skills</button></li>
              <li><button onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>Experience</button></li>
              <li><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><button onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}>Education</button></li>
              <li><button onClick={() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })}>Blog</button></li>
              <li><a href="https://github.com/Makbel16/" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Resume</a></li>
            </ul>
          </div>
          
          <div className="footer-section footer-connect">
            <h4>Let's Connect</h4>
            <p>Have a project in mind or want to collaborate? Let's create something amazing together!</p>
            <div className="footer-social">
              <a href="https://github.com/Makbel16/" target="_blank" rel="noopener noreferrer" title="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 2.614.282.857-.237 1.771-.354 2.684-.354.914 0 1.827.117 2.684.354 1.606-.604 2.614-.282 2.614-.282.653 1.652.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a href="mailto:makbel.kebede@example.com" title="Email">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Email
              </a>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} Makbel Kebede. All rights reserved.</p>
            <p className="footer-built-with">Built with <span className="heart">❤️</span> using React, Three.js & Framer Motion</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;