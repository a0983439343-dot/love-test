const d = document.getElementById('disagree');
const a = document.getElementById('agree');
const m = document.getElementById('modal');
const c = document.getElementById('congrats');
const v = document.getElementById('fireworks');
const t = v.getContext('2d');
let p = [];
let f = [];

a.style.position = 'absolute';
a.style.left = '30%';
a.style.top = '50%';
a.style.transform = 'translate(-50%, -50%)';

d.style.position = 'absolute';
d.style.left = '70%';
d.style.top = '50%';
d.style.transform = 'translate(-50%, -50%)';
d.style.transition = 'all 0.3s ease-out';
d.style.zIndex = '999';

d.addEventListener('mouseover', () => {
    d.style.left = Math.random() * (window.innerWidth - d.offsetWidth) + 'px';
    d.style.top = Math.random() * (window.innerHeight - d.offsetHeight) + 'px';
});

a.onclick = () => {
    m.style.display = 'none';
    c.style.display = 'block';
    v.width = window.innerWidth;
    v.height = window.innerHeight;
    loop();
};

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
