// Formulário de Login com Onda em Gradiente - JavaScript
class GradientWaveLoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.submitButton = this.form.querySelector('.gradient-button');
        this.successMessage = document.getElementById('successMessage');
        this.socialButtons = document.querySelectorAll('.social-btn');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupPasswordToggle();
        this.setupSocialButtons();
        this.setupWaveEffects();
        this.setupRippleEffects();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        this.emailInput.addEventListener('input', () => this.clearError('email'));
        this.passwordInput.addEventListener('input', () => this.clearError('password'));
        
        // Adiciona efeito de onda nos campos de entrada
        [this.emailInput, this.passwordInput].forEach(input => {
            input.addEventListener('focus', (e) => this.triggerInputWave(e));
            input.addEventListener('blur', (e) => this.resetInputWave(e));
        });
    }
    
    setupPasswordToggle() {
        this.passwordToggle.addEventListener('click', (event) => {
            const type = this.passwordInput.type === 'password' ? 'text' : 'password';
            this.passwordInput.type = type;
            
            this.passwordToggle.classList.toggle('show-password', type === 'text');
            
            // Efeito ripple no botão de mostrar senha
            this.createRipple(event, this.passwordToggle);
        });
    }
    
    setupSocialButtons() {
        this.socialButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
                
                // Identifica o provedor social
                let provider = 'Social';
                if (button.querySelector('.google-bg')) provider = 'Google';
                else if (button.querySelector('.facebook-bg')) provider = 'Facebook';
                else if (button.querySelector('.apple-bg')) provider = 'Apple';
                
                this.handleSocialLogin(provider, button);
            });
        });
    }
    
    setupWaveEffects() {
        // Efeito interativo de onda no cartão de login
        const card = document.querySelector('.login-card');
        card.addEventListener('mousemove', (e) => {
            this.updateCardWave(e, card);
        });
        
        // Animação flutuante das partículas
        this.animateParticles();
    }
    
    setupRippleEffects() {
        // Efeito ripple no botão principal
        this.submitButton.addEventListener('click', (e) => {
            this.createRipple(e, this.submitButton.querySelector('.button-ripple'));
        });
        
        // Efeito ripple no checkbox
        const checkbox = document.querySelector('.checkbox-container');
        checkbox.addEventListener('click', (e) => {
            this.createGradientRipple(e, checkbox);
        });
    }
    
    updateCardWave(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        const tiltX = deltaY * 5;
        const tiltY = -deltaX * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
    }
    
    animateParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            setInterval(() => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 2000 + index * 500);
        });
    }
    
    triggerInputWave(e) {
        const container = e.target.closest('.input-container');
        const wave = container.querySelector('.input-wave');
        
        // Reinicia e executa a animação de onda
        wave.style.animation = 'none';
        setTimeout(() => {
            wave.style.animation = 'inputWaveFlow 1s ease-in-out';
        }, 10);
        
        // Efeito de brilho
        container.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.2)';
    }
    
    resetInputWave(e) {
        const container = e.target.closest('.input-container');
        container.style.boxShadow = '';
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showError('email', 'O e-mail é obrigatório');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showError('email', 'Digite um e-mail válido');
            return false;
        }
        
        this.clearError('email');
        return true;
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        
        if (!password) {
            this.showError('password', 'A senha é obrigatória');
            return false;
        }
        
        if (password.length < 6) {
            this.showError('password', 'A senha deve ter no mínimo 6 caracteres');
            return false;
        }
        
        this.clearError('password');
        return true;
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        
        if (!isEmailValid || !isPasswordValid) {
            // Animação de erro no botão
            this.submitButton.style.animation = 'waveShake 0.5s ease-in-out';
            setTimeout(() => {
                this.submitButton.style.animation = '';
            }, 500);
            return;
        }
        
        this.setLoading(true);
        
        try {
            // Simula autenticação local (offline)
            await new Promise(resolve => setTimeout(resolve, 2500));
            
            // Sucesso no login
            this.showWaveSuccess();
        } catch (error) {
            this.showError('password', 'Falha na autenticação. Tente novamente.');
        } finally {
            this.setLoading(false);
        }
    }
    
    async handleSocialLogin(provider, button) {
        console.log(`Iniciando autenticação com ${provider}...`);
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log(`Login com ${provider} simulado com sucesso.`);
    }
}

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new GradientWaveLoginForm();
});
