const disagree = document.getElementById('disagree');
const agree = document.getElementById('agree');
const modal = document.getElementById('modal');
const congrats = document.getElementById('congrats');
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

disagree.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - disagree.offsetWidth);
    const y = Math.random() * (window.innerHeight - disagree.offsetHeight);
    disagree.style.position = 'absolute';
    disagree.style.left = x + 'px';
    disagree.style.top = y + 'px';
});

agree.onclick = () => {
    modal.classList.add('hidden');
    congrats.classList.remove('hidden');
    initFireworks();
};

let particles = [];
function initFireworks() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    loop();
}

function loop() {
    requestAnimationFrame(loop);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (Math.random() < 0.1) {
        particles.push(new Particle());
    }
    
    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(i, 1);
    });
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.vx = Math.random() * 4 - 2;
        this.vy = Math.random() * -10 - 10;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.life = 100;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2;
        this.life--;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}