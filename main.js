
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const numberElements = document.querySelectorAll('.number');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Theme Toggle Functionality
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggleBtn.textContent = '☀️'; // Sun icon for dark mode
        } else {
            body.classList.remove('dark-mode');
            themeToggleBtn.textContent = '🌙'; // Moon icon for light mode
        }
    }

    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Check for system preference if no theme saved
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        } else {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    function generateNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers);
    }

    function displayNumbers(numbers) {
        numbers.sort((a, b) => a - b);
        numberElements.forEach((element, index) => {
            // Reset animation
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = ''; 

            element.style.animationDelay = `${index * 0.1}s`;
            element.textContent = numbers[index];
            colorizeNumber(element, numbers[index]);
        });
    }

    function colorizeNumber(element, number) {
        let color;
        if (number <= 10) {
            color = '#fbc400'; // Yellow
        } else if (number <= 20) {
            color = '#69c8f2'; // Blue
        } else if (number <= 30) {
            color = '#ff7272'; // Red
        } else if (number <= 40) {
            color = '#555'; // Dark Gray
        } else {
            color = '#b0d840'; // Green
        }
        element.style.backgroundColor = color;
    }

    generateBtn.addEventListener('click', () => {
        const generatedNumbers = generateNumbers();
        displayNumbers(generatedNumbers);
    });
});
