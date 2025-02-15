// Navigation and Menu Functions
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });
}

navSlide();

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('nav-active');
        document.querySelector('.burger').classList.remove('toggle');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});

// Menu Tab Switching
document.querySelectorAll('.menu-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        document.querySelectorAll('.menu-items').forEach(item => {
            item.style.display = 'none';
        });
        
        const category = tab.getAttribute('data-category');
        document.getElementById(category).style.display = 'block';
    });
});

// Intersection Observer for animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.schedule-item, .contact-info, .social-icon').forEach(item => {
        observer.observe(item);
    });
};

document.addEventListener('DOMContentLoaded', observeElements);

// Click-to-copy for contact information
document.querySelectorAll('.contact-info a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.href.includes('tel:') || link.href.includes('mailto:')) {
            return;
        }
        e.preventDefault();
        navigator.clipboard.writeText(link.textContent.trim())
            .then(() => {
                const originalText = link.innerHTML;
                link.innerHTML = 'تم النسخ!';
                setTimeout(() => {
                    link.innerHTML = originalText;
                }, 1500);
            });
    });
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.fa-chevron-down');
        
        question.addEventListener('click', () => {
            // إغلاق كل الأسئلة الأخرى
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                    otherItem.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
                }
            });
            
            // تبديل حالة السؤال الحالي
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.maxHeight = '0px';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
});

// Count Down Timer
function startCountdown(minutes) {
    const countdownElement = document.getElementById('countdown');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    let totalSeconds = minutes * 60;
    
    const countdownInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = '<div class="expired">انتهت العروض!</div>';
            // إخفاء العروض عند انتهاء الوقت
            const offerCards = document.querySelectorAll('.offer-card');
            offerCards.forEach(card => {
                card.style.display = 'none';
            });
            return;
        }
        
        const minutesLeft = Math.floor(totalSeconds / 60);
        const secondsLeft = totalSeconds % 60;
        
        minutesElement.textContent = String(minutesLeft).padStart(2, '0');
        secondsElement.textContent = String(secondsLeft).padStart(2, '0');
        
        totalSeconds--;
    }, 1000);
}

// بدء العد التنازلي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    startCountdown(18); // 18 دقيقة حتى الساعة 10 مساءً بتوقيت مصر
});