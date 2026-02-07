
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
    const valNextDraw = document.getElementById('val-next-draw');
    const valJackpot = document.getElementById('val-jackpot');
    const labelNextDraw = document.getElementById('label-next-draw');
    const labelJackpot = document.getElementById('label-jackpot');

    // State
    let currentLang = 'en';
    let currentGameKey = 'lotto_kr';

    // Game Configurations
    const games = {
        lotto_kr: {
            id: 'lotto_kr',
            type: 'standard', 
            range: 45,
            count: 6,
            special: null,
            colorRange: true,
            drawDays: [6], // Saturday (0=Sun, 6=Sat)
            jackpot: '₩2,000,000,000+'
        },
        pension_kr: {
            id: 'pension_kr',
            type: 'sequence', 
            groups: 5,
            digits: 6,
            drawDays: [4], // Thursday
            jackpot: '₩7,000,000 / mo'
        },
        loto6_jp: {
            id: 'loto6_jp',
            type: 'standard',
            range: 43,
            count: 6,
            drawDays: [1, 4], // Mon, Thu
            jackpot: '¥200,000,000+'
        },
        loto7_jp: {
            id: 'loto7_jp',
            type: 'standard',
            range: 37,
            count: 7,
            drawDays: [5], // Friday
            jackpot: '¥600,000,000+'
        },
        lotto_india: {
            id: 'lotto_india',
            type: 'mixed',
            range: 50,
            count: 6,
            special: {
                name: 'Joker',
                range: 5,
                count: 1
            },
            drawDays: [2, 5], // Tue, Fri (Mock schedule)
            jackpot: '₹40,000,000+'
        },
        mega_645_vn: {
            id: 'mega_645_vn',
            type: 'standard',
            range: 45,
            count: 6,
            drawDays: [0, 3, 5], // Sun, Wed, Fri
            jackpot: '12 Tỷ VNĐ+'
        },
        powerball_us: {
            id: 'powerball_us',
            type: 'mixed', 
            range: 69,
            count: 5,
            special: {
                name: 'Powerball',
                range: 26,
                count: 1
            },
            drawDays: [1, 3, 6], // Mon, Wed, Sat
            jackpot: '$20,000,000+'
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
            },
            drawDays: [2, 5], // Tue, Fri
            jackpot: '$20,000,000+'
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
            },
            drawDays: [2, 5], // Tue, Fri
            jackpot: '€17,000,000+'
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
            dashNext: "Next Draw",
            dashJackpot: "Est. Jackpot",
            placeholders: { email: "Your Email", message: "Your Message" },
            games: {
                lotto_kr: "South Korea - Lotto 6/45",
                pension_kr: "South Korea - Pension 720+",
                loto6_jp: "Japan - Loto 6",
                loto7_jp: "Japan - Loto 7",
                lotto_india: "India - Lotto India",
                mega_645_vn: "Vietnam - Mega 6/45",
                powerball_us: "USA - Powerball",
                mega_millions_us: "USA - Mega Millions",
                euro_millions: "Europe - EuroMillions"
            },
            descriptions: {
                lotto_kr: "Select 6 unique numbers from 1 to 45. Drawings every Saturday.",
                pension_kr: "Pension Lottery 720+ offers a monthly annuity. Group (1-5) + 6 digits.",
                loto6_jp: "Loto 6 requires picking 6 numbers from 1 to 43. Drawn Mon & Thu.",
                loto7_jp: "Loto 7 requires picking 7 numbers from 1 to 37. Drawn every Friday.",
                lotto_india: "Lotto India: Pick 6 numbers (1-50) and 1 Joker ball (1-5).",
                mega_645_vn: "Vietlott Mega 6/45: Choose 6 numbers from 1 to 45. Draws Sun, Wed, Fri.",
                powerball_us: "Select 5 white numbers (1-69) and 1 red Powerball (1-26).",
                mega_millions_us: "Pick 5 numbers (1-70) and 1 gold Mega Ball (1-25).",
                euro_millions: "Choose 5 main numbers (1-50) and 2 Lucky Stars (1-12)."
            }
        },
        ko: {
            title: "글로벌 로또 생성기",
            gameLabel: "게임 선택:",
            generateBtn: "번호 생성",
            infoTitle: "게임 규칙",
            disclaimer: "이 도구는 재미로 제공됩니다. 당첨을 보장하지 않습니다.",
            contactTitle: "제휴 문의",
            commentsTitle: "댓글",
            sendBtn: "메시지 전송",
            dashNext: "다음 추첨",
            dashJackpot: "예상 당첨금",
            placeholders: { email: "이메일", message: "메시지" },
            games: {
                lotto_kr: "대한민국 - 로또 6/45",
                pension_kr: "대한민국 - 연금복권 720+",
                loto6_jp: "일본 - 로또 6",
                loto7_jp: "일본 - 로또 7",
                lotto_india: "인도 - 로또 인디아",
                mega_645_vn: "베트남 - 메가 6/45",
                powerball_us: "미국 - 파워볼",
                mega_millions_us: "미국 - 메가 밀리언",
                euro_millions: "유럽 - 유로밀리언"
            },
            descriptions: {
                lotto_kr: "1부터 45까지 숫자 중 6개 선택. 매주 토요일 추첨.",
                pension_kr: "조(1-5)와 6자리 번호 선택. 매월 연금 지급.",
                loto6_jp: "1~43 중 6개 선택. 월/목 추첨.",
                loto7_jp: "1~37 중 7개 선택. 매주 금요일 추첨.",
                lotto_india: "1~50 중 6개, 조커볼(1~5) 1개 선택.",
                mega_645_vn: "1~45 중 6개 선택. 일/수/금 추첨.",
                powerball_us: "흰공 5개(1-69), 빨간공 1개(1-26).",
                mega_millions_us: "번호 5개(1-70), 메가볼 1개(1-25).",
                euro_millions: "메인 5개(1-50), 행운의 별 2개(1-12)."
            }
        },
        ja: {
            title: "グローバル宝くじ生成",
            gameLabel: "ゲーム選択:",
            generateBtn: "番号生成",
            infoTitle: "ルール",
            disclaimer: "このツールは娯楽目的です。当選を保証するものではありません。",
            contactTitle: "お問い合わせ",
            commentsTitle: "コメント",
            sendBtn: "送信",
            dashNext: "次回の抽選",
            dashJackpot: "予想賞金",
            placeholders: { email: "メールアドレス", message: "メッセージ" },
            games: {
                lotto_kr: "韓国 - ロト 6/45",
                pension_kr: "韓国 - 年金宝くじ 720+",
                loto6_jp: "日本 - ロト6",
                loto7_jp: "日本 - ロト7",
                lotto_india: "インド - ロト・インディア",
                mega_645_vn: "ベトナム - メガ 6/45",
                powerball_us: "米国 - パワーボール",
                mega_millions_us: "米国 - メガ・ミリオンズ",
                euro_millions: "欧州 - ユーロ・ミリオンズ"
            },
            descriptions: {
                lotto_kr: "1〜45の数字から6つ選択。毎週土曜日抽選。",
                pension_kr: "組(1-5)と6桁の番号を選択。毎月の年金形式。",
                loto6_jp: "1〜43の数字から6つ選択。月曜日と木曜日に抽選。",
                loto7_jp: "1〜37の数字から7つ選択。毎週金曜日に抽選。",
                lotto_india: "1〜50から6つ、ジョーカーボール(1〜5)を1つ選択。",
                mega_645_vn: "1〜45から6つ選択。日・水・金に抽選。",
                powerball_us: "白いボール5つ(1-69)と赤いボール1つ(1-26)。",
                mega_millions_us: "5つの数字(1-70)とメガボール(1-25)。",
                euro_millions: "メイン5つ(1-50)とラッキースター2つ(1-12)。"
            }
        },
        hi: {
            title: "ग्लोबल लॉटरी जनरेटर",
            gameLabel: "खेल चुनें:",
            generateBtn: "नंबर जनरेट करें",
            infoTitle: "खेल के नियम",
            disclaimer: "यह टूल केवल मनोरंजन के लिए है। यह जीतने की गारंटी नहीं देता।",
            contactTitle: "संपर्क करें",
            commentsTitle: "टिप्पणियाँ",
            sendBtn: "संदेश भेजें",
            dashNext: "अगला ड्रा",
            dashJackpot: "अनुमानित जैकपॉट",
            placeholders: { email: "आपका ईमेल", message: "संदेश" },
            games: {
                lotto_kr: "दक्षिण कोरिया - लोट्टो 6/45",
                pension_kr: "दक्षिण कोरिया - पेंशन लॉटरी",
                loto6_jp: "जापान - लोटो 6",
                loto7_jp: "जापान - लोटो 7",
                lotto_india: "भारत - लोट्टो इंडिया",
                mega_645_vn: "वियतनाम - मेगा 6/45",
                powerball_us: "यूएसए - पावरबॉल",
                mega_millions_us: "यूएसए - मेगा मिलियन्स",
                euro_millions: "यूरोप - यूरो मिलियन्स"
            },
            descriptions: {
                lotto_kr: "1 से 45 में से 6 नंबर चुनें। हर शनिवार ड्रा।",
                pension_kr: "मासिक वार्षिकी लॉटरी। समूह और 6 अंक चुनें।",
                loto6_jp: "1 से 43 में से 6 नंबर चुनें। सोम और गुरु को ड्रा।",
                loto7_jp: "1 से 37 में से 7 नंबर चुनें। हर शुक्रवार ड्रा।",
                lotto_india: "6 नंबर (1-50) और 1 जोकर (1-5) चुनें।",
                mega_645_vn: "1 से 45 में से 6 नंबर चुनें। रवि, बुध, शुक्र ड्रा।",
                powerball_us: "5 सफेद (1-69) और 1 लाल (1-26) चुनें।",
                mega_millions_us: "5 नंबर (1-70) और 1 मेगा बॉल (1-25) चुनें।",
                euro_millions: "5 मुख्य (1-50) और 2 लकी स्टार (1-12) चुनें।"
            }
        },
        vi: {
            title: "Tạo Số Xổ Số Toàn Cầu",
            gameLabel: "Chọn trò chơi:",
            generateBtn: "Tạo số",
            infoTitle: "Luật chơi",
            disclaimer: "Công cụ này chỉ nhằm mục đích giải trí. Các số được tạo ngẫu nhiên.",
            contactTitle: "Liên hệ hợp tác",
            commentsTitle: "Bình luận",
            sendBtn: "Gửi tin nhắn",
            dashNext: "Kỳ quay tiếp theo",
            dashJackpot: "Giải thưởng ước tính",
            placeholders: { email: "Email của bạn", message: "Tin nhắn" },
            games: {
                lotto_kr: "Hàn Quốc - Lotto 6/45",
                pension_kr: "Hàn Quốc - Pension 720+",
                loto6_jp: "Nhật Bản - Loto 6",
                loto7_jp: "Nhật Bản - Loto 7",
                lotto_india: "Ấn Độ - Lotto India",
                mega_645_vn: "Việt Nam - Mega 6/45",
                powerball_us: "Mỹ - Powerball",
                mega_millions_us: "Mỹ - Mega Millions",
                euro_millions: "Châu Âu - EuroMillions"
            },
            descriptions: {
                lotto_kr: "Chọn 6 số từ 1 đến 45. Quay thưởng vào thứ Bảy.",
                pension_kr: "Xổ số dạng niên kim. Chọn nhóm và 6 chữ số.",
                loto6_jp: "Chọn 6 số từ 1 đến 43. Quay vào thứ Hai và thứ Năm.",
                loto7_jp: "Chọn 7 số từ 1 đến 37. Quay vào thứ Sáu.",
                lotto_india: "Chọn 6 số (1-50) và 1 số Joker (1-5).",
                mega_645_vn: "Chọn 6 số từ 1 đến 45. Quay vào Chủ Nhật, thứ Tư, thứ Sáu.",
                powerball_us: "Chọn 5 bóng trắng (1-69) và 1 Powerball đỏ (1-26).",
                mega_millions_us: "Chọn 5 số (1-70) và 1 Mega Ball (1-25).",
                euro_millions: "Chọn 5 số chính (1-50) và 2 Ngôi sao may mắn (1-12)."
            }
        }
    };

    // --- Helper: Get Next Draw Date ---
    function getNextDrawDate(drawDays) {
        const now = new Date();
        const today = now.getDay(); // 0=Sun, 1=Mon...
        
        // Find next day in drawDays that is >= today
        // If today is a draw day, assume the draw is tonight (or next week if passed? Simplification: assume upcoming)
        // Sort drawDays just in case
        drawDays.sort((a,b) => a-b);
        
        let nextDay = -1;
        
        // Look for draw later this week
        for (let d of drawDays) {
            if (d >= today) {
                // If today is draw day, technically we should check time, but for static site we assume "Today"
                nextDay = d;
                break;
            }
        }
        
        // If no draw left this week, pick first draw day of next week
        if (nextDay === -1) {
            nextDay = drawDays[0];
            // Days until next week's draw
            const daysToAdd = (7 - today) + nextDay;
            now.setDate(now.getDate() + daysToAdd);
        } else {
            const daysToAdd = nextDay - today;
            now.setDate(now.getDate() + daysToAdd);
        }

        return now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    }

    // --- Initialization ---

    function init() {
        // Populate Lang Selector with new options
        const langs = [
            {code: 'en', name: 'English'},
            {code: 'ko', name: '한국어'},
            {code: 'ja', name: '日本語'},
            {code: 'hi', name: 'हिन्दी'},
            {code: 'vi', name: 'Tiếng Việt'}
        ];
        langSelector.innerHTML = '';
        langs.forEach(l => {
            const opt = document.createElement('option');
            opt.value = l.code;
            opt.textContent = l.name;
            langSelector.appendChild(opt);
        });

        populateGameSelector();
        loadSettings();
        updateUI();
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
        
        updateDashboard();
    }

    function updateDashboard() {
        const game = games[currentGameKey];
        // Next Draw
        const dateStr = getNextDrawDate(game.drawDays);
        valNextDraw.textContent = dateStr;
        // Jackpot
        valJackpot.textContent = game.jackpot;
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
        labelNextDraw.textContent = t.dashNext;
        labelJackpot.textContent = t.dashJackpot;
        
        emailPlaceholder.placeholder = t.placeholders.email;
        messagePlaceholder.placeholder = t.placeholders.message;

        // Game Selector Options
        // Save selection
        const prevSelection = gameSelector.value;
        
        Array.from(gameSelector.options).forEach(opt => {
            opt.textContent = t.games[opt.value];
        });
        
        // Restore if possible (though populate usually resets in init, updateUI preserves)
        // Note: populateGameSelector calls updateUI only on init.
        // But on lang change, we need to update options text.
        // If we rebuild options, we lose value.
        // We actually only need to update textContent.
        
        // Dynamic Description
        infoDesc.textContent = t.descriptions[currentGameKey];
        updateDashboard();
    }

    // Run init
    init();
});
