export function initContadores() {
    const counters = document.querySelectorAll('.js-counter');
    
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Anima apenas 1 vez ao aparecer
            }
        });
    }, { threshold: 0.15 }); // Inicia mais cedo: quando 15% estiver visível

    counters.forEach(counter => {
        const text = counter.innerText.trim();
        
        let target = parseFloat(counter.getAttribute('data-target'));
        let prefix = counter.getAttribute('data-prefix');
        let suffix = counter.getAttribute('data-suffix');

        // Se não foi definido manualmente, tenta adivinhar pelo texto (ex: "+10", "100%")
        if (isNaN(target)) {
            const match = text.match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);
            if (match) {
                prefix = match[1] || '';
                target = parseInt(match[2], 10);
                suffix = match[3] || '';
                counter.setAttribute('data-target', target);
                counter.setAttribute('data-prefix', prefix);
                counter.setAttribute('data-suffix', suffix);
            } else {
                return; // Ignora se o formato não casar ex: número no meio de letras
            }
        } else {
            prefix = prefix || '';
            suffix = suffix || '';
            counter.setAttribute('data-prefix', prefix);
            counter.setAttribute('data-suffix', suffix);
        }
        
        // Zera o texto imediatamente para esperar a animação
        counter.innerText = `${prefix}0${suffix}`;
        observer.observe(counter);
    });

    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        
        let startTimestamp = null;
        const duration = 1000; // Duração acelerada para 1 segundo

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            // Se o usuário preferir reduzir animação, pula direto pro fim
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const progress = prefersReducedMotion ? 1 : Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Easing de ease-out expo para um efeito que freia no final
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            const currentValue = Math.floor(easeProgress * target);
            counter.innerText = `${prefix}${currentValue}${suffix}`;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                counter.innerText = `${prefix}${target}${suffix}`;
            }
        };
        
        window.requestAnimationFrame(step);
    }
}
