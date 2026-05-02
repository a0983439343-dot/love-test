const d = document.getElementById('disagree'); 
const a = document.getElementById('agree');
const m = document.getElementById('modal');
const c = document.getElementById('congrats');
const v = document.getElementById('fireworks');
const t = v.getContext('2d');

let p = [];
let f = [];

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

function l() {
    requestAnimationFrame(l);

    t.fillStyle = 'rgba(0,0,0,0.08)';
    t.fillRect(0, 0, v.width, v.height);

    if (Math.random() < 0.06) {
        f.push({
            x: Math.random() * v.width,
            y: v.height,
            ty: Math.random() * v.height * 0.6,
            v: Math.random() * 5 + 7,
            c: `hsl(${Math.random() * 360}, 100%, 60%)`
        });
    }

    for (let i = f.length - 1; i >= 0; i--) {
        let fw = f[i];
        fw.y -= fw.v;

        t.fillStyle = fw.c;
        t.beginPath();
        t.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
        t.fill();

        if (fw.y <= fw.ty) {
            for (let j = 0; j < 70; j++) {
                let angle = Math.random() * Math.PI * 2;
                let speed = Math.random() * 6 + 2;

                p.push({
                    x: fw.x,
                    y: fw.y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 80,
                    size: 2.5,
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

        pt.vx *= 0.98;
        pt.vy *= 0.98;

        if (pt.life < 60) {
            pt.vy += 0.1;
        }

        pt.life--;

        let progress = pt.life / 80;

        let alpha = progress;
        let size = pt.size * progress;

        t.globalAlpha = alpha;
        t.fillStyle = pt.c;

        t.beginPath();
        t.arc(pt.x, pt.y, size, 0, Math.PI * 2);
        t.fill();

        t.globalAlpha = 1;

        if (pt.life <= 0 || alpha <= 0.02) {
            p.splice(i, 1);
        }
    }
}
