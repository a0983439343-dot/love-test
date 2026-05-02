const d = document.getElementById('disagree'); 
const a = document.getElementById('agree');
const m = document.getElementById('modal');
const c = document.getElementById('congrats');
const v = document.getElementById('fireworks');
const t = v.getContext('2d');

let p = [];
let f = [];

let canSpawn = true;

d.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - d.offsetWidth);
    const y = Math.random() * (window.innerHeight - d.offsetHeight);
    d.style.position = 'absolute';
    d.style.left = x + 'px';
    d.style.top = y + 'px';
});

a.onclick = () => {
    m.classList.add('hidden');
    c.classList.remove('hidden');
    v.width = window.innerWidth;
    v.height = window.innerHeight;
    l();
};

function spawnFirework() {
    if (!canSpawn) return;

    canSpawn = false;

    f.push({
        x: Math.random() * v.width,
        y: v.height,
        ty: Math.random() * v.height * 0.5,
        v: Math.random() * 4 + 8,
        c: `hsl(${Math.random() * 360}, 100%, 60%)`
    });
}

function l() {
    requestAnimationFrame(l);

    t.globalCompositeOperation = 'destination-out';
    t.fillStyle = 'rgba(0,0,0,0.12)';
    t.fillRect(0, 0, v.width, v.height);
    t.globalCompositeOperation = 'lighter';

    if (f.length === 0 && canSpawn === false && p.length === 0) {
        setTimeout(() => {
            canSpawn = true;
        }, 300);
    }

    if (Math.random() < 0.03) {
        spawnFirework();
    }

    for (let i = f.length - 1; i >= 0; i--) {
        let fw = f[i];
        fw.y -= fw.v;

        t.fillStyle = fw.c;
        t.fillRect(fw.x, fw.y, 2, 2);

        if (fw.y <= fw.ty) {
            for (let j = 0; j < 60; j++) {
                let angle = Math.random() * Math.PI * 2;
                let speed = Math.random() * 6 + 2;

                p.push({
                    x: fw.x,
                    y: fw.y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 70,
                    c: fw.c
                });
            }
            f.splice(i, 1);
        }
    }

    for (let i = p.length - 1; i >= 0; i--) {
        let pt = p[i];

        pt.x += pt.vx;
        pt.y += pt.vy;

        pt.vx *= 0.985;
        pt.vy *= 0.985;

        if (pt.life < 35) pt.vy += 0.05;

        pt.life--;

        let alpha = pt.life / 70;

        if (alpha <= 0) {
            p.splice(i, 1);
            continue;
        }

        t.globalAlpha = alpha;
        t.fillStyle = pt.c;
        t.fillRect(pt.x, pt.y, 2, 2);
    }

    t.globalAlpha = 1;
}
