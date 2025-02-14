// Quiz functionality
const questions = [
    {
        question: "ما هو أشهر طبق في معلم الشام؟",
        options: [
            "الفلافل العربي المشكل",
            "الكساديا",
            "البطاطس المقلية",
            "الحمص"
        ],
        correct: 0
    },
    {
        question: "كم عدد حبات الفلافل في صحن الفلافل العربي المشكل - كبير؟",
        options: [
            "6 حبات",
            "8 حبات",
            "10 حبات",
            "12 حبة"
        ],
        correct: 1
    },
    {
        question: "ما هي ساعات العمل في الفترة المسائية؟",
        options: [
            "4:30 مساءً - 11:00 مساءً",
            "5:00 مساءً - 11:30 مساءً",
            "5:30 مساءً - 12:00 منتصف الليل",
            "6:00 مساءً - 1:00 صباحاً"
        ],
        correct: 2
    },
    {
        question: "ما هو موقع معلم الشام؟",
        options: [
            "شارع الملك فهد",
            "شارع رغد، طريق الملك عبدالعزيز",
            "شارع الأمير نايف",
            "شارع الملك فيصل"
        ],
        correct: 1
    },
    {
        question: "ما هي مكونات صحن الفلافل العربي المشكل - وسط؟",
        options: [
            "سندويش واحد مع حمص",
            "2 سندويش فلافل تنوري مع حمص وبطاطس ومخلل و7 حبات فلافل و2 بيض",
            "3 سندويشات مع بطاطس",
            "سندويشين مع مخلل فقط"
        ],
        correct: 1
    },
    {
        question: "كم سعر علبة البطاطس؟",
        options: [
            "4 ريال",
            "5 ريال",
            "6 ريال",
            "7 ريال"
        ],
        correct: 2
    },
    {
        question: "أي من التالي متوفر في قائمة المشروبات؟",
        options: [
            "عصير برتقال طازج",
            "كينزا برتقال",
            "بيبسي",
            "عصير تفاح"
        ],
        correct: 1
    },
    {
        question: "ما هو سعر سندويش الفلافل بالخبز التنوري؟",
        options: [
            "4 ريال",
            "5 ريال",
            "6 ريال",
            "7 ريال"
        ],
        correct: 2
    },
    {
        question: "كم عدد السندويشات في صحن الفلافل العربي المشكل - كبير؟",
        options: [
            "سندويشين",
            "3 سندويشات",
            "4 سندويشات",
            "5 سندويشات"
        ],
        correct: 2
    },
    {
        question: "ما هي ساعات العمل في الفترة الصباحية؟",
        options: [
            "5:00 صباحاً - 11:00 صباحاً",
            "5:30 صباحاً - 11:30 صباحاً",
            "6:00 صباحاً - 12:00 ظهراً",
            "4:30 صباحاً - 10:30 صباحاً"
        ],
        correct: 1
    }
];

// المؤثرات الصوتية
const correctSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2190/2190-preview.mp3');
const wrongSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2194/2194-preview.mp3');
let currentQuestion = 0;
let correctAnswers = 0;
let selectedQuestions = [];

// تحديد وقت انتهاء العرض (12 ساعة من الآن)
const offerEndTime = new Date(Date.now() + 12 * 60 * 60 * 1000);

// نظام تتبع المحاولات
function checkAttempts() {
    const today = new Date().toDateString();
    const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '{}');
    
    if (attempts.date !== today) {
        attempts.date = today;
        attempts.count = 1;
    } else {
        if (attempts.count >= 3) {
            showMaxAttemptsMessage();
            return false;
        }
        attempts.count++;
    }
    
    localStorage.setItem('quizAttempts', JSON.stringify(attempts));
    updateRemainingAttempts(3 - attempts.count);
    return true;
}

function showMaxAttemptsMessage() {
    const nextAttemptTime = new Date();
    nextAttemptTime.setDate(nextAttemptTime.getDate() + 1);
    nextAttemptTime.setHours(0, 0, 0, 0);
    
    document.querySelector('.quiz-content').innerHTML = `
        <div class="max-attempts-message">
            <i class="fas fa-exclamation-circle"></i>
            <h3>عذراً، لقد استنفذت محاولاتك لليوم</h3>
            <p>يمكنك المحاولة مرة أخرى غداً ${nextAttemptTime.toLocaleDateString('ar-SA')} الساعة 12:00 صباحاً</p>
            <div class="alternative-options">
                <h4>في الوقت الحالي يمكنك:</h4>
                <a href="index.html#menu" class="menu-link">
                    <i class="fas fa-utensils"></i>
                    تصفح قائمة الطعام
                </a>
                <a href="https://maps.app.goo.gl/nxmRX66yb8y5pBaC7" class="location-link" target="_blank">
                    <i class="fas fa-map-marker-alt"></i>
                    زيارة أقرب فرع
                </a>
            </div>
            <a href="index.html" class="back-button">
                <i class="fas fa-home"></i>
                العودة للصفحة الرئيسية
            </a>
        </div>
    `;
}

// اختيار 4 أسئلة عشوائية
function selectRandomQuestions() {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    selectedQuestions = shuffled.slice(0, 4);
}

function updateProgress() {
    const progress = document.querySelector('.progress');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const progressPercentage = ((currentQuestion + 1) / selectedQuestions.length) * 100;
    
    progress.style.width = `${progressPercentage}%`;
    currentQuestionSpan.textContent = currentQuestion + 1;
    totalQuestionsSpan.textContent = selectedQuestions.length;
}

function loadQuestion() {
    const questionContainer = document.getElementById('question');
    const options = document.querySelectorAll('.option');
    
    questionContainer.textContent = selectedQuestions[currentQuestion].question;
    options.forEach((option, index) => {
        option.textContent = selectedQuestions[currentQuestion].options[index];
        option.classList.remove('correct', 'wrong');
        option.disabled = false;
    });
    
    updateProgress();
}

// تحديث نظام المحاولات مع إضافة رسائل تحفيزية
const motivationalMessages = [
    "أحسنت! أنت تعرف معلم الشام جيداً 👏",
    "ممتاز! استمر في التقدم 🌟",
    "رائع! أنت من زبائننا المميزين ⭐",
    "عظيم! اقتربت من الفوز بالعرض 🎉",
    "إجابة صحيحة! أنت خبير في منيو معلم الشام 🏆",
    "تألقت في هذا السؤال! 💫",
    "واصل النجاح! أنت قريب من هدفك 🎯",
    "إجابة موفقة! نحن فخورون بزبائننا المميزين 🌙"
];

function getMotivationalMessage() {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
}

function showMotivationalMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'motivational-message';
    messageDiv.textContent = getMotivationalMessage();
    document.querySelector('.quiz-content').appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
}

// تحسين تجربة الإجابة
function checkAnswer(selectedOption) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.disabled = true);
    
    if (selectedOption === selectedQuestions[currentQuestion].correct) {
        correctSound.play();
        correctAnswers++;
        options[selectedOption].classList.add('correct');
        showMotivationalMessage();
        
        if (currentQuestion < selectedQuestions.length - 1) {
            currentQuestion++;
            setTimeout(() => {
                loadQuestion();
                animateQuestion();
            }, 1500);
        } else {
            setTimeout(showSuccess, 1500);
        }
    } else {
        wrongSound.play();
        options[selectedOption].classList.add('wrong');
        options[selectedQuestions[currentQuestion].correct].classList.add('correct');
        showRetryButton();
        
        // تحديث المحاولات المتبقية في LocalStorage
        updateAttempts();
    }
}

// تحسين انتقالات الأسئلة
function animateQuestion() {
    const container = document.getElementById('question-container');
    const options = container.querySelectorAll('.option');
    
    container.style.opacity = '0';
    container.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.5s ease-out';
        container.style.opacity = '1';
        container.style.transform = 'translateX(0)';
        
        // تحريك الخيارات بشكل متتابع
        options.forEach((option, index) => {
            option.style.opacity = '0';
            option.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                option.style.transition = 'all 0.3s ease-out';
                option.style.opacity = '1';
                option.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
}

function showRetryButton() {
    const retryContainer = document.createElement('div');
    retryContainer.className = 'retry-container';
    retryContainer.innerHTML = `
        <button class="retry-button" onclick="retryQuestion()">
            <i class="fas fa-redo"></i> حاول مرة أخرى
        </button>
    `;
    document.getElementById('question-container').appendChild(retryContainer);
}

function retryQuestion() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('correct', 'wrong');
        option.disabled = false;
    });
    document.querySelector('.retry-container')?.remove();
    animateQuestion();
}

function formatTimeRemaining(endTime) {
    const now = new Date();
    const timeRemaining = endTime - now;
    
    if (timeRemaining <= 0) {
        return '00:00:00';
    }
    
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// تحسين عرض النتيجة النهائية
function showSuccess() {
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    
    // تحديث محتوى النتيجة مع تأثيرات حركية
    const content = `
        <div class="success-animation">
            <i class="fas fa-check-circle"></i>
            <div class="confetti-container"></div>
        </div>
        <h2 class="result-title">تهانينا! لقد أجبت على ${correctAnswers} من ${selectedQuestions.length} أسئلة بشكل صحيح</h2>
        <div class="offer-details">
            <img src="${localStorage.getItem('selectedOffer') || 'images/صحن فلافل عربي مشكل-كبير.jpg'}" alt="العرض" class="offer-image">
            <div class="offer-info">
                <div class="coupon-container">
                    <h3>كود الخصم الخاص بك:</h3>
                    <div class="coupon-code">MOALEM2024</div>
                    <button class="copy-coupon">
                        <i class="fas fa-copy"></i>
                        نسخ الكود
                    </button>
                </div>
                <div class="offer-instructions">
                    <h4><i class="fas fa-map-marker-alt"></i> مكان استلام العرض:</h4>
                    <p>فرع معلم الشام - شارع رغد، طريق الملك عبدالعزيز، ينبع البحر</p>
                    <a href="https://maps.app.goo.gl/nxmRX66yb8y5pBaC7" class="directions-button" target="_blank">
                        احصل على الاتجاهات
                    </a>
                    <div class="offer-validity">
                        <p>ينتهي العرض خلال:</p>
                        <div id="countdown"></div>
                    </div>
                    <button class="save-offer" onclick="saveOffer()">
                        <i class="fas fa-download"></i>
                        حفظ صورة العرض
                    </button>
                </div>
            </div>
        </div>
    `;
    
    resultContainer.innerHTML = content;
    createConfetti();
    setupCopyButton();
    startCountdown();
    
    // تشغيل صوت النجاح
    window.playSuccessSound();
    
    // تحريك الصفحة بسلاسة إلى أعلى
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// إضافة تأثير الاحتفال
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }
}

// دالة حفظ صورة العرض
function saveOffer() {
    const offerDetails = document.querySelector('.offer-details');
    
    // إضافة watermark قبل التصوير
    const watermark = document.createElement('div');
    watermark.className = 'watermark';
    watermark.textContent = 'معلم الشام - ' + new Date().toLocaleDateString('ar-SA');
    offerDetails.appendChild(watermark);
    
    html2canvas(offerDetails, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        // إزالة watermark بعد التصوير
        offerDetails.removeChild(watermark);
        
        // تحويل Canvas إلى صورة وحفظها
        const image = canvas.toDataURL('image/jpeg', 0.9);
        const link = document.createElement('a');
        link.download = 'معلم-الشام-عرض-خاص.jpg';
        link.href = image;
        link.click();
    });
}

// تحسين زر النسخ
function setupCopyButton() {
    const copyButton = document.querySelector('.copy-coupon');
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            const couponCode = document.querySelector('.coupon-code').textContent;
            navigator.clipboard.writeText(couponCode).then(() => {
                copyButton.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
                copyButton.classList.add('copied');
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i> نسخ الكود';
                    copyButton.classList.remove('copied');
                }, 2000);
            });
        });
    }
}

// تحديث دالة العد التنازلي لتظهر بالشكل الجديد
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    
    function formatTimeBlock(value, label) {
        return `
            <div class="countdown-block">
                ${value}
                <div class="countdown-label">${label}</div>
            </div>
        `;
    }
    
    function updateCountdown() {
        const now = new Date();
        const timeRemaining = offerEndTime - now;
        
        if (timeRemaining <= 0) {
            window.location.href = 'index.html';
            return;
        }
        
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = 
            formatTimeBlock(hours.toString().padStart(2, '0'), 'ساعة') +
            formatTimeBlock(minutes.toString().padStart(2, '0'), 'دقيقة') +
            formatTimeBlock(seconds.toString().padStart(2, '0'), 'ثانية');
        
        // إضافة تأثير نبض عند تغير الثواني
        const secondsBlock = countdownElement.lastElementChild;
        secondsBlock.style.animation = 'none';
        secondsBlock.offsetHeight; // trigger reflow
        secondsBlock.style.animation = 'pulse 1s';
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // تنظيف interval عند مغادرة الصفحة
    window.addEventListener('beforeunload', () => {
        clearInterval(countdownInterval);
    });
}

// إضافة دالة تحديث عرض المحاولات المتبقية
function updateRemainingAttempts(remaining) {
    const remainingAttemptsElement = document.getElementById('remaining-attempts');
    if (remainingAttemptsElement) {
        remainingAttemptsElement.textContent = remaining;
        if (remaining === 1) {
            remainingAttemptsElement.style.color = '#f44336';
        }
    }
}

// تحسين تجربة النقر على الأزرار
document.addEventListener('DOMContentLoaded', () => {
    if (!checkAttempts()) {
        return;
    }
    
    // حفظ صورة العرض المختار
    const urlParams = new URLSearchParams(window.location.search);
    const offerImage = urlParams.get('offer');
    if (offerImage) {
        localStorage.setItem('selectedOffer', offerImage);
    }
    
    selectRandomQuestions();
    loadQuestion();
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.addEventListener('click', () => checkAnswer(index));
    });
    
    // إضافة صوت عند النقر على الأزرار
    const buttonSound = document.getElementById('buttonSound');
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            buttonSound.currentTime = 0;
            buttonSound.play();
        });
    });
    
    // إضافة صوت النجاح عند إكمال الاختبار
    const successSound = document.getElementById('successSound');
    window.playSuccessSound = () => {
        successSound.play();
    };
});

// إضافة تتبع للمحاولات في localStorage
function updateAttempts() {
    const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '{}');
    const today = new Date().toDateString();
    
    if (attempts.date !== today) {
        attempts.date = today;
        attempts.count = 1;
        attempts.successes = 0;
    } else {
        attempts.count = (attempts.count || 0) + 1;
    }
    
    if (correctAnswers === selectedQuestions.length) {
        attempts.successes = (attempts.successes || 0) + 1;
    }
    
    localStorage.setItem('quizAttempts', JSON.stringify(attempts));
    updateRemainingAttemptsDisplay();
}

// تحديث عرض المحاولات المتبقية
function updateRemainingAttemptsDisplay() {
    const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '{}');
    const today = new Date().toDateString();
    const remainingAttempts = attempts.date === today ? Math.max(0, 3 - (attempts.count || 0)) : 3;
    
    const remainingElement = document.getElementById('remaining-attempts');
    if (remainingElement) {
        remainingElement.textContent = remainingAttempts;
        remainingElement.style.color = remainingAttempts === 1 ? '#f44336' : '#4CAF50';
    }
}

// تحديث نظام المحاولات اليومية
function initializeAttempts() {
    const today = new Date().toDateString();
    let attempts = JSON.parse(localStorage.getItem('quizAttempts') || '{}');
    
    if (attempts.date !== today) {
        attempts = {
            date: today,
            count: 0,
            successfulAttempts: 0,
            lastAttemptTime: null
        };
    }
    
    return attempts;
}

function canAttemptQuiz() {
    const attempts = initializeAttempts();
    const now = new Date();
    
    // التحقق من عدد المحاولات والوقت بين المحاولات
    if (attempts.count >= 3) {
        const nextAttemptDate = new Date(attempts.date);
        nextAttemptDate.setDate(nextAttemptDate.getDate() + 1);
        nextAttemptDate.setHours(0, 0, 0, 0);
        
        showMaxAttemptsMessage(nextAttemptDate);
        return false;
    }
    
    // التحقق من الوقت بين المحاولات (15 دقيقة على الأقل)
    if (attempts.lastAttemptTime) {
        const timeSinceLastAttempt = now - new Date(attempts.lastAttemptTime);
        const minimumWaitTime = 15 * 60 * 1000; // 15 دقيقة
        
        if (timeSinceLastAttempt < minimumWaitTime) {
            const waitMinutes = Math.ceil((minimumWaitTime - timeSinceLastAttempt) / 60000);
            showWaitMessage(waitMinutes);
            return false;
        }
    }
    
    return true;
}

function showWaitMessage(minutes) {
    document.querySelector('.quiz-content').innerHTML = `
        <div class="wait-message">
            <i class="fas fa-clock"></i>
            <h3>يرجى الانتظار</h3>
            <p>يجب الانتظار ${minutes} دقيقة قبل المحاولة التالية</p>
            <a href="index.html" class="back-button">
                <i class="fas fa-home"></i>
                العودة للصفحة الرئيسية
            </a>
        </div>
    `;
}

function startQuiz() {
    if (!canAttemptQuiz()) return;
    
    quizStartTime = new Date();
    const attempts = initializeAttempts();
    attempts.count++;
    attempts.lastAttemptTime = new Date().toISOString();
    localStorage.setItem('quizAttempts', JSON.stringify(attempts));
    
    selectRandomQuestions();
    loadQuestion();
    updateRemainingAttemptsDisplay();
}

function selectRandomQuestions() {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    selectedQuestions = shuffled.slice(0, 5); // اختيار 5 أسئلة عشوائية
}

function showSuccess() {
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    
    // تحديث نتائج المحاولات
    const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '{}');
    attempts.successfulAttempts = (attempts.successfulAttempts || 0) + 1;
    localStorage.setItem('quizAttempts', JSON.stringify(attempts));
    
    // حساب الوقت المستغرق
    const timeSpent = Math.floor((new Date() - quizStartTime) / 1000);
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    
    const content = `
        <div class="success-animation">
            <i class="fas fa-trophy"></i>
            <div class="confetti-container"></div>
        </div>
        <h2 class="result-title">
            تهانينا! لقد أجبت على ${correctAnswers} من ${selectedQuestions.length} أسئلة بشكل صحيح
            <div class="result-time">الوقت المستغرق: ${minutes}:${seconds.toString().padStart(2, '0')} دقيقة</div>
        </h2>
        <div class="achievement-badge">
            <i class="fas fa-award"></i>
            <span>أنت من خبراء معلم الشام!</span>
        </div>
        <div class="offer-details">
            <img src="${localStorage.getItem('selectedOffer')}" alt="العرض" class="offer-image">
            <div class="offer-info">
                <div class="coupon-container">
                    <h3>كود الخصم الخاص بك:</h3>
                    <div class="coupon-code shine-effect">MOALEM2024</div>
                    <button class="copy-coupon">
                        <i class="fas fa-copy"></i>
                        نسخ الكود
                    </button>
                </div>
                <div class="offer-instructions">
                    <h4><i class="fas fa-map-marker-alt"></i> مكان استلام العرض:</h4>
                    <p>فرع معلم الشام - شارع رغد، طريق الملك عبدالعزيز، ينبع البحر</p>
                    <div class="offer-actions">
                        <a href="https://maps.app.goo.gl/nxmRX66yb8y5pBaC7" class="directions-button" target="_blank">
                            <i class="fas fa-directions"></i>
                            احصل على الاتجاهات
                        </a>
                        <button class="save-offer" onclick="saveOffer()">
                            <i class="fas fa-download"></i>
                            حفظ العرض
                        </button>
                    </div>
                    <div class="offer-validity">
                        <p>ينتهي العرض خلال:</p>
                        <div id="countdown"></div>
                        <div class="expiry-date"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    resultContainer.innerHTML = content;
    createConfetti();
    setupCopyButton();
    startCountdown();
    playSuccessSound();
}

// إضافة تأثيرات الاحتفال
function createConfetti() {
    const colors = ['#e4b95b', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];
    const confettiContainer = document.querySelector('.confetti-container');
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confettiContainer.appendChild(confetti);
    }
}

// تحسين حفظ العرض
async function saveOffer() {
    const offerDetails = document.querySelector('.offer-details');
    
    // إضافة واترمارك
    const watermark = document.createElement('div');
    watermark.className = 'watermark';
    watermark.textContent = `معلم الشام - ${new Date().toLocaleDateString('ar-SA')}`;
    offerDetails.appendChild(watermark);
    
    try {
        const canvas = await html2canvas(offerDetails, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });
        
        // تحويل Canvas إلى صورة
        const image = canvas.toDataURL('image/jpeg', 0.9);
        const link = document.createElement('a');
        link.download = `معلم-الشام-عرض-خاص-${new Date().toLocaleDateString('ar-SA')}.jpg`;
        link.href = image;
        link.click();
        
        // إظهار رسالة نجاح
        showSaveSuccess();
    } catch (error) {
        console.error('Error saving offer:', error);
        showSaveError();
    } finally {
        offerDetails.removeChild(watermark);
    }
}

// إضافة رسائل النجاح والخطأ
function showSaveSuccess() {
    const message = document.createElement('div');
    message.className = 'save-message success';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>تم حفظ العرض بنجاح</span>
    `;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

function showSaveError() {
    const message = document.createElement('div');
    message.className = 'save-message error';
    message.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>حدث خطأ أثناء حفظ العرض</span>
    `;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}

// تهيئة الاختبار
document.addEventListener('DOMContentLoaded', () => {
    startQuiz();
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.addEventListener('click', () => checkAnswer(index));
    });
});