
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const generateBtn = document.getElementById('generate-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const langSelector = document.getElementById('lang-selector');
    const gameSelector = document.getElementById('game-selector');
    const numbersContainer = document.getElementById('numbers-container');
    const body = document.body;
    
    // UI Text Elements
    const appTitle = document.getElementById('app-title');
    const gameLabel = document.getElementById('game-label');
    const infoTitle = document.getElementById('info-title');
    const infoDesc = document.getElementById('info-desc');
    const disclaimerText = document.getElementById('disclaimer-text');
    const contactTitle = document.getElementById('contact-title');
    const commentsTitle = document.getElementById('comments-title');
    const sendBtn = document.getElementById('send-btn');
    const emailPlaceholder = document.getElementById('email-placeholder');
    const messagePlaceholder = document.getElementById('message-placeholder');

    // State
    let currentLang = 'en';
    let currentGameKey = 'lotto_kr';

    // Game Configurations
    const games = {
        lotto_kr: {
            id: 'lotto_kr',
            type: 'standard', // standard ball draw
            range: 45,
            count: 6,
            special: null,
            colorRange: true
        },
        pension_kr: {
            id: 'pension_kr',
            type: 'sequence', // Group + 6 digits
            groups: 5,
            digits: 6
        },
        powerball_us: {
            id: 'powerball_us',
            type: 'mixed', // 5 white balls + 1 red ball
            range: 69,
            count: 5,
            special: {
                name: 'Powerball',
                range: 26,
                count: 1
            }
        },
        mega_millions_us: {
            id: 'mega_millions_us',
            type: 'mixed',
            range: 70,
            count: 5,
            special: {
                name: 'Mega Ball',
                range: 25,
                count: 1
            }
        },
        euro_millions: {
            id: 'euro_millions',
            type: 'mixed',
            range: 50,
            count: 5,
            special: {
                name: 'Lucky Stars',
                range: 12,
                count: 2
            }
        }
    };

    // Translations
    const translations = {
        en: {
            title: "Global Lottery Generator",
            gameLabel: "Select Game:",
            generateBtn: "Generate Numbers",
            infoTitle: "Game Rules",
            disclaimer: "Disclaimer: This tool is for entertainment purposes only. The generated numbers are random and do not guarantee winning. Please play responsibly.",
            contactTitle: "Partnership Inquiry",
            commentsTitle: "Comments",
            sendBtn: "Send Message",
            placeholders: {
                email: "Your Email",
                message: "Your Message"
            },
            games: {
                lotto_kr: "South Korea - Lotto 6/45",
                pension_kr: "South Korea - Pension Lottery 720+",
                powerball_us: "USA - Powerball",
                mega_millions_us: "USA - Mega Millions",
                euro_millions: "Europe - EuroMillions"
            },
            descriptions: {
                lotto_kr: "Lotto 6/45 is the most popular lottery in South Korea. Select 6 unique numbers from 1 to 45. Drawings are held every Saturday.",
                pension_kr: "Pension Lottery 720+ offers a monthly annuity. It consists of a Group number (1-5) and a 6-digit sequence (0-9).",
                powerball_us: "Powerball is a major US lottery. Select 5 white numbers (1-69) and 1 red Powerball (1-26). Huge jackpots available.",
                mega_millions_us: "Mega Millions is another massive US lottery. Pick 5 numbers (1-70) and 1 gold Mega Ball (1-25).",
                euro_millions: "EuroMillions is played across nine European countries. Choose 5 main numbers (1-50) and 2 Lucky Stars (1-12)."
            }
        },
        ko: {
            title: "글로벌 로또 번호 생성기",
            gameLabel: "게임 선택:",
            generateBtn: "번호 생성",
            infoTitle: "게임 규칙",
            disclaimer: "면책 조항: 이 도구는 재미를 위해 제공됩니다. 생성된 번호는 무작위이며 당첨을 보장하지 않습니다. 건전한 복권 문화를 즐기세요.",
            contactTitle: "제휴 문의",
            commentsTitle: "댓글",
            sendBtn: "메시지 보내기",
            placeholders: {
                email: "이메일 주소",
                message: "메시지 내용"
            },
            games: {
                lotto_kr: "대한민국 - 로또 6/45",
                pension_kr: "대한민국 - 연금복권 720+",
                powerball_us: "미국 - 파워볼",
                mega_millions_us: "미국 - 메가 밀리언",
                euro_millions: "유럽 - 유로밀리언"
            },
            descriptions: {
                lotto_kr: "로또 6/45는 한국의 대표적인 복권입니다. 1부터 45까지의 숫자 중 6개를 선택합니다. 추첨은 매주 토요일에 진행됩니다.",
                pension_kr: "연금복권 720+는 당첨 시 연금 형식으로 지급됩니다. 조(1-5)와 6자리의 번호(0-9)를 선택합니다.",
                powerball_us: "파워볼은 미국의 거대 복권입니다. 흰색 공 5개(1-69)와 빨간색 파워볼 1개(1-26)를 선택합니다.",
                mega_millions_us: "메가 밀리언은 미국의 또 다른 대형 복권입니다. 5개의 번호(1-70)와 1개의 메가볼(1-25)을 선택합니다.",
                euro_millions: "유로밀리언은 유럽 9개국에서 진행되는 복권입니다. 5개의 메인 번호(1-50)와 2개의 행운의 별(1-12)을 선택합니다."
            }
        }
    };

    // --- Initialization ---

    function init() {
        populateGameSelector();
        loadSettings();
        updateUI();
        // Generate initial set for visual appeal
        handleGenerate();
    }

    function populateGameSelector() {
        gameSelector.innerHTML = '';
        Object.keys(games).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            // Text will be updated by updateUI
            gameSelector.appendChild(option);
        });
    }

    function loadSettings() {
        // Theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggleBtn.textContent = '☀️';
        } else {
            themeToggleBtn.textContent = '🌙';
        }

        // Lang
        const savedLang = localStorage.getItem('lang');
        if (savedLang && translations[savedLang]) {
            currentLang = savedLang;
            langSelector.value = currentLang;
        } else {
            // Detect browser lang
            const browserLang = navigator.language.split('-')[0];
            if (translations[browserLang]) {
                currentLang = browserLang;
                langSelector.value = currentLang;
            }
        }
    }

    // --- Core Logic ---

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getUniqueRandomNumbers(count, min, max) {
        const numbers = new Set();
        while (numbers.size < count) {
            numbers.add(getRandomInt(min, max));
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function handleGenerate() {
        const game = games[currentGameKey];
        numbersContainer.innerHTML = ''; // Clear existing

        if (game.type === 'standard') {
            const nums = getUniqueRandomNumbers(game.count, 1, game.range);
            renderBalls(nums, false, game.colorRange);
        } else if (game.type === 'mixed') {
            // Main balls
            const mainNums = getUniqueRandomNumbers(game.count, 1, game.range);
            renderBalls(mainNums, false, false);
            
            // Special balls
            const specialNums = getUniqueRandomNumbers(game.special.count, 1, game.special.range);
            renderBalls(specialNums, true, false);
        } else if (game.type === 'sequence') {
            // Pension lottery logic
            const group = getRandomInt(1, game.groups);
            const digits = [];
            for (let i = 0; i < game.digits; i++) {
                digits.push(getRandomInt(0, 9));
            }
            renderPension(group, digits);
        }
    }

    function renderBalls(numbers, isSpecial, useColor) {
        numbers.forEach((num, index) => {
            const ball = document.createElement('span');
            ball.className = 'number';
            if (isSpecial) ball.classList.add('special');
            
            ball.textContent = num;
            ball.style.animation = 'none';
            ball.offsetHeight; // trigger reflow
            ball.style.animation = 'fadeInUp 0.5s forwards';
            ball.style.animationDelay = `${index * 0.1}s`;

            if (useColor) {
                applyColor(ball, num);
            } else if (isSpecial) {
                ball.style.backgroundColor = '#d63031'; // Red/Dark for special
            } else {
                ball.style.backgroundColor = '#555'; // Standard default
            }

            numbersContainer.appendChild(ball);
        });
    }

    function renderPension(group, digits) {
        // Render Group
        const groupBall = document.createElement('span');
        groupBall.className = 'number';
        groupBall.textContent = `${group}조`;
        groupBall.style.backgroundColor = '#0984e3';
        groupBall.style.borderRadius = '10px'; // Square-ish for group
        groupBall.style.width = 'auto';
        groupBall.style.padding = '0 15px';
        numbersContainer.appendChild(groupBall);

        // Render Digits
        digits.forEach((num, index) => {
            const ball = document.createElement('span');
            ball.className = 'number';
            ball.textContent = num;
            ball.style.backgroundColor = '#b2bec3';
            ball.style.color = '#2d3436';
            ball.style.animation = 'fadeInUp 0.5s forwards';
            ball.style.animationDelay = `${(index + 1) * 0.1}s`;
            numbersContainer.appendChild(ball);
        });
    }

    function applyColor(element, number) {
        let color;
        if (number <= 10) color = '#fbc400';
        else if (number <= 20) color = '#69c8f2';
        else if (number <= 30) color = '#ff7272';
        else if (number <= 40) color = '#555';
        else color = '#b0d840';
        element.style.backgroundColor = color;
    }

    // --- Event Listeners ---

    generateBtn.addEventListener('click', handleGenerate);

    gameSelector.addEventListener('change', (e) => {
        currentGameKey = e.target.value;
        updateUI(); // Update description text
        handleGenerate(); // Auto generate on switch
    });

    langSelector.addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('lang', currentLang);
        updateUI();
    });

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            themeToggleBtn.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-mode');
            themeToggleBtn.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });

    function updateUI() {
        const t = translations[currentLang];
        
        // Static text
        appTitle.textContent = t.title;
        gameLabel.textContent = t.gameLabel;
        generateBtn.textContent = t.generateBtn;
        infoTitle.textContent = t.infoTitle;
        disclaimerText.textContent = t.disclaimer;
        contactTitle.textContent = t.contactTitle;
        commentsTitle.textContent = t.commentsTitle;
        sendBtn.textContent = t.sendBtn;
        emailPlaceholder.placeholder = t.placeholders.email;
        messagePlaceholder.placeholder = t.placeholders.message;

        // Game Selector Options
        Array.from(gameSelector.options).forEach(opt => {
            opt.textContent = t.games[opt.value];
        });

        // Dynamic Description
        infoDesc.textContent = t.descriptions[currentGameKey];
    }

    // Run init
    init();
});
