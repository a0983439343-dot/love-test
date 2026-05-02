const d = document.getElementById('disagree');
const a = document.getElementById('agree');
const v = document.createElement('canvas');
const t = v.getContext('2d');
let p = []; let f = [];
document.body.style.backgroundColor = '#000';
document.body.style.color = '#fff';
document.body.style.overflow = 'hidden';
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.alignItems = 'center';
document.body.style.justifyContent = 'center';
document.body.style.height = '100vh';
document.body.style.margin = '0';
d.style.position = 'absolute';
d.style.transition = 'all 0.3s ease-out';
d.style.zIndex = '999';
v.style.position = 'fixed';
v.style.top = '0';
v.style.left = '0';
v.style.pointerEvents = 'none';
v.style.zIndex = '1';
document.body.appendChild(v);
d.addEventListener('mouseover', () => {
    d.style.left = Math.random() * (window.innerWidth - d.offsetWidth) + 'px';
    d.style.top = Math.random() * (window.innerHeight - d.offsetHeight) + 'px';
});
a.onclick = () => {
    document.querySelectorAll('h2, .buttons, h1').forEach(el => el.style.display = 'none');
    const h = document.createElement('h1');
    h.innerText = '恭喜! ❤️';
    h.style.zIndex = '10';
    document.body.appendChild(h);
    v.width = window.innerWidth;
    v.height = window.innerHeight;
    loop();
};
function loop() {
    requestAnimationFrame(loop);
    t.fillStyle = 'rgba(0,0,0,0.2)';
    t.fillRect(0, 0, v.width, v.height);
    if (Math.random() < 0.05) {
        f.push({ x: Math.random() * v.width, y: v.height, ty: Math.random() * v.height * 0.4, v: Math.random() * 6 + 8, c: `hsl(${Math.random() * 360}, 100%, 60%)` });
    }
    for (let i = f.length - 1; i >= 0; i--) {
        let fw = f[i]; fw.y -= fw.v; t.fillStyle = fw.c; t.beginPath(); t.arc(fw.x, fw.y, 3, 0, Math.PI * 2); t.fill();
        if (fw.y <= fw.ty) {
            for (let j = 0; j < 60; j++) { p.push({ x: fw.x, y: fw.y, vx: (Math.random() - 0.5) * 15, vy: (Math.random() - 0.5) * 15, l: Math.random() * 30 + 50, c: fw.c }); }
            f.splice(i, 1);
        }
    }
    for (let i = p.length - 1; i >= 0; i--) {
        let pt = p[i]; pt.x += pt.vx; pt.y += pt.vy; pt.vy += 0.25; pt.l--;
        t.globalAlpha = Math.max(0, pt.l / 80); t.fillStyle = pt.c; t.beginPath(); t.arc(pt.x, pt.y, 2, 0, Math.PI * 2); t.fill(); t.globalAlpha = 1;
        if (pt.l <= 0) p.splice(i, 1);
    }
}
