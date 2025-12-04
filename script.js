// Configuração inicial
document.documentElement.classList.add('dark-mode');

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Simular carregamento
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            
            // Inicializar animações após preloader
            initializeAnimations();
            initializeCanvas();
            initializeSmoothScroll();
        }, 500);
    }, 1500);
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark-mode');
    
    if (isDark) {
        document.documentElement.classList.remove('dark-mode');
        document.documentElement.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.remove('light-mode');
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
    
    // Adicionar efeito de transição
    document.documentElement.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 300);
});

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark-mode');
    document.documentElement.classList.add('light-mode');
}

// Mobile Navigation
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Fechar menu ao clicar em link
    if (navMenu.classList.contains('active')) {
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth Scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contadores animados
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 1500;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Canvas Background
function initializeCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Partículas
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = Math.random() > 0.5 ? 'rgba(59, 130, 246, 0.5)' : 'rgba(139, 92, 246, 0.5)';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > width) this.reset();
            if (this.x < 0) this.reset();
            if (this.y > height) this.reset();
            if (this.y < 0) this.reset();
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Conexões
    class Connection {
        constructor(particles) {
            this.particles = particles;
        }
        
        draw() {
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        const opacity = 1 - (distance / 100);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.2})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
    }
    
    // Inicializar partículas
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
    
    const connection = new Connection(particles);
    
    // Animação
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connection.draw();
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Redimensionar
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}

// Smooth Scroll com Lenis
function initializeSmoothScroll() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });
    
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
}

// Form Submission
const contactForm = document.getElementById('consultationForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        const formMessages = document.getElementById('form-messages');
        
        // Mostrar loading
        submitBtn.querySelector('.btn-text').textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Coletar dados do formulário
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Sucesso
                formMessages.textContent = 'Mensagem enviada com sucesso! Entrarei em contato em breve.';
                formMessages.className = 'success';
                formMessages.style.display = 'block';
                
                // Resetar formulário
                contactForm.reset();
                
                // Mostrar confetti
                showConfetti();
            } else {
                throw new Error('Erro na rede');
            }
        } catch (error) {
            // Erro
            formMessages.textContent = 'Ocorreu um erro. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.';
            formMessages.className = 'error';
            formMessages.style.display = 'block';
        } finally {
            // Restaurar botão
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
            
            // Ocultar mensagem após 5 segundos
            setTimeout(() => {
                formMessages.style.display = 'none';
            }, 5000);
        }
    });
}

// Confetti Effect
function showConfetti() {
    const confettiCount = 100;
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = getRandomColor();
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.opacity = '0.8';
        
        confettiContainer.appendChild(confetti);
        
        // Animação
        const animation = confetti.animate([
            { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        animation.onfinish = () => {
            confetti.remove();
            if (confettiContainer.children.length === 0) {
                confettiContainer.remove();
            }
        };
    }
    
    function getRandomColor() {
        const colors = [
            '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// Back to Top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer para animações
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.service-card, .expertise-item, .achievement-card').forEach(el => {
        observer.observe(el);
    });
    
    // Inicializar contadores
    initializeCounterAnimations();
}

// Efeito de digitação para elementos específicos
function initializeTypewriterEffect() {
    const elements = document.querySelectorAll('.typewriter');
    
    elements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Iniciar quando elemento estiver visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Inicializar efeito de digitação
document.addEventListener('DOMContentLoaded', initializeTypewriterEffect);

// Tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        element.addEventListener('mouseenter', (e) => {
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = rect.top - 40 + 'px';
            tooltip.classList.add('visible');
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
    });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Ctrl + K para focar na busca
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) searchInput.focus();
    }
    
    // Escape para fechar modais
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const timing = performance.getEntriesByType('navigation')[0];
        if (timing) {
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Tempo de carregamento da página: ${loadTime}ms`);
            
            // Otimizar se o carregamento for lento
            if (loadTime > 3000) {
                console.warn('Tempo de carregamento alto. Considere otimizar assets.');
            }
        }
    });
}

// Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    });
}

// Offline Detection
window.addEventListener('online', () => {
    showNotification('Conexão restaurada. Você está online novamente.', 'success');
});

window.addEventListener('offline', () => {
    showNotification('Você está offline. Algumas funcionalidades podem estar limitadas.', 'warning');
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animação de entrada
    setTimeout(() => {
        notification.classList.add('visible');
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Copy to Clipboard
function initializeCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach(button => {
        button.addEventListener('click', async () => {
            const text = button.getAttribute('data-copy');
            try {
                await navigator.clipboard.writeText(text);
                showNotification('Copiado para a área de transferência!', 'success');
            } catch (err) {
                showNotification('Falha ao copiar.', 'error');
            }
        });
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initializeCounterAnimations();
    initializeCanvas();
    initializeTooltips();
    initializeCopyButtons();
    
    // Adicionar classe loaded ao body após carregamento
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
