// ===== إعدادات سهلة التعديل =====
// اكتب موعد الخطوبة هنا: السنة-الشهر-اليوم T الساعة:الدقيقة:الثانية
// مثال: "2027-02-14T19:00:00"
const engagementDate = new Date("2026-11-19:19:00");

const petalLayer = document.getElementById("petalLayer");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// إنشاء بتلات متفرقة عند فتح الصفحة
function createPetals(count = 34) {
  if (reduceMotion || !petalLayer) return;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";

    const size = 9 + Math.random() * 15;
    const duration = 7 + Math.random() * 9;
    const delay = Math.random() * 5;

    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty("--size", `${size}px`);
    petal.style.setProperty("--duration", `${duration}s`);
    petal.style.setProperty("--delay", `${delay}s`);
    petal.style.setProperty("--opacity", `${0.35 + Math.random() * 0.5}`);
    petal.style.setProperty("--rotation", `${Math.random() * 360}deg`);
    petal.style.setProperty("--sway", `${-70 + Math.random() * 140}px`);

    petal.addEventListener("animationend", () => petal.remove());
    petalLayer.appendChild(petal);
  }
}

// نضيف دفعة جديدة كل فترة حتى يستمر تساقط البتلات بدون إرهاق الصفحة
createPetals(42);
if (!reduceMotion) {
  window.setInterval(() => {
    if (document.visibilityState === "visible") createPetals(8);
  }, 2200);
}

// العداد التنازلي
const elements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};
const dateHint = document.getElementById("dateHint");

function updateCountdown() {
  const now = new Date();
  const distance = engagementDate.getTime() - now.getTime();

  if (Number.isNaN(engagementDate.getTime())) {
    dateHint.textContent = "يرجى ضبط تاريخ المناسبة في ملف script.js";
    return;
  }

  if (distance <= 0) {
    Object.values(elements).forEach(element => element.textContent = "00");
    dateHint.textContent = "أهلًا بكم، بدأت ليلتنا الجميلة!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  elements.days.textContent = String(days).padStart(2, "0");
  elements.hours.textContent = String(hours).padStart(2, "0");
  elements.minutes.textContent = String(minutes).padStart(2, "0");
  elements.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
window.setInterval(updateCountdown, 1000);
