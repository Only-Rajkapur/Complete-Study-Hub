// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const icon = themeToggle.querySelector('i');
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    
    // Toggle icon
    if (document.body.classList.contains('light-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      localStorage.setItem('theme', 'light');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      localStorage.setItem('theme', 'dark');
    }
  });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    const icon = this.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Scroll Progress Bar
window.addEventListener('scroll', function() {
  const scrollProgress = document.querySelector('.scroll-progress');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  if (scrollProgress) {
    scrollProgress.style.width = scrollPercent + '%';
  }
});

// Typing Animation
const typedText = document.querySelector('.typed-text');
if (typedText) {
  const phrases = ['Complete Study Hub', 'Your Learning Partner', 'Exam Ready', 'Knowledge Hub'];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typedText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  }
  
  type();
}

// Subject Card Hover Effect
const subjectCards = document.querySelectorAll('.subject-card');
subjectCards.forEach(card => {
  card.addEventListener('click', function() {
    this.classList.toggle('show-info');
  });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Three.js Background Animation (Hero Section)
if (typeof THREE !== 'undefined') {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.insertBefore(renderer.domElement, heroSection.firstChild);
  }
  
  // Create geometric shapes
  const geometry = new THREE.IcosahedronGeometry(1, 0);
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x6c63ff, 
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  
  const cubes = [];
  for (let i = 0; i < 20; i++) {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = (Math.random() - 0.5) * 20;
    cube.position.y = (Math.random() - 0.5) * 20;
    cube.position.z = (Math.random() - 0.5) * 20;
    cube.rotation.x = Math.random() * Math.PI;
    cube.rotation.y = Math.random() * Math.PI;
    const scale = Math.random() * 0.5 + 0.1;
    cube.scale.set(scale, scale, scale);
    scene.add(cube);
    cubes.push(cube);
  }
  
  camera.position.z = 5;
  
  function animate() {
    requestAnimationFrame(animate);
    
    cubes.forEach((cube, index) => {
      cube.rotation.x += 0.001 * (index + 1);
      cube.rotation.y += 0.001 * (index + 1);
    });
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
