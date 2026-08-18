// ---------- price ----------
// 54,000 TZS at ~2,650 TZS/USD (approx. mid-market rate)
const priceTZS = 54000;
const usdRate = 2650;
const priceUSD = (priceTZS / usdRate).toFixed(2);
document.getElementById('priceUsd').textContent = `$${priceUSD}`;
document.getElementById('payAmount').textContent = `$${priceUSD}`;

// ---------- countdown: 5 hours from page load ----------
const clockEl = document.getElementById('clock');
const deadline = Date.now() + 5 * 60 * 60 * 1000;

function formatTime(ms) {
    if (ms <= 0) return '00:00:00';
    const totalSec = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function tickClock() {
    const remaining = deadline - Date.now();
    clockEl.textContent = formatTime(remaining);
    if (remaining <= 0) {
        clockEl.textContent = 'Listing released';
        document.getElementById('payBtn').disabled = true;
        document.getElementById('payBtn').style.opacity = '0.5';
        clearInterval(clockInterval);
    }
}
tickClock();
const clockInterval = setInterval(tickClock, 1000);

// ---------- live viewer count ----------
const viewerEl = document.getElementById('viewerCount');
let viewers = 14;
setInterval(() => {
    viewers += Math.random() > 0.5 ? 1 : -1;
    viewers = Math.min(29, Math.max(9, viewers));
    viewerEl.textContent = viewers;
}, 4000);

// ---------- rotating recent-purchase ticker ----------
const buyers = [
    'Baraka from Dodoma bought this pack · 3m ago',
    'Neema from Zanzibar bought this pack · 6m ago',
    'Elias from Mwanza bought this pack · 9m ago',
    'Happiness from Arusha bought this pack · 12m ago',
    'Yusuf from Dar es Salaam bought this pack · 15m ago',
    'Grace from Moshi bought this pack · 21m ago',
];
let bIndex = 0;
const tickerEl = document.getElementById('ticker');
setInterval(() => {
    bIndex = (bIndex + 1) % buyers.length;
    tickerEl.style.opacity = 0;
    setTimeout(() => {
        tickerEl.textContent = buyers[bIndex];
        tickerEl.style.opacity = 1;
    }, 300);
}, 5000);

// ---------- pay button ----------
document.getElementById('payBtn').addEventListener('click', () => {
    alert('Payment gateway not connected yet — hook this button up to your checkout provider (e.g. Stripe, Flutterwave, or a mobile money API) to complete the flow.');
});
