// Countdown Timer
const nowDate = new Date();
let year = nowDate.getFullYear();
const july15 = new Date(`${year}-07-15T00:00:00`);
if (nowDate > july15) {
  year += 1;
}
const birthdayDate = new Date(`${year}-07-15T00:00:00`).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown-section').innerHTML = '<h2>Happy Birthday, Beauty! 🎂</h2>';
        playBirthdaySong();
        startConfetti();
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);

// Confetti Animation
function startConfetti() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#87CEEB', '#000080', '#40E0D0', '#ADD8E6']
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#87CEEB', '#000080', '#40E0D0', '#ADD8E6']
        });
    }, 250);
}

// Ice Cream Animation
function createIceCream() {
    const iceCream = document.createElement('div');
    iceCream.className = 'ice-cream';
    iceCream.style.left = Math.random() * window.innerWidth + 'px';
    iceCream.style.top = '-50px';
    iceCream.style.background = `url('ice-cream-${Math.floor(Math.random() * 3) + 1}.png') center/contain no-repeat`;
    document.body.appendChild(iceCream);

    const duration = 5000;
    const start = Date.now();

    function animate() {
        const now = Date.now();
        const progress = (now - start) / duration;

        if (progress >= 1) {
            iceCream.remove();
            return;
        }

        iceCream.style.transform = `translateY(${progress * window.innerHeight}px) rotate(${progress * 360}deg)`;
        requestAnimationFrame(animate);
    }

    animate();
}

// Flower Petals Animation
function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * window.innerWidth + 'px';
    petal.style.top = '-30px';
    petal.style.background = `url('petal-${Math.floor(Math.random() * 3) + 1}.png') center/contain no-repeat`;
    document.body.appendChild(petal);

    const duration = 8000;
    const start = Date.now();

    function animate() {
        const now = Date.now();
        const progress = (now - start) / duration;

        if (progress >= 1) {
            petal.remove();
            return;
        }

        const x = Math.sin(progress * Math.PI * 2) * 100;
        petal.style.transform = `translate(${x}px, ${progress * window.innerHeight}px) rotate(${progress * 720}deg)`;
        requestAnimationFrame(animate);
    }

    animate();
}

// Start animations
setInterval(createIceCream, 3000);
setInterval(createPetal, 2000);

// Guestbook
const guestbookForm = document.getElementById('guestbook-form');
const wishesContainer = document.getElementById('wishes-container');

guestbookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const wish = document.createElement('div');
    wish.className = 'wish animate__animated animate__fadeIn';
    wish.innerHTML = `
        <h3>${name}</h3>
        <p>${message}</p>
    `;

    wishesContainer.prepend(wish);
    guestbookForm.reset();

    // Store in localStorage
    const wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
    wishes.unshift({ name, message });
    localStorage.setItem('wishes', JSON.stringify(wishes));
});

// Load saved wishes
function loadWishes() {
    const wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
    wishes.forEach(wish => {
        const wishElement = document.createElement('div');
        wishElement.className = 'wish';
        wishElement.innerHTML = `
            <h3>${wish.name}</h3>
            <p>${wish.message}</p>
        `;
        wishesContainer.appendChild(wishElement);
    });
}

loadWishes();

// Surprise Modal
const modal = document.getElementById('surprise-modal');
const surpriseBtn = document.getElementById('surprise-btn');
const closeBtn = document.querySelector('.close');

surpriseBtn.addEventListener('click', function() {
    modal.style.display = 'block';
    document.getElementById('surprise-content').innerHTML = `
        <h2>Happy Birthday, Beauty! 🎂</h2>
        <p>Here's a special message just for you...</p>
        <video controls>
            <source src="birthday-message.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;
});

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Social Sharing
function shareOnWhatsApp() {
    const text = "Check out Beauty's birthday website! 🎂";
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
}

function shareOnInstagram() {
    alert('Take a screenshot and share it on Instagram! 📸');
}

// Birthday Song
function playBirthdaySong() {
    const audio = document.getElementById('birthday-song');
    audio.play();
}

// Add floating animation to elements
document.querySelectorAll('h1, .welcome-message, .shayari-text').forEach(element => {
    element.classList.add('floating');
}); 