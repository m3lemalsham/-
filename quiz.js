const questions = [
    {
        question: "ما هو السعر الأساسي لصحن الفلافل العربي المشكل - صغير؟",
        options: ["10 ريال", "13 ريال", "15 ريال", "20 ريال"],
        correct: 1 // 13 ريال
    },
    {
        question: "كم عدد حبات الفلافل في صحن الفلافل الوسط؟",
        options: ["20 حبة", "25 حبة", "30 حبة", "35 حبة"],
        correct: 2 // 30 حبة
    },
    {
        question: "ما هو وقت الدوام في الفترة الصباحية؟",
        options: [
            "5:00 صباحاً - 12:00 مساءً",
            "6:00 صباحاً - 12:30 مساءً",
            "6:30 صباحاً - 1:00 مساءً",
            "7:00 صباحاً - 12:00 مساءً"
        ],
        correct: 1 // 6:00 صباحاً - 12:30 مساءً
    },
    {
        question: "ما هو وقت الدوام في الفترة المسائية؟",
        options: [
            "4:00 - 11:00 مساءً",
            "5:00 مساءً - 12:30 منتصف الليل",
            "5:30 - 11:30 مساءً",
            "6:00 - 12:00 مساءً"
        ],
        correct: 1 // 5:00 مساءً - 12:30 منتصف الليل
    },
    {
        question: "كم سعر سندويش الفلافل بالخبز الشامي؟",
        options: ["3 ريال", "4 ريال", "5 ريال", "6 ريال"],
        correct: 1 // 4 ريال
    },
    {
        question: "ما هو سعر علبة الحمص؟",
        options: ["3 ريال", "4 ريال", "5 ريال", "6 ريال"],
        correct: 2 // 5 ريال
    },
    {
        question: "ماذا يحتوي صحن الفلافل العربي المشكل - كبير؟",
        options: [
            "3 سندويش فلافل وحمص وبطاطس",
            "4 سندويش فلافل تنوري وحمص وبطاطس ومخلل و8 حبات فلافل و3 بيض",
            "2 سندويش فلافل و2 سندويش دجاج",
            "5 سندويش فلافل وبطاطس"
        ],
        correct: 1
    },
    {
        question: "ما هو سعر علبة المخلل المشكل؟",
        options: ["2 ريال", "3 ريال", "4 ريال", "5 ريال"],
        correct: 1 // 3 ريال
    },
    {
        question: "كم عدد السندويشات في صحن الفلافل - كبير؟",
        options: [
            "2 سندويش فلافل و2 سندويش دجاج",
            "3 سندويشات فلافل",
            "4 سندويشات فلافل",
            "5 سندويشات فلافل"
        ],
        correct: 0 // 2 سندويش فلافل و2 سندويش دجاج
    },
    {
        question: "ما هو سعر الكساديا بالفلافل؟",
        options: ["8 ريال", "9 ريال", "10 ريال", "12 ريال"],
        correct: 2 // 10 ريال
    },
    {
        question: "ما هي مكونات سندويش الفلافل بالخبز التنوري؟",
        options: [
            "فلافل وخضار فقط",
            "فلافل مع صلصة خاصة",
            "فلافل طازجة مع خضار في خبز تنوري",
            "فلافل مع بيض وخضار"
        ],
        correct: 2
    },
    {
        question: "ما هو سعر المشروبات (كينزا)؟",
        options: ["2 ريال", "3 ريال", "4 ريال", "5 ريال"],
        correct: 1 // 3 ريال
    }
];

let currentQuestion = 0;
let score = 0;

// تحديد تاريخ انتهاء الكود (اليوم المحدد + الساعة)
const today = new Date();
const endTime = new Date(today);
// تعيين وقت الانتهاء إلى ساعتين من الوقت الحالي
endTime.setHours(endTime.getHours() + 2);

// الرسائل التحفيزية
const motivationalMessages = [
    "أحسنت! استمر في التقدم! 🌟",
    "رائع جداً! أنت تفعل ذلك بشكل جيد! 💪",
    "ممتاز! حافظ على هذا المستوى! 🎯",
    "أداء مذهل! أنت قريب من النجاح! ⭐"
];

function showMotivationalMessage(correct) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'motivational-message';
    messageDiv.textContent = correct ? 
        motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)] :
        "لا بأس، حاول مرة أخرى! 💪";
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 2000);
}

// دالة لخلط الأسئلة بشكل عشوائي
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// اختيار 4 أسئلة عشوائية
let selectedQuestions = [];

function selectRandomQuestions() {
    const shuffledQuestions = shuffleArray([...questions]);
    selectedQuestions = shuffledQuestions.slice(0, 4);
    return selectedQuestions;
}

function loadQuestion() {
    const questionObj = selectedQuestions[currentQuestion];
    const questionContainer = document.getElementById('question-container') || document.createElement('div');
    questionContainer.id = 'question-container';
    questionContainer.innerHTML = `
        <div class="question-header">
            <div class="progress-bar">
                <div class="progress" style="width: ${(currentQuestion / 4) * 100}%"></div>
            </div>
            <div class="question-counter">
                <span class="current">السؤال ${currentQuestion + 1}</span>
                <span class="total">من 4</span>
            </div>
        </div>
        
        <div class="question-content">
            <div class="question-text">${questionObj.question}</div>
            <div class="options-grid"></div>
        </div>
    `;

    if (!document.getElementById('question-container')) {
        document.querySelector('.quiz-container').appendChild(questionContainer);
    }

    const optionsContainer = questionContainer.querySelector('.options-grid');
    optionsContainer.innerHTML = '';
    
    questionObj.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option shine-effect';
        button.innerHTML = `
            <span class="option-text">${option}</span>
            <div class="option-indicator"></div>
        `;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const questionObj = selectedQuestions[currentQuestion];
    const buttons = document.querySelectorAll('.option');
    
    buttons.forEach(button => button.disabled = true);

    if (selectedOption === questionObj.correct) {
        buttons[selectedOption].classList.add('correct');
        score++;
        playSound('correct');
        showMotivationalMessage(true);
    } else {
        buttons[selectedOption].classList.add('wrong');
        buttons[questionObj.correct].classList.add('correct');
        playSound('wrong');
        showMotivationalMessage(false);
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < 4) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

function getHijriDate() {
    const today = new Date();
    const options = { calendar: 'islamic', day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('ar-SA', options).format(today);
}

function getGregorianDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('ar-SA', options).format(today);
}

function formatDate() {
    const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const months = ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    const today = new Date();
    const dayName = days[today.getDay()];
    const monthName = months[today.getMonth()];
    const day = today.getDate();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const ampm = hours >= 12 ? 'مساءً' : 'صباحاً';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${dayName} ${day} ${monthName} - ${formattedHours}:${formattedMinutes} ${ampm}`;
}

function formatTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours} ساعة و ${minutes} دقيقة`;
}

function formatEndTime(date) {
    const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const dayName = days[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'مساءً' : 'صباحاً';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${dayName} - ${formattedHours}:${formattedMinutes} ${ampm}`;
}

function showResults() {
    const resultContainer = document.querySelector('.quiz-container');
    const percentage = (score / 4) * 100;
    
    let resultMessage, resultClass;
    if (percentage >= 80) {
        resultMessage = 'ممتاز! أحسنت الإجابة 🎉';
        resultClass = 'excellent';
    } else if (percentage >= 60) {
        resultMessage = 'جيد! يمكنك التحسين 💪';
        resultClass = 'good';
    } else {
        resultMessage = 'حاول مرة أخرى للحصول على نتيجة أفضل 🎯';
        resultClass = 'try-again';
    }

    const currentDate = formatDate();
    const endTimeFormatted = formatEndTime(endTime);
    const timeRemaining = formatTimeRemaining(endTime);
    
    resultContainer.innerHTML = `
        <div class="result-container ${resultClass}">
            <div class="success-animation">
                <i class="fas fa-star"></i>
            </div>
            <h2 class="result-title">${resultMessage}</h2>
            
            <div class="date-time-container">
                <div class="current-time">
                    <i class="fas fa-calendar-alt"></i>
                    <span>اليوم والوقت: ${currentDate}</span>
                </div>
                <div class="expire-time">
                    <i class="fas fa-hourglass-end"></i>
                    <span>ينتهي في: ${endTimeFormatted}</span>
                </div>
                <div class="remaining-time">
                    <i class="fas fa-clock"></i>
                    <span>المدة المتبقية: ${timeRemaining}</span>
                </div>
            </div>

            <div class="score-details">
                <div class="score-circle">
                    <span class="score-number">${score}</span>
                    <span class="total-questions">/4</span>
                </div>
                <p class="percentage">${percentage}%</p>
            </div>
            
            <div class="coupon-container shine-effect">
                <h3>🎁 كود الخصم الخاص بك:</h3>
                <div class="coupon-code">MOALEM2024</div>
                <div class="timer-container">
                    <div class="timer-block">
                        <span class="timer-value" id="hours">00</span>
                        <span class="timer-label">ساعة</span>
                    </div>
                    <div class="timer-separator">:</div>
                    <div class="timer-block">
                        <span class="timer-value" id="minutes">00</span>
                        <span class="timer-label">دقيقة</span>
                    </div>
                    <div class="timer-separator">:</div>
                    <div class="timer-block">
                        <span class="timer-value" id="seconds">00</span>
                        <span class="timer-label">ثانية</span>
                    </div>
                </div>
                <button class="copy-coupon" onclick="copyCode()">
                    <i class="fas fa-copy"></i>
                    نسخ الكود
                </button>
            </div>
            
            <div class="buttons-container">
                <button class="try-again-btn" onclick="restartQuiz()">
                    <i class="fas fa-redo"></i>
                    حاول مرة أخرى بأسئلة جديدة
                </button>
                <a href="index.html" class="home-btn">
                    <div class="home-btn-content">
                        <i class="fas fa-home"></i>
                        <span>الرجوع للصفحة الرئيسية</span>
                        <i class="fas fa-chevron-left"></i>
                    </div>
                </a>
            </div>
        </div>
    `;

    startConfetti();
    startCountdown();
}

function startConfetti() {
    const confettiCount = 100;
    const confettiColors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
    
    for (let i = 0; i < confettiCount; i++) {
        createConfetti(confettiColors[Math.floor(Math.random() * confettiColors.length)]);
    }
}

function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.opacity = Math.random();
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 5000);
}

function playSound(type) {
    const audio = new Audio();
    if (type === 'correct') {
        audio.src = 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3';
    } else {
        audio.src = 'https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3';
    }
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Error playing sound:', e));
}

function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((total % (1000 * 60)) / 1000);
    
    return {
        total,
        hours,
        minutes,
        seconds
    };
}

function startCountdown() {
    const countdownTimer = setInterval(() => {
        const timeLeft = getTimeRemaining(endTime);
        
        document.getElementById('hours').textContent = String(timeLeft.hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(timeLeft.minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(timeLeft.seconds).padStart(2, '0');

        if (timeLeft.total <= 0) {
            clearInterval(countdownTimer);
            document.querySelector('.timer-container').innerHTML = '<div class="expired">انتهت صلاحية الكود</div>';
            document.querySelector('.copy-coupon').disabled = true;
            document.querySelector('.copy-coupon').style.opacity = '0.5';
        }
    }, 1000);
}

function copyCode() {
    const code = 'MOALEM2024';
    navigator.clipboard.writeText(code).then(() => {
        const copyButton = document.querySelector('.copy-coupon');
        copyButton.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
        copyButton.classList.add('copied');
        
        setTimeout(() => {
            copyButton.innerHTML = '<i class="fas fa-copy"></i> نسخ الكود';
            copyButton.classList.remove('copied');
        }, 2000);
    });
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectRandomQuestions(); // اختيار أسئلة جديدة عند إعادة الاختبار
    loadQuestion();
}

// بدء الاختبار
document.addEventListener('DOMContentLoaded', () => {
    selectRandomQuestions(); // اختيار الأسئلة العشوائية عند بدء الاختبار
    loadQuestion();
});