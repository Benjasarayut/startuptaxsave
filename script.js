let chart;

const landDatabase = [
    { id: '8899', owner: 'นายสมบูรณ์ พูนทรัพย์', area: 10, location: 'ต.แม่เหียะ อ.เมือง จ.เชียงใหม่', type: 'private', value: 12000000 },
    { id: '1234', owner: 'นางใจดี มีที่ดิน', area: 5, location: 'ต.สุเทพ อ.เมือง จ.เชียงใหม่', type: 'private', value: 8500000 },
    { id: '7777', owner: 'นายอาสา พิทักษ์สิทธิ์', area: 10, location: 'ต.ดอนแก้ว อ.แม่ริม (แนวเวนคืน)', type: 'warning', value: 15000000 },
    { id: '9999', owner: 'กรมป่าไม้', area: 50, location: 'เขตป่าสงวนแห่งชาติ', type: 'state', value: 0 }
];

function mockFetchData() {
    const searchId = document.getElementById('landId').value;
    const targetArea = parseFloat(document.getElementById('targetArea').value);
    const btn = document.getElementById('searchBtn');

    if (!searchId) return alert("กรุณาใส่เลขโฉนด");

    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Matching...';
    btn.disabled = true;

    setTimeout(() => {
        const match = landDatabase.find(land => land.id === searchId && (!targetArea || land.area === targetArea));
        if (match) {
            displayLandInfo(match);
        } else {
            alert("ไม่พบข้อมูลที่ตรงกัน");
        }
        btn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> ค้นหา';
        btn.disabled = false;
    }, 800);
}

function displayLandInfo(data) {
    document.getElementById('assessmentData').classList.remove('hidden');
    document.getElementById('results').classList.add('hidden');
    document.getElementById('locationDisplay').value = `${data.location} [${data.area} ไร่]`;
    document.getElementById('ownerName').innerText = data.owner;
    document.getElementById('landValue').value = data.value;

    const badge = document.getElementById('ownerTypeBadge');
    const note = document.getElementById('ownerNote');
    const analyzeBtn = document.getElementById('analyzeBtn');

    note.classList.add('hidden');
    analyzeBtn.disabled = false;

    if (data.type === 'state') {
        badge.innerText = 'ที่ดินรัฐ'; badge.className = 'badge-state';
        note.classList.remove('hidden');
        note.style.borderColor = "#dc2626"; note.style.background = "#fef2f2";
        note.innerHTML = "<b>ระวัง:</b> ที่ดินรัฐห้ามบุกรุก";
        analyzeBtn.disabled = true;
    } else if (data.type === 'warning') {
        badge.innerText = 'ติดแนวเวนคืน'; badge.className = 'badge-state';
        badge.style.background = "#fffbeb"; badge.style.color = "#92400e";
        note.classList.remove('hidden');
        note.style.borderColor = "#f59e0b"; note.style.background = "#fffbeb";
        note.innerHTML = "<b>AI Alert:</b> ตรวจพบแนวเวนคืน พ.ศ. 2569";
    } else {
        badge.innerText = 'เอกชน'; badge.className = 'badge-private';
    }
}

function calculateTax() {
    const val = parseFloat(document.getElementById('landValue').value);
    const type = document.getElementById('type').value;
    const rates = { commercial: 0.003, residential: 0.0002, agriculture: 0.0001 };
    const tax = val * rates[type];
    const savings = tax - (val * rates.agriculture);

    document.getElementById('currentTaxAmount').innerText = tax.toLocaleString() + " ฿ / ปี";
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('aiMessage').innerHTML = `ประหยัดได้ถึง <b>${savings.toLocaleString()} ฿/ปี</b> หากทำเกษตรกรรม`;

    if (tax >= 10000) document.getElementById('exitStrategy').classList.remove('hidden');
    else document.getElementById('exitStrategy').classList.add('hidden');

    updateChart(val, rates);
}

// Modal Functions
function openModal(id) { document.getElementById(id).style.display = "block"; }
function closeModal(id) { document.getElementById(id).style.display = "none"; }

function confirmPartner(name) {
    alert(`คุณเลือกพาร์ทเนอร์: ${name}\nเจ้าหน้าที่จะติดต่อกลับเพื่อทำใบเสนอราคาให้คุณครับ`);
    closeModal('packageModal');
}

function submitToInvestor() {
    const phone = document.getElementById('investorPhone').value;
    if (!phone) return alert("กรุณากรอกเบอร์โทรศัพท์");
    alert(`ส่งข้อมูลโฉนดให้พาร์ทเนอร์นักลงทุนแล้ว!\nเบอร์ติดต่อของคุณ: ${phone}\nขอบคุณที่ใช้บริการ TaxSave.AI`);
    closeModal('investorModal');
}

function updateChart(baseVal, rates) {
    const ctx = document.getElementById('taxChart').getContext('2d');
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['อยู่อาศัย', 'รกร้าง', 'เกษตร'],
            datasets: [{
                label: 'ภาระภาษี (บาท)',
                data: [baseVal * rates.residential, baseVal * rates.commercial, baseVal * rates.agriculture],
                backgroundColor: ['#3b82f6', '#ef4444', '#15803d'],
                borderRadius: 8
            }]
        }
    });
}