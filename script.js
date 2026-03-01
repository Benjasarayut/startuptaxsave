// ==========================================
// 🛡️ PDPA Consent
// ==========================================
function validateConsent() { document.getElementById('btnAccept').disabled = !document.getElementById('consentPolicy').checked; }
function enterApp() { document.getElementById('consentScreen').classList.add('hidden'); document.getElementById('mainApp').classList.remove('hidden'); }

// ==========================================
// 🌟 ระบบควบคุม Widget ค้นหา
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const searchInput = document.getElementById('landId');
            searchInput.placeholder = btn.innerText === 'เช่า' ? "ค้นหาที่ดินให้เช่าระยะยาว (พิมพ์ 8899, 1234, 7777)" : "ค้นหา ทำเล, จังหวัด (พิมพ์ 8899, 1234, หรือ 7777 เพื่อดูแนวเวนคืน)";
        });
    });

    const filters = document.querySelectorAll('.filter-dropdown');
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            if(confirm('🔒 ฟีเจอร์ "ตัวกรองขั้นสูง" เป็นสิทธิพิเศษ VIP!\nต้องการให้ทีม B2B Sales ติดต่อกลับหรือไม่?')) alert('🎉 รับคำขอเรียบร้อย เจ้าหน้าที่จะติดต่อกลับครับ!');
        });
    });

    const searchInput = document.getElementById('landId');
    if (searchInput) { searchInput.addEventListener('keypress', function (e) { if (e.key === 'Enter') runSimulatorFromHero(); }); }
});

// ==========================================
// 💾 AI Database (เพิ่มข้อมูล "แนวเวนคืน" และ "โฉนด 7777")
// ==========================================
const db = {
    '8899': {
        title: 'ขายที่ดิน แปลงสวย ทำเลศักยภาพ ติด BTS', owner: 'นายสมบูรณ์', area: '2 ไร่', location: 'สุขุมวิท 71, กทม.', value: 120000000, 
        desc: `📣 ✨ ขายที่ดินแปลงสวย ทำเลศักยภาพ ใจกลางสุขุมวิท 71 ✨ 📣<br><br>📍 ทำเลดีเยี่ยม เดินทางสะดวก ใกล้รถไฟฟ้า เหมาะทั้งอยู่อาศัยและลงทุน<br><ul><li>ขนาดที่ดิน 2 ไร่ ถ้วน</li><li>หน้ากว้างประมาณ 40 เมตร</li><li>เหมาะสำหรับทำคอนโดมิเนียม อาคารสำนักงาน หรือเก็งกำไรระยะยาว</li></ul>🌿 ทำเลกำลังเติบโต ใกล้แหล่งชุมชน โรงเรียน ตลาด<br>📞 สนใจติดต่อ 08X-XXX-XXXX`,
        zone: 'สีแดง (พ.3)', far: '7.0', osr: '4.5%', env: 'ตึกสูง High-rise', roi: '8.5% - 10%', 
        risk: 'ต่ำ (Prime)', riskColor: '#10b981',
        exprop: 'ปลอดภัย (ไม่พบแนวเวนคืน)', expropColor: '#10b981', expropBg: '#dcfce7',
        feas: [{ok: true, text: 'คอนโด High-rise'}, {ok: true, text: 'อาคารสำนักงาน'}, {ok: false, text: 'โรงงานอุตสาหกรรม'}],
        llmContext: 'พื้นที่สีแดง พ.3 สามารถสร้างตึกสูงเกิน 23 เมตรได้ แต่ต้องเว้นระยะถอยร่นจากกึ่งกลางถนนสาธารณะอย่างน้อย 6 เมตร และไม่พบโครงการเวนคืนในระยะ 1 กิโลเมตรครับ'
    },
    '1234': {
        title: 'ขายที่ดินเปล่า วิวดอย เหมาะสร้างบ้านพักตากอากาศ', owner: 'บจก. เอสเตท', area: '5 ไร่', location: 'ต.สุเทพ, เชียงใหม่', value: 25000000, 
        desc: `📣 ✨ ขายที่ดินเปล่า วิวดอยสุเทพ บรรยากาศหลักล้าน ✨ 📣<br><br>📍 ทำเลดีเยี่ยม ใกล้แหล่งท่องเที่ยว เหมาะสำหรับสร้างบ้านพักตากอากาศ<br><ul><li>ขนาดที่ดิน 5 ไร่เต็ม</li><li>สาธารณูปโภคครบครัน น้ำ-ไฟ เข้าถึง</li><li>เหมาะสำหรับทำหมู่บ้านจัดสรร อพาร์ทเมนต์ รีสอร์ท</li></ul>🌿 อากาศดี เงียบสงบ ใกล้ชิดธรรมชาติ<br>📞 สนใจติดต่อ 09X-XXX-XXXX`,
        zone: 'สีเหลือง (ย.3)', far: '2.5', osr: '12.5%', env: 'อาคาร (Max 8 ชั้น)', roi: '5.5% - 7%', 
        risk: 'ปานกลาง', riskColor: '#f59e0b',
        exprop: 'เฝ้าระวัง (รัศมี 500ม.)', expropColor: '#f59e0b', expropBg: '#fef3c7',
        feas: [{ok: true, text: 'หมู่บ้านจัดสรร'}, {ok: true, text: 'อพาร์ทเมนต์ 8 ชั้น'}, {ok: false, text: 'ตึกสูงเกิน 24m'}],
        llmContext: 'พื้นที่สีเหลือง ย.3 โซนนี้อยู่ในเขตควบคุมการบิน ห้ามสร้างอาคารสูงเกิน 24 เมตร และมีโครงการขยายถนนในรัศมี 500 เมตร ควรเฝ้าระวังประกาศเวนคืนในอนาคตครับ'
    },
    '7777': {
        title: 'ด่วน! ขายที่ดินราคาถูกกว่าประเมิน 30% ติดถนนใหญ่', owner: 'นายอาสา พิทักษ์สิทธิ์', area: '10 ไร่', location: 'ต.ดอนแก้ว, อ.แม่ริม', value: 15000000, 
        desc: `🚨 ขายด่วน ที่ดิน 10 ไร่ ติดถนนหลวง ราคาถูกที่สุดในย่านนี้ 🚨<br><br>📍 เหมาะสำหรับทำโกดัง หรือซื้อเก็บเก็งกำไร<br><ul><li>พื้นที่กว้างขวาง 10 ไร่</li><li>ติดถนนเส้นหลัก เดินทางง่ายขนส่งสะดวก</li></ul>⚠️ ราคาต่ำกว่าตลาด 30% ร้อนเงิน ต้องการขายด่วน!<br>📞 สนใจติดต่อ 08X-XXX-XXXX`,
        zone: 'สีเขียว (ก.1)', far: '1.0', osr: '40%', env: 'อาคารขนาดเล็ก', roi: '2.0%', 
        risk: 'สูงมาก (สีแดง)', riskColor: '#ef4444',
        exprop: 'ทับซ้อนแนวเวนคืนปี 70', expropColor: '#ef4444', expropBg: '#fee2e2',
        feas: [{ok: true, text: 'บ้านพักอาศัย 1-2 ชั้น'}, {ok: false, text: 'โครงการบ้านจัดสรร'}, {ok: false, text: 'ตึกแถว/อาคารพาณิชย์'}],
        llmContext: '⚠️ AI ตรวจพบความเสี่ยงระดับสูงสุด: ที่ดินแปลงนี้ "ทับซ้อนแนวโครงการขยายถนนหลวงปี 2570" ซึ่งจะถูกเวนคืนพื้นที่กว่า 80% ไม่แนะนำให้นักลงทุนซื้อเพื่อพัฒนาอสังหาริมทรัพย์ถาวรเด็ดขาดครับ!'
    }
};

let currentData = null;

// ==========================================
// 💻 ค้นหาและแสดงผล
// ==========================================
function runSimulatorFromHero() {
    runSimulator();
    setTimeout(() => { document.getElementById('resultsLayout').scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 500);
}

function runSimulator() {
    const id = document.getElementById('landId').value.trim();
    if (!id || !db[id]) return alert("กรุณาค้นหาเลขโฉนด '8899', '1234', หรือลองพิมพ์ '7777' เพื่อดูความเสี่ยง!");

    currentData = db[id]; const data = currentData;
    document.getElementById('resultsLayout').classList.remove('hidden');

    // ฝั่งซ้าย (Main)
    document.getElementById('propTitle').innerText = data.title;
    document.getElementById('propPrice').innerText = data.value.toLocaleString() + " บาท";
    document.getElementById('propDescription').innerHTML = data.desc; 
    document.getElementById('maxEnvelope').innerText = data.env;
    document.getElementById('simFarOsr').innerText = `${data.far} / ${data.osr}`;
    document.getElementById('simRoi').innerText = data.roi;
    document.getElementById('simFeasibility').innerHTML = data.feas.map(f => `<li><i class="fa-solid ${f.ok ? 'fa-circle-check text-accent' : 'fa-circle-xmark text-red'}"></i> <span style="color: ${f.ok ? '#0f172a' : '#94a3b8'}">${f.text}</span></li>`).join('');
    
    // ฝั่งขวา (Sidebar)
    document.getElementById('propOwner').innerText = data.owner;
    document.getElementById('propArea').innerText = data.area;
    document.getElementById('propZone').innerText = data.zone;
    document.getElementById('propZone').style.color = data.zone.includes('แดง') ? '#ef4444' : (data.zone.includes('เขียว') ? '#10b981' : '#f59e0b');
    document.getElementById('propLocation').innerText = data.location;
    
    // อัปเดตแนวเวนคืน
    const expropEl = document.getElementById('propExprop');
    expropEl.innerText = data.exprop;
    expropEl.style.color = data.expropColor;
    expropEl.style.backgroundColor = data.expropBg;

    // อัปเดตความเสี่ยง
    const riskEl = document.getElementById('simRisk');
    riskEl.innerText = data.risk; riskEl.style.color = data.riskColor; riskEl.style.borderColor = data.riskColor;
    if(data.riskColor === '#ef4444') { riskEl.style.backgroundColor = '#fee2e2'; } else { riskEl.style.backgroundColor = '#f8fafc'; }

    // เครื่องคิดเลข
    document.getElementById('calcBasePrice').value = data.value.toLocaleString();
    document.getElementById('calcHoldingTax').value = (data.value * 0.003).toLocaleString();
    calculateExitTax(); 

    // Chatbot
    document.getElementById('chatArea').innerHTML = `<div class="msg ai-msg">โหลดข้อมูล GIS โฉนด ${id} สำเร็จ! มีข้อสงสัยเรื่องกฎหมายผังเมือง พิมพ์ถามบอทได้เลยครับ 👇</div>`;
}

// ==========================================
// 🤖 LLM Chatbot
// ==========================================
function askLLM() {
    const input = document.getElementById('userInput');
    const msg = input.value.trim();
    if(!msg) return;

    const chatArea = document.getElementById('chatArea');
    chatArea.innerHTML += `<div class="msg user-msg">${msg}</div>`;
    input.value = ''; chatArea.scrollTop = chatArea.scrollHeight;

    setTimeout(() => {
        let reply = currentData ? currentData.llmContext : "กรุณาค้นหาที่ดินก่อนครับ";
        if (msg.includes("ภาษี")) reply = "ภาษีรกร้างปัจจุบันอยู่ที่ 0.3% แนะนำให้ทำเกษตรกรรมเพื่อลดเหลือ 0.01% ครับ";
        if (msg.includes("เวนคืน")) reply = currentData ? currentData.llmContext : "ระบบตรวจสอบแนวเวนคืนจาก พ.ร.ฎ. ล่าสุดครับ";
        
        chatArea.innerHTML += `<div class="msg ai-msg"><i class="fa-solid fa-sparkles text-accent"></i> ${reply}</div>`;
        chatArea.scrollTop = chatArea.scrollHeight;
    }, 800);
}

// ==========================================
// 💰 Exit Tax Calculator
// ==========================================
function calculateExitTax() {
    if(!currentData) return;
    const baseValue = currentData.value;
    const isUnder5 = document.querySelector('input[name="holdPeriod"]:checked').value === 'under5';
    
    const taxRate = isUnder5 ? 0.033 : 0.005; 
    const taxName = isUnder5 ? "ภาษีธุรกิจเฉพาะ (3.3%)" : "อากรแสตมป์ (0.5%)";
    const taxAmount = baseValue * taxRate;
    const netAmount = baseValue - taxAmount;

    document.getElementById('chartTaxLabel').innerText = taxAmount.toLocaleString();
    document.getElementById('resBasePrice').innerText = baseValue.toLocaleString() + " ฿";
    document.getElementById('resTaxName').innerText = taxName;
    document.getElementById('resTaxAmount').innerText = taxAmount.toLocaleString() + " ฿";
    document.getElementById('resNetPrice').innerText = netAmount.toLocaleString() + " ฿";

    const circle = document.querySelector('.circle-chart');
    const color = isUnder5 ? '#ef4444' : '#f59e0b'; 
    document.getElementById('chartTaxLabel').style.color = color;
    document.getElementById('resTaxAmount').style.color = color;
    document.getElementById('dotColor').style.background = color;
    
    const percentage = isUnder5 ? '15%' : '5%';
    circle.style.background = `conic-gradient(${color} 0% ${percentage}, var(--border) ${percentage} 100%)`;
}