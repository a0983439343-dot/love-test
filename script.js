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

    // 比原本更淡，不會蓋掉煙火
    t.fillStyle = 'rgba(0,0,0,0.08)';
    t.fillRect(0, 0, v.width, v.height);

    // 發射煙火
    if (Math.random() < 0.06) {
        f.push({
            x: Math.random() * v.width,
            y: v.height,
            ty: Math.random() * v.height * 0.6,
            v: Math.random() * 5 + 7,
            c: `hsl(${Math.random() * 360}, 100%, 60%)`
        });
    }

    // 上升煙火
    for (let i = f.length - 1; i >= 0; i--) {
        let fw = f[i];
        fw.y -= fw.v;

        t.fillStyle = fw.c;
        t.beginPath();
        t.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
        t.fill();

        if (fw.y <= fw.ty) {
            // 爆炸
            for (let j = 0; j < 70; j++) {
                p.push({
                    x: fw.x,
                    y: fw.y,
                    vx: (Math.random() - 0.5) * 8,
                    vy: (Math.random() - 0.5) * 8,
                    life: 80,
                    alpha: 1,
                    c: fw.c
                });
            }
            f.splice(i, 1);
        }
    }

    // 粒子
    for (let i = p.length - 1; i >= 0; i--) {
        let pt = p[i];

        // 位置更新
        pt.x += pt.vx;
        pt.y += pt.vy;

        // 阻力（重點）
        pt.vx *= 0.98;
        pt.vy *= 0.98;

        // 重力
        pt.vy += 0.2;

        // 壽命
        pt.life--;

        // 透明度
        pt.alpha = pt.life / 80;

        t.globalAlpha = pt.alpha;
        t.fillStyle = pt.c;
        t.beginPath();
        t.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
        t.fill();
        t.globalAlpha = 1;

        // ✔ 真正刪掉（修復你說的問題）
        if (pt.life <= 0 || pt.alpha <= 0.02) {
            p.splice(i, 1);
        }
    }
}
