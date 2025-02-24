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

// تكوين العداد التنازلي للعروض
function updateCountdown() {
    const countdownElement = document.querySelector('.countdown');
    if (!countdownElement) return;

    // تحديد موعد انتهاء العرض (الخميس القادم الساعة 12:30 صباحاً)
    const now = new Date();
    const targetDay = 4; // 4 = الخميس
    let daysUntilTarget = targetDay - now.getDay();
    if (daysUntilTarget <= 0) daysUntilTarget += 7;
    
    const target = new Date(now);
    target.setDate(now.getDate() + daysUntilTarget);
    target.setHours(0, 30, 0, 0); // 12:30 AM

    const timeLeft = target - now;
    
    if (timeLeft < 0) {
        document.querySelector('.offers-countdown').classList.add('expired');
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `
        <div class="countdown-item">
            <span>${String(days).padStart(2, '0')}</span>
            <div class="label">يوم</div>
        </div>
        <div class="countdown-item">
            <span>${String(hours).padStart(2, '0')}</span>
            <div class="label">ساعة</div>
        </div>
        <div class="countdown-item">
            <span>${String(minutes).padStart(2, '0')}</span>
            <div class="label">دقيقة</div>
        </div>
        <div class="countdown-item">
            <span>${String(seconds).padStart(2, '0')}</span>
            <div class="label">ثانية</div>
        </div>
    `;
}

// تحديث العداد كل ثانية
setInterval(updateCountdown, 1000);

// تشغيل العداد فور تحميل الصفحة
document.addEventListener('DOMContentLoaded', updateCountdown);