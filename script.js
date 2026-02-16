// Language Toggle Functionality
// This script handles the bilingual toggle between Gujarati and English

document.addEventListener('DOMContentLoaded', function() {
    // Get language buttons
    const langGuBtn = document.getElementById('lang-gu');
    const langEnBtn = document.getElementById('lang-en');
    
    // Get all language-specific elements
    const guElements = document.querySelectorAll('.lang-gu');
    const enElements = document.querySelectorAll('.lang-en');
    
    // Set default language to Gujarati
    let currentLang = 'gu';
    
    // Function to switch language
    function switchLanguage(lang) {
        currentLang = lang;
        
        // Update button states
        if (lang === 'gu') {
            langGuBtn.classList.add('active');
            langEnBtn.classList.remove('active');
        } else {
            langEnBtn.classList.add('active');
            langGuBtn.classList.remove('active');
        }
        
        // Show/hide language-specific content
        guElements.forEach(el => {
            if (lang === 'gu') {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
        
        enElements.forEach(el => {
            if (lang === 'en') {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Store preference in localStorage
        localStorage.setItem('preferredLanguage', lang);
    }
    
    // Event listeners for language buttons
    langGuBtn.addEventListener('click', () => switchLanguage('gu'));
    langEnBtn.addEventListener('click', () => switchLanguage('en'));
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang === 'en' || savedLang === 'gu') {
        switchLanguage(savedLang);
    } else {
        // Default to Gujarati
        switchLanguage('gu');
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Add visible class when section enters viewport
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });
});

// WhatsApp message prefill function
// This ensures the WhatsApp link has the correct bilingual message
// UPDATE: The WhatsApp number (919876543210) needs to be replaced with your actual number
function updateWhatsAppLinks() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    const currentLang = localStorage.getItem('preferredLanguage') || 'gu';
    
    const guMessage = encodeURIComponent(
        'હેલો, હું વિયાના ઇન્ડસ્ટ્રિયલ પાર્ક વિશે વધુ માહિતી મેળવવા માંગુ છું. કૃપા કરીને ઉપલબ્ધ પ્લોટ સાઇઝ, કિંમત વિગતો અને સાઇટ વિઝિટ સમય વિશે માહિતી આપો.\n\nHello, I would like to know more about Vianna Industrial Park. Please provide information about available plot sizes, price details, and site visit timings.'
    );
    
    // Note: WhatsApp links are already pre-filled in HTML, this function can be used for dynamic updates if needed
    // whatsappLinks.forEach(link => {
    //     const baseUrl = link.href.split('?')[0];
    //     link.href = `${baseUrl}?text=${guMessage}`;
    // });
}

// Call updateWhatsAppLinks when page loads
document.addEventListener('DOMContentLoaded', updateWhatsAppLinks);
