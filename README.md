# Rahul Bommu - Personal Portfolio

A modern, responsive personal portfolio website showcasing expertise in Electronics & Communication Engineering, Data Analytics, Embedded Systems, and more.

## Features

- 🎨 **Modern Design**: Clean, professional layout
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- 🌙 **Dark/Light Mode**: (Add if implemented)
- ✨ **Interactive Animations**: (Add if implemented)
- 📧 **Contact Form**: (Add if implemented)
- ⚡ **Performance Optimized**: Fast loading with optimized assets
- 🎯 **SEO Ready**: Structured HTML for better search engine visibility

## Sections

1. **Hero Section**: Introduction
2. **About Me**: Professional overview
3. **Skills**: Categorized skill sets
4. **Projects**: Featured project showcase
5. **Experience**: Professional timeline
6. **Achievements**: Certifications and recognitions
7. **Contact**: Contact information

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Interactive functionality and animations

## Customization Guide

### 1. Personal Information

Update the following in `index.html`:

```html
<!-- Update name and tagline -->
<span class="name">Your Name Here</span>
<p class="hero-tagline">Your Professional Tagline</p>

<!-- Update contact information -->
<div class="contact-item">
	<i class="fas fa-envelope"></i>
	<div>
		<h4>Email</h4>
		<p>your.email@example.com</p>
	</div>
</div>
```

### 2. Resume Links

Update the resume download link:

```html
<a href="./Accordion_resume.pdf" class="btn btn-secondary" download>
	<i class="fas fa-download"></i>
	Download Resume
</a>
```

### 3. Projects

Add your projects in the projects section:

```html
<div class="project-card">
	<div class="project-image">
		<i class="fas fa-your-icon"></i>
	</div>
	<div class="project-content">
		<h3>Your Project Name</h3>
		<p>Project description...</p>
		<div class="project-tech">
			<span class="tech-tag">Technology</span>
		</div>
		<div class="project-links">
			<a href="github-link" class="project-link"><i class="fab fa-github"></i></a>
			<a href="demo-link" class="project-link"><i class="fas fa-external-link-alt"></i></a>
		</div>
	</div>
</div>
```

### 4. Skills

Update skills in both categories:

```html
<div class="skill-card">
	<i class="fab fa-technology-icon"></i>
	<h4>Technology Name</h4>
	<p>Brief description</p>
</div>
```

### 5. Color Scheme

Customize colors in `style.css`:

```css
:root {
	--primary-color: #your-color;
	--secondary-color: #your-color;
	--accent-color: #your-color;
	/* ... other color variables */
}
```

### 6. Social Links

Update social media links in the footer and contact sections:

```html
<a href="your-linkedin-url" class="social-link"><i class="fab fa-linkedin"></i></a>
<a href="your-github-url" class="social-link"><i class="fab fa-github"></i></a>
```

## Setup Instructions

1. **Download/Clone** the portfolio files
2. **Replace** resume PDF files with your own
3. **Customize** content in `index.html`
4. **Update** colors and styling in `style.css` if desired
5. **Test** responsiveness on different devices
6. **Deploy** to your preferred hosting platform

## Deployment Options

- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Easy deployment
- **Vercel**: Fast deployment
- **Traditional Web Hosting**: Upload files via FTP

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Internet Explorer 11 (limited support)

## Performance Tips

1. Optimize images before uploading
2. Compress CSS and JavaScript for production
3. Use a CDN for better global loading times
4. Enable gzip compression on your server

## File Structure

```
New_portfolio/
├── index.html          # Main HTML file
├── style.css           # All styles and responsive design
├── script.js           # JavaScript functionality
├── Accordion_resume.pdf  # Resume file
├── Rahul_Embedded_resume.pdf # Alternate resume
└── README.md           # This file
```

## Customization Checklist

- [ ] Update personal information
- [ ] Replace placeholder content
- [ ] Add your projects
- [ ] Update skills section
- [ ] Add your resume file
- [ ] Update contact information
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Optimize for SEO
- [ ] Deploy to hosting platform

## Support

For questions or issues with customization, please refer to the comments in the code files or create an issue in the repository.

## License

This portfolio template is free to use and modify for personal and commercial purposes.

---

**Built with ❤️ for showcasing your professional journey**
