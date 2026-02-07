
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const numberElements = document.querySelectorAll('.number');

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
