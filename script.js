const d = document.getElementById('disagree');
const a = document.getElementById('agree');
const m = document.getElementById('modal');
const c = document.getElementById('congrats');
const v = document.getElementById('fireworks');
const t = v.getContext('2d');

let p = [];
let f = [];
let running = false;

m.style.position = 'relative';
m.style.overflow = 'hidden';

d.style.position = 'absolute';
a.style.position = 'absolute';

function resetButtons() {
    const mw = m.offsetWidth;
    const mh = m.offsetHeight;

    d.style.left = mw * 0.65 + 'px';
    d.style.top = mh * 0.5 + 'px';

    a.style.left = mw * 0.35 + 'px';
    a.style.top = mh * 0.5 + 'px';
}

resetButtons();

d.addEventListener('mouseover', () => {
    const mw = m.offsetWidth;
    const mh = m.offsetHeight;

    const x = Math.random() * (mw - d.offsetWidth);
    const y = Math.random() * (mh - d.offsetHeight);

    d.style.left = x + 'px';
    d.style.top = y + 'px';
});

document.addEventListener('mousemove', (e) => {
    const rect = d.getBoundingClientRect();
    const dx = rect.x - e.clientX;
    const dy = rect.y - e.clientY;

    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 120) {
        const x = Math.random() * (m.offsetWidth - d.offsetWidth);
        const y = Math.random() * (m.offsetHeight - d.offsetHeight);

        d.style.left = x + 'px';
        d.style.top = y + 'px';
    }
});

a.onclick = () => {
    if (running) return;
    running = true;

    m.style.display = 'none';
    c.style.display = 'block';

    v.width = window.innerWidth;
    v.height = window.innerHeight;

    loop();
};

window.addEventListener('resize', () => {
    if (m.style.display !== 'none') resetButtons();
});

function loop() {
    requestAnimationFrame(loop);

    t.fillStyle = 'rgba(0,0,0,0.2)';
    t.fillRect(0, 0, v.width, v.height);

    if (Math.random() < 0.05) {
        f.push({
            x: Math.random() * v.width,
            y: v.height,
            ty: Math.random() * v.height * 0.4,
            v: Math.random() * 6 + 8,
            c: `hsl(${Math.random() * 360},100%,60%)`
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
            for (let j = 0; j < 60; j++) {
                p.push({
                    x: fw.x,
                    y: fw.y,
                    vx: (Math.random() - 0.5) * 15,
                    vy: (Math.random() - 0.5) * 15,
                    l: Math.random() * 30 + 50,
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
        pt.vy += 0.25;
        pt.l--;

        t.globalAlpha = Math.max(0, pt.l / 80);
        t.fillStyle = pt.c;
        t.beginPath();
        t.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
        t.fill();
        t.globalAlpha = 1;

        if (pt.l <= 0) p.splice(i, 1);
    }
}
