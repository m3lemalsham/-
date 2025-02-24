const questions = {
    restaurant: [
        {
            question: "ما هو سعر ساندويش الفلافل مع البيض في خبز تنوري؟",
            options: ["7 ريال", "8 ريال", "9 ريال", "10 ريال"],
            correct: 0,
            image: "images/ساندويش فلافل خبز تنوري مع بيض.jpg"
        },
        {
            question: "ما هو محتوى صحن الفلافل العربي المشكل الكبير؟",
            options: ["10 حبات فلافل", "12 حبة فلافل", "8 حبة فلافل", "20 حبة فلافل"],
            correct: 2,
            image: "images/صحن فلافل عربي مشكل-كبير.jpg"
        },
        {
            question: "ما هو المشروب الأكثر طلباً في المطعم؟",
            options: ["كينزا كولا", "كينزا برتقال", "كينزا سفن", "كينزا حمضيات"],
            correct: 0,
            image: "images/كينزا كولا.jpg"
        },
        {
            question: "كم سعر سندويش الفاهيتا؟",
            options: ["12 ريال", "15 ريال", "18 ريال", "20 ريال"],
            correct: 0,
            image: "images/سندويـش فاهيتا.jpg"
        },
        {
            question: "هل يتوفر في المطعم علبة بطاطس؟",
            options: ["نعم", "لا", "متوفر حسب الطلب", "متوفر في أوقات محددة"],
            correct: 0,
            image: "images/علبة بطاطس.jpg"
        }
    ],
    saudi: [
        {
            question: "ما هي عاصمة المملكة العربية السعودية؟",
            options: ["جدة", "مكة المكرمة", "الرياض", "المدينة المنورة"],
            correct: 2,
            image: "images/saudi-capital.jpg"
        },
        {
            question: "في أي عام تأسست المملكة العربية السعودية الحديثة؟",
            options: ["1902", "1932", "1950", "1960"],
            correct: 1,
            image: "images/saudi-foundation.jpg"
        },
        {
            question: "ما هو أطول جبل في المملكة العربية السعودية؟",
            options: ["جبل السودة", "جبل فيفا", "جبل اللوز", "جبل طويق"],
            correct: 0,
            image: "images/saudi-mountain.jpg"
        },
        {
            question: "ما هو أكبر مطار في المملكة العربية السعودية؟",
            options: ["مطار الملك خالد", "مطار الملك فهد", "مطار الملك عبدالعزيز", "مطار الأمير محمد بن عبدالعزيز"],
            correct: 0,
            image: "images/saudi-airport.jpg"
        },
        {
            question: "في أي مدينة يقع برج المملكة؟",
            options: ["جدة", "الرياض", "الدمام", "مكة المكرمة"],
            correct: 1,
            image: "images/saudi-tower.jpg"
        }
    ],
    general: [
        {
            question: "ما هو أكبر محيط في العالم؟",
            options: ["المحيط الأطلسي", "المحيط الهندي", "المحيط الهادئ", "المحيط المتجمد الشمالي"],
            correct: 2,
            image: "images/pacific-depth.jpg"
        },
        {
            question: "ما هي أكبر قارة في العالم؟",
            options: ["أفريقيا", "أمريكا الشمالية", "آسيا", "أوروبا"],
            correct: 2,
            image: "images/asia-continent.jpg"
        },
        {
            question: "كم عدد الكواكب في المجموعة الشمسية؟",
            options: ["7 كواكب", "8 كواكب", "9 كواكب", "10 كواكب"],
            correct: 1,
            image: "images/solar-system.jpg"
        },
        {
            question: "ما هي العملة الرسمية في اليابان؟",
            options: ["الين", "الوون", "اليوان", "الدولار"],
            correct: 0,
            image: "images/japan-currency.jpg"
        },
        {
            question: "ما هو أعمق محيط في العالم؟",
            options: ["المحيط الأطلسي", "المحيط الهندي", "المحيط الهادئ", "المحيط المتجمد الشمالي"],
            correct: 2,
            image: "images/pacific-depth.jpg"
        }
    ],
    religious: [
        {
            question: "كم عدد ركعات صلاة الظهر؟",
            options: ["2 ركعات", "3 ركعات", "4 ركعات", "5 ركعات"],
            correct: 2,
            image: "images/prayer.jpg"
        },
        {
            question: "في أي شهر هجري يكون صيام رمضان؟",
            options: ["شعبان", "رمضان", "شوال", "رجب"],
            correct: 1,
            image: "images/ramadan.jpg"
        },
        {
            question: "ما هو أول مسجد بُني في الإسلام؟",
            options: ["المسجد النبوي", "المسجد الحرام", "مسجد قباء", "مسجد القبلتين"],
            correct: 2,
            image: "images/quba-mosque.jpg"
        },
        {
            question: "كم عدد أركان الإسلام؟",
            options: ["3 أركان", "4 أركان", "5 أركان", "6 أركان"],
            correct: 2,
            image: "images/islam-pillars.jpg"
        },
        {
            question: "ما هي أول سورة نزلت في القرآن الكريم؟",
            options: ["الفاتحة", "العلق", "البقرة", "يس"],
            correct: 1,
            image: "images/quran.jpg"
        }
    ]
};

// Generate a random coupon code
function generateCouponCode() {
    const prefix = "M3lem";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = prefix;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Add more detailed educational facts for each category
const educationalFacts = {
    restaurant: [
        "تعلمنا عن المطعم وما يقدمه من وجبات شهية",
        "تعرفنا على أسعار"],
    saudi: [
        "تم توحيد المملكة العربية السعودية في عام 1932 على يد الملك عبدالعزيز",
        "يبلغ ارتفاع جبل السودة 3000 متر عن سطح البحر",
        "مطار الملك خالد الدولي هو أكبر مطار في المملكة",
    ],
    general: [
        "يحتوي المحيط الهادئ على أعمق نقطة في العالم - أخدود ماريانا",
        "تشكل قارة آسيا 30% من مساحة اليابسة على الأرض",
        "تم اكتشاف أن بلوتو ليس كوكباً في عام 2006 لذالك يوجد 7 كواكب في المجموعة الشمسية",
    ],
    religious: [
        "استغرق نزول القرآن الكريم 23 عاماً كاملة",
        "مسجد قباء هو أول مسجد بُني في الإسلام وما زال قائماً حتى اليوم",
        "تم تنزيل سورة العلق اول سورة  في الكتاب العزيز"]
};

// Add learning resources with more detailed content
const learningResources = {
    restaurant: [
        {
            title: "دليل الوجبات الصحية والقيم الغذائية",
            link: "#",
            icon: "fa-heartbeat",
            description: "تعرف على القيم الغذائية لكل وجباتنا والفوائد الصحية"
        },
        {
            title: "تاريخ المطبخ الشامي التقليدي",
            link: "#",
            icon: "fa-utensils",
            description: "رحلة عبر التاريخ في أصول وتطور المأكولات الشامية"
        },
        {
            title: "نصائح للحفاظ على نمط حياة صحي",
            link: "#",
            icon: "fa-apple-alt",
            description: "إرشادات وتوصيات لاختيار الوجبات المناسبة"
        }
    ],
    saudi: [
        {
            title: "رحلة عبر تاريخ المملكة",
            link: "#",
            icon: "fa-history",
            description: "استكشف المراحل التاريخية لتأسيس وتطور المملكة"
        },
        {
            title: "أطلس المملكة التفاعلي",
            link: "#",
            icon: "fa-map-marked-alt",
            description: "خريطة تفاعلية للمواقع التاريخية والسياحية"
        }
    ],
    general: [
        {
            title: "عجائب العالم السبع",
            link: "#",
            icon: "fa-monument",
            description: "تعرف على أشهر المعالم التاريخية في العالم"
        },
        {
            title: "حقائق علمية مذهلة",
            link: "#",
            icon: "fa-atom",
            description: "اكتشف أحدث الحقائق العلمية المثيرة"
        }
    ],
    religious: [
        {
            title: "تاريخ المساجد الثلاثة",
            link: "#",
            icon: "fa-mosque",
            description: "معلومات تفصيلية عن المساجد المقدسة في الإسلام"
        },
        {
            title: "أركان الإسلام والإيمان",
            link: "#",
            icon: "fa-star-and-crescent",
            description: "شرح مفصل لأساسيات العقيدة الإسلامية"
        }
    ]
};

// Add user progress tracking
let userProgress = {
    restaurant: { attempts: 0, bestScore: 0, totalCorrect: 0 },
    saudi: { attempts: 0, bestScore: 0, totalCorrect: 0 },
    general: { attempts: 0, bestScore: 0, totalCorrect: 0 },
    religious: { attempts: 0, bestScore: 0, totalCorrect: 0 }
};

// Load progress from localStorage if exists
function loadProgress() {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
        userProgress = JSON.parse(savedProgress);
    }
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('quizProgress', JSON.stringify(userProgress));
}

function updateProgress(category, currentScore) {
    if (!userProgress[category]) {
        userProgress[category] = { attempts: 0, bestScore: 0, totalCorrect: 0 };
    }
    
    userProgress[category].attempts++;
    userProgress[category].totalCorrect += score;
    userProgress[category].bestScore = Math.max(userProgress[category].bestScore, currentScore);
    
    saveProgress();
}

let currentCategory = '';
let currentQuestionIndex = 0;
let score = 0;

function selectCategory(category) {
    // التحقق من وجود الفئة
    if (!questions[category]) {
        console.error('فئة الأسئلة غير موجودة');
        return;
    }

    // إعادة تعيين المتغيرات
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;

    // تحديث المحتوى
    const quizContent = document.querySelector('.quiz-content');
    quizContent.innerHTML = `
        <div id="question-container">
            <div class="question-header">
                <div class="progress-bar">
                    <div class="progress"></div>
                </div>
                <div class="question-counter">
                    <span class="current"></span>
                    <span class="total"></span>
                </div>
            </div>
            <div class="question-content">
                <div class="question-text"></div>
                <div class="image-container"></div>
                <div class="options-grid"></div>
            </div>
        </div>
    `;

    // عرض السؤال الأول
    showQuestion();
}

function updateUIForQuestions() {
    const quizContent = document.querySelector('.quiz-content');
    
    // التأكد من وجود حاوية الأسئلة
    if (!document.getElementById('question-container')) {
        // إضافة حاوية الأسئلة إذا لم تكن موجودة
        const questionContainer = document.createElement('div');
        questionContainer.id = 'question-container';
        questionContainer.innerHTML = `
            <div class="question-header">
                <div class="progress-bar">
                    <div class="progress"></div>
                </div>
                <div class="question-counter">
                    <span class="current"></span>
                    <span class="total"></span>
                </div>
            </div>
            <div class="question-content">
                <div class="question-text"></div>
                <div class="image-container"></div>
                <div class="options-grid"></div>
            </div>
        `;
        quizContent.appendChild(questionContainer);
    }

    // إخفاء قائمة الفئات وإظهار الأسئلة
    const categoryContainer = document.getElementById('category-container');
    const questionContainer = document.getElementById('question-container');
    
    if (categoryContainer) categoryContainer.style.display = 'none';
    if (questionContainer) {
        questionContainer.style.display = 'block';
        showQuestion(); // عرض السؤال الأول
    }
}

function showQuestion() {
    // التأكد من وجود الفئة والأسئلة
    if (!currentCategory || !questions[currentCategory]) {
        console.error('لا توجد فئة أسئلة محددة');
        return;
    }

    const currentQuestion = questions[currentCategory][currentQuestionIndex];
    if (!currentQuestion) {
        console.error('لا يوجد سؤال للعرض');
        return;
    }

    // تحديث شريط التقدم
    const progressElement = document.querySelector('.progress');
    if (progressElement) {
        const progress = ((currentQuestionIndex + 1) / questions[currentCategory].length) * 100;
        progressElement.style.width = `${progress}%`;
    }

    // تحديث عداد الأسئلة
    const currentElement = document.querySelector('.current');
    const totalElement = document.querySelector('.total');
    if (currentElement && totalElement) {
        currentElement.textContent = `السؤال ${currentQuestionIndex + 1}`;
        totalElement.textContent = `من ${questions[currentCategory].length}`;
    }

    // عرض نص السؤال
    const questionTextElement = document.querySelector('.question-text');
    if (questionTextElement) {
        questionTextElement.textContent = currentQuestion.question;
    }

    // عرض الصورة
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
        if (currentQuestion.image) {
            imageContainer.innerHTML = `<img src="${currentQuestion.image}" class="question-image" alt="صورة السؤال">`;
            imageContainer.style.display = 'block';
        } else {
            imageContainer.style.display = 'none';
        }
    }

    // عرض الخيارات
    const optionsGrid = document.querySelector('.options-grid');
    if (optionsGrid) {
        optionsGrid.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            const optionButton = document.createElement('button');
            optionButton.className = 'option';
            optionButton.textContent = option;
            optionButton.onclick = () => checkAnswer(index);
            optionsGrid.appendChild(optionButton);
        });
    }

    // Show random educational fact
    const factsPanel = document.querySelector('.facts-panel');
    if (factsPanel) {
        const facts = educationalFacts[currentCategory];
        if (facts && facts.length > 0) {
            const randomFact = facts[Math.floor(Math.random() * facts.length)];
            const factContent = factsPanel.querySelector('.fact-content');
            if (factContent) {
                factContent.textContent = randomFact;
                factsPanel.style.display = 'block';
                factsPanel.classList.add('fade-in');
            }
        }
    }

    // Show learning resources
    showLearningResources();
}

function showLearningResources() {
    const resourcesList = document.querySelector('.resources-list');
    const resourcesPanel = document.querySelector('.resources-panel');
    
    if (resourcesList && resourcesPanel) {
        const resources = learningResources[currentCategory];
        if (resources && resources.length > 0) {
            resourcesList.innerHTML = resources.map(resource => `
                <a href="${resource.link}" class="resource-link" target="_blank">
                    <i class="fas ${resource.icon}"></i>
                    <span>${resource.title}</span>
                </a>
            `).join('');
            resourcesPanel.style.display = 'block';
            resourcesPanel.classList.add('fade-in');
        }
    }
}

function checkAnswer(selectedIndex) {
    // التحقق من وجود السؤال الحالي
    if (!currentCategory || !questions[currentCategory] || !questions[currentCategory][currentQuestionIndex]) {
        console.error('لا يوجد سؤال حالي');
        return;
    }

    const currentQuestion = questions[currentCategory][currentQuestionIndex];
    const options = document.querySelectorAll('.option');

    // تعطيل جميع الأزرار لمنع النقر المتكرر
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    // التحقق من الإجابة
    if (selectedIndex === currentQuestion.correct) {
        options[selectedIndex].classList.add('correct');
        score++;
        playSound('correct');
    } else {
        options[selectedIndex].classList.add('wrong');
        options[currentQuestion.correct].classList.add('correct');
        playSound('wrong');
    }

    // الانتقال للسؤال التالي بعد ثانية واحدة
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions[currentCategory].length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function playSound(type) {
    const sound = document.getElementById(type + 'Sound');
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(error => {
            console.log('فشل تشغيل الصوت:', error);
        });
    }
}

function restartQuiz() {
    // إعادة تعيين المتغيرات
    currentCategory = '';
    currentQuestionIndex = 0;
    score = 0;
    
    // إعادة عرض الفئات
    showCategories();
}

// Helper functions for dates
function formatDate() {
    const now = new Date();
    return now.toLocaleDateString('ar-SA', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatEndTime(date) {
    return date.toLocaleTimeString('ar-SA', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function formatTimeRemaining(endDate) {
    const now = new Date();
    const diff = endDate - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} ساعة و ${minutes} دقيقة`;
}

function startCountdown(endDate) {
    const countdown = setInterval(() => {
        const now = new Date();
        const diff = endDate - now;
        
        if (diff <= 0) {
            clearInterval(countdown);
            document.querySelector('.timer-container').innerHTML = '<p>انتهت صلاحية الكود</p>';
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Confetti animation
function startConfetti() {
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    confetti.style.opacity = Math.random();
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    
    document.body.appendChild(confetti);
    
    confetti.addEventListener('animationend', () => {
        confetti.remove();
    });
}

const customTips = {
    restaurant: {
        low: [
            "راجع قائمة الطعام وأسعار الوجبات بشكل منتظم",
            "تعرف على المكونات الأساسية في كل وجبة",
            "احفظ أسماء المشروبات المتوفرة وأنواعها"
        ],
        medium: [
            "ركز على الفروق بين أحجام الوجبات المختلفة",
            "تعرف على العروض الخاصة والوجبات المميزة"
        ],
        high: [
            "أحسنت! أنت خبير في قائمة المطعم",
            "شارك معرفتك مع الآخرين"
        ]
    },
    saudi: {
        low: [
            "اقرأ المزيد عن تاريخ المملكة العربية السعودية",
            "تعرف على أهم المدن والمعالم السعودية",
            "اطلع على الأحداث التاريخية المهمة"
        ],
        medium: [
            "ركز على التواريخ المهمة في تاريخ المملكة",
            "تعمق في معرفة الجغرافيا السعودية"
        ],
        high: [
            "ممتاز! أنت ملم بتاريخ المملكة",
            "واصل الاطلاع على التطورات الحديثة"
        ]
    },
    religious: {
        low: [
            "راجع أركان الإسلام والإيمان",
            "تعرف على تاريخ المساجد المقدسة",
            "اقرأ عن السيرة النبوية"
        ],
        medium: [
            "ركز على فهم الأحكام الشرعية الأساسية",
            "اطلع على تاريخ الإسلام بشكل أعمق"
        ],
        high: [
            "ممتاز! معرفتك الدينية جيدة",
            "شارك علمك مع الآخرين"
        ]
    },
    general: {
        low: [
            "اقرأ المزيد عن الثقافة العامة",
            "تابع الأخبار والمستجدات العالمية",
            "اهتم بالمعلومات العلمية الأساسية"
        ],
        medium: [
            "وسع نطاق قراءاتك في مختلف المجالات",
            "اربط بين المعلومات المختلفة"
        ],
        high: [
            "ممتاز! ثقافتك العامة واسعة",
            "واصل الاطلاع والقراءة"
        ]
    }
};

function getCustomTips(category, percentage) {
    let level;
    if (percentage < 60) level = 'low';
    else if (percentage < 80) level = 'medium';
    else level = 'high';

    return customTips[category][level];
}

function showResults() {
    const quizContent = document.querySelector('.quiz-content');
    const numQuestions = questions[currentCategory].length;
    const percentage = (score / numQuestions) * 100;
    const couponCode = generateCouponCode();
    
    // Update progress before showing results
    updateProgress(currentCategory, percentage);
    
    let resultMessage, resultClass;
    if (percentage >= 80) {
        resultMessage = 'ممتاز! أحسنت الإجابة 🎉';
        resultClass = 'excellent';
        playSound('success');
    } else if (percentage >= 60) {
        resultMessage = 'جيد! يمكنك التحسين 💪';
        resultClass = 'good';
        playSound('correct');
    } else {
        resultMessage = 'للأسف لم تنجح في الاختبار 😔';
        resultClass = 'try-again';
        playSound('wrong');
    }

    // Calculate statistics
    const categoryStats = userProgress[currentCategory];
    const averageScore = categoryStats.attempts > 0 
        ? (categoryStats.totalCorrect / categoryStats.attempts).toFixed(1) 
        : 0;

    const currentDate = formatDate();
    const expiryDate = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
    const endTimeFormatted = formatEndTime(expiryDate);
    const timeRemaining = formatTimeRemaining(expiryDate);
    
    const tips = getCustomTips(currentCategory, percentage);
    const progressStats = userProgress[currentCategory];
    
    if (percentage >= 60) {
        quizContent.innerHTML = `
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
                        <span class="total-questions">/${numQuestions}</span>
                    </div>
                    <p class="percentage">${percentage}%</p>
                </div>
                
                <div class="coupon-container shine-effect">
                    <h3>🎁 كود الخصم الخاص بك:</h3>
                    <div class="coupon-code">${couponCode}</div>
                    <div class="timer-container">
                        <div class="timer-block">
                            <span class="timer-value" id="hours">02</span>
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
                    <button class="copy-coupon" onclick="copyCode('${couponCode}')">
                        <i class="fas fa-copy"></i>
                        نسخ الكود
                    </button>
                </div>
                
                <!-- Educational Summary -->
                <div class="education-summary">
                    <h3><i class="fas fa-graduation-cap"></i> ملخص تعليمي</h3>
                    <div class="summary-content">
                        <p>لقد تعلمت اليوم:</p>
                        <ul class="learned-list">
                            ${educationalFacts[currentCategory]
                                .slice(0, 3)
                                .map(fact => `<li><i class="fas fa-check"></i> ${fact}</li>`)
                                .join('')}
                        </ul>
                    </div>
                    
                    <div class="recommended-resources">
                        <h4><i class="fas fa-book-reader"></i> مصادر مقترحة للمزيد من التعلم</h4>
                        <div class="resources-grid">
                            ${learningResources[currentCategory]
                                .map(resource => `
                                    <div class="resource-card">
                                        <i class="fas ${resource.icon}"></i>
                                        <h5>${resource.title}</h5>
                                        <p>${resource.description}</p>
                                        <a href="${resource.link}" class="resource-btn">
                                            تعلم المزيد
                                            <i class="fas fa-arrow-left"></i>
                                        </a>
                                    </div>
                                `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="buttons-container">
                    <button class="try-again-btn" onclick="restartQuiz()">
                        <i class="fas fa-redo"></i>
                        محاولة أخرى
                    </button>
                    <button class="home-btn" onclick="window.location.href='index.html'">
                        <i class="fas fa-home"></i>
                        العودة للصفحة الرئيسية
                    </button>
                </div>
                
                <!-- Progress Statistics -->
                <div class="progress-stats">
                    <h3><i class="fas fa-chart-line"></i> إحصائيات أدائك</h3>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <i class="fas fa-trophy"></i>
                            <span class="stat-label">أفضل نتيجة</span>
                            <span class="stat-value">${categoryStats.bestScore}%</span>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-medal"></i>
                            <span class="stat-label">معدل النتائج</span>
                            <span class="stat-value">${averageScore}</span>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-sync-alt"></i>
                            <span class="stat-label">عدد المحاولات</span>
                            <span class="stat-value">${categoryStats.attempts}</span>
                        </div>
                    </div>
                </div>

                <!-- Custom Tips Section -->
                <div class="tips-section">
                    <h3><i class="fas fa-lightbulb"></i> نصائح مخصصة لتحسين أدائك</h3>
                    <div class="tips-grid">
                        ${tips.map(tip => `
                            <div class="tip-card">
                                <i class="fas fa-star"></i>
                                <p>${tip}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Performance Graph -->
                <div class="performance-graph">
                    <h3><i class="fas fa-chart-line"></i> تطور أدائك</h3>
                    <div class="graph-container">
                        <div class="progress-bar">
                            <div class="progress" style="width: ${percentage}%"></div>
                        </div>
                        <div class="graph-labels">
                            <span>النتيجة الحالية: ${percentage}%</span>
                            <span>أفضل نتيجة: ${progressStats.bestScore}%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        startConfetti();
        startCountdown(expiryDate);
    } else {
        // Show failure message for scores below 60%
        quizContent.innerHTML = `
            <div class="result-container ${resultClass}">
                <div class="fail-animation">
                    <i class="fas fa-times-circle"></i>
                </div>
                <h2 class="result-title">${resultMessage}</h2>
                
                <div class="score-details">
                    <div class="score-circle">
                        <span class="score-number">${score}</span>
                        <span class="total-questions">/${numQuestions}</span>
                    </div>
                    <p class="percentage">${percentage}%</p>
                </div>
                
                <p class="fail-message">لم تحصل على العرض، يرجى إعادة المحاولة للحصول على نتيجة أفضل</p>
                
                <div class="buttons-container">
                    <button class="try-again-btn" onclick="restartQuiz()">
                        <i class="fas fa-redo"></i>
                        حاول مرة أخرى
                    </button>
                    <button class="home-btn" onclick="window.location.href='index.html'">
                        <i class="fas fa-home"></i>
                        العودة للصفحة الرئيسية
                    </button>
                </div>
            </div>
        `;

        const tips = [
            "راجع المعلومات في قسم 'هل تعلم' قبل المحاولة التالية",
            "اقرأ السؤال بتمعن قبل اختيار الإجابة",
            "استفد من المصادر التعليمية المتوفرة لكل فئة",
            "ركز على الأسئلة التي أخطأت فيها"
        ];

        const tipsContainer = document.getElementById('tips-container');
        const tipsList = document.querySelector('.tips-list');
        
        if (tipsContainer && tipsList) {
            tipsList.innerHTML = tips.map(tip => `
                <li><i class="fas fa-check-circle"></i> ${tip}</li>
            `).join('');
            tipsContainer.style.display = 'block';
            tipsContainer.classList.add('fade-in');
        }
    }
}

// Update the copyCode function to accept the dynamic code
function copyCode(code) {
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

// إضافة مستمع لتحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // التأكد من أن كل العناصر موجودة عند بدء التطبيق
    loadProgress();
    initializeQuiz();
});

function initializeQuiz() {
    // التأكد من وجود حاوية الاختبار
    const quizContent = document.querySelector('.quiz-content');
    if (!quizContent) {
        console.error('لم يتم العثور على حاوية الاختبار');
        return;
    }

    // إعادة تعيين المتغيرات العامة
    currentCategory = '';
    currentQuestionIndex = 0;
    score = 0;

    // عرض قائمة الفئات
    showCategories();
}

function showCategories() {
    const quizContent = document.querySelector('.quiz-content');
    if (quizContent) {
        quizContent.innerHTML = `
            <h2>اختبر معلوماتك واحصل على خصم خاص</h2>
            <div id="category-container">
                <h3>اختر فئة الأسئلة</h3>
                <div class="category-grid">
                    <div class="category-btn" onclick="selectCategory('restaurant')">
                        <div class="category-icon">
                            <i class="fas fa-utensils"></i>
                        </div>
                        <div class="category-title">أسئلة عن المطعم</div>
                        <div class="category-description">اختبر معرفتك بقائمة الطعام والأسعار والخدمات</div>
                        <div class="category-stats">5 أسئلة</div>
                    </div>

                    <div class="category-btn" onclick="selectCategory('saudi')">
                        <div class="category-icon">
                            <i class="fas fa-landmark"></i>
                        </div>
                        <div class="category-title">تاريخ السعودية</div>
                        <div class="category-description">اختبر معرفتك بتاريخ وجغرافيا المملكة</div>
                        <div class="category-stats">5 أسئلة</div>
                    </div>

                    <div class="category-btn" onclick="selectCategory('general')">
                        <div class="category-icon">
                            <i class="fas fa-globe"></i>
                        </div>
                        <div class="category-title">معلومات عامة</div>
                        <div class="category-description">اختبر معلوماتك العامة</div>
                        <div class="category-stats">5 أسئلة</div>
                    </div>

                    <div class="category-btn" onclick="selectCategory('religious')">
                        <div class="category-icon">
                            <i class="fas fa-mosque"></i>
                        </div>
                        <div class="category-title">أسئلة دينية</div>
                        <div class="category-description">اختبر معرفتك الدينية</div>
                        <div class="category-stats">5 أسئلة</div>
                    </div>
                </div>
            </div>
        `;
    }
}

// التأكد من تهيئة الاختبار عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', (event) => {
    initializeQuiz();
});