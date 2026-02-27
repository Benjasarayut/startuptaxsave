let chart;

function mockFetchData() {
    const btn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('landId').value;
    
    // แสดงสถานะกำลังโหลด
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
    btn.style.opacity = "0.7";
    
    setTimeout(() => {
        document.getElementById('assessmentData').classList.remove('hidden');
        document.getElementById('results').classList.add('hidden'); 
        
        // --- 🔴 กรณีที่ 1: ที่ดินของรัฐ (พิมพ์ 9999) ---
        if (searchInput.includes('9999') || searchInput.includes('รัฐ')) {
            document.getElementById('location').value = "ต.ช้างเผือก อ.เมือง จ.เชียงใหม่ (พื้นที่ป่าสงวน)";
            
            document.getElementById('ownerTypeBadge').className = 'badge-state';
            document.getElementById('ownerTypeBadge').style.background = "#fee2e2";
            document.getElementById('ownerTypeBadge').style.color = "#b91c1c";
            document.getElementById('ownerTypeBadge').style.borderColor = "#f87171";
            document.getElementById('ownerTypeBadge').innerText = 'ที่ดินของรัฐ (ห้ามซื้อขาย)';
            
            document.getElementById('ownerName').innerText = 'กรมป่าไม้ (กระทรวงทรัพยากรธรรมชาติฯ)';
            
            const note = document.getElementById('ownerNote');
            note.classList.remove('hidden');
            note.style.borderLeftColor = "#ef4444";
            note.style.backgroundColor = "#fef2f2";
            note.style.color = "#b91c1c";
            note.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> <b>สาเหตุที่ตกเป็นของรัฐ:</b> พื้นที่ประกาศเป็นเขตป่าสงวนแห่งชาติ (พื้นที่ทับซ้อน)';
            
            // ล็อกปุ่ม
            document.getElementById('value').value = 0;
            document.getElementById('value').disabled = true;
            document.getElementById('type').disabled = true;
            document.getElementById('analyzeBtn').style.background = "#9ca3af";
            document.getElementById('analyzeBtn').innerText = "ได้รับการยกเว้นภาษีที่ดิน";
            document.getElementById('analyzeBtn').disabled = true;

        // --- 🟠 กรณีที่ 2: ติดแนวเวนคืน (พิมพ์ 7777) ---
        } else if (searchInput.includes('7777') || searchInput.includes('เวนคืน')) {
            document.getElementById('location').value = "ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่ (โครงการขยายทางหลวง)";
            
            document.getElementById('ownerTypeBadge').className = 'badge-state';
            document.getElementById('ownerTypeBadge').style.background = "#fffbeb"; 
            document.getElementById('ownerTypeBadge').style.color = "#b45309";
            document.getElementById('ownerTypeBadge').style.borderColor = "#fcd34d";
            document.getElementById('ownerTypeBadge').innerText = '⚠️ พื้นที่เฝ้าระวัง (ติดแนวเวนคืน)';
            
            document.getElementById('ownerName').innerText = 'นาย ส**** รักษ์ที่ดิน (เอกชน)';
            
            const note = document.getElementById('ownerNote');
            note.classList.remove('hidden');
            note.style.borderLeftColor = "#f59e0b"; 
            note.style.backgroundColor = "#fffbeb";
            note.style.color = "#b45309";
            note.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> <b>AI Alert:</b> ที่ดินแปลงนี้อยู่ในแนวเขต พ.ร.ฎ. เวนคืนที่ดิน (โครงการทางหลวงแนวใหม่) <b>แนะนำให้ชะลอการลงทุนก่อสร้าง</b>';
            
            // ปลดล็อกให้คำนวณได้
            document.getElementById('value').value = 5000000;
            document.getElementById('value').disabled = false;
            document.getElementById('type').disabled = false;
            document.getElementById('analyzeBtn').style.background = "#449c63";
            document.getElementById('analyzeBtn').innerHTML = '<i class="fa-solid fa-lightbulb"></i> AI Analysis Assessment';
            document.getElementById('analyzeBtn').disabled = false;

        // --- 🟢 กรณีที่ 3: ที่ดินเอกชนปกติ (พิมพ์อื่นๆ เช่น 8899) ---
        } else {
            document.getElementById('location').value = "ต.แม่เหียะ อ.เมือง จ.เชียงใหม่ 50100";
            
            document.getElementById('ownerTypeBadge').className = 'badge-private';
            document.getElementById('ownerTypeBadge').style.background = "#dbeafe";
            document.getElementById('ownerTypeBadge').style.color = "#1e40af";
            document.getElementById('ownerTypeBadge').style.borderColor = "transparent";
            document.getElementById('ownerTypeBadge').innerText = 'บุคคลธรรมดา (เอกชน)';
            
            document.getElementById('ownerName').innerText = 'นาย ส**** รักษ์ที่ดิน (สงวนนามสกุลตาม PDPA)';
            document.getElementById('ownerNote').classList.add('hidden');
            
            // ปลดล็อกให้คำนวณได้
            document.getElementById('value').value = 5000000;
            document.getElementById('value').disabled = false;
            document.getElementById('type').disabled = false;
            document.getElementById('analyzeBtn').style.background = "#449c63";
            document.getElementById('analyzeBtn').innerHTML = '<i class="fa-solid fa-lightbulb"></i> AI Analysis Assessment';
            document.getElementById('analyzeBtn').disabled = false;
        }
        
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Found';
        btn.style.background = "#32804f";
        btn.style.opacity = "1";
    }, 800);
}

function calculateTax() {
    const location = document.getElementById("location").value || "พื้นที่ของคุณ";
    const type = document.getElementById("type").value;
    const value = parseFloat(document.getElementById("value").value);

    if (!value || value <= 0) {
        alert("กรุณาใส่มูลค่าประเมินที่ดิน");
        return;
    }

    const rates = {
        residential: 0.0002, 
        commercial: 0.003,   
        agriculture: 0.0001  
    };

    const tax = value * rates[type];
    const agTax = value * rates.agriculture; 
    const savings = tax - agTax; 

    document.getElementById("currentTaxAmount").innerText = tax.toLocaleString() + " ฿ / ปี";
    document.getElementById("results").classList.remove('hidden');

    const aiBox = document.getElementById("aiBox");
    if (type !== "agriculture" && savings > 0) {
        aiBox.style.display = "block";
        document.getElementById("aiMessage").innerHTML = 
            `หากคุณปรับปรุง <b>"${location}"</b> ให้เป็นพื้นที่เกษตรกรรม ภาษีจะลดลงเหลือเพียง <b style="font-size:1.2em;">${agTax.toLocaleString()} บาท/ปี</b><br><br>
            ✨ คุณจะสามารถลดต้นทุนภาษีได้ถึง <b>${savings.toLocaleString()} บาท/ปี</b>`;
    } else {
        aiBox.style.display = "none";
    }

    renderChart(value, rates);
    
    setTimeout(() => {
        document.getElementById("results").scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function renderChart(baseValue, rates) {
    const residential = baseValue * rates.residential;
    const commercial = baseValue * rates.commercial;
    const agriculture = baseValue * rates.agriculture;

    const ctx = document.getElementById('taxChart').getContext('2d');

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['ที่อยู่อาศัย (0.02%)', 'รกร้าง/พาณิชย์ (0.3%)', 'เกษตร (0.01%)'],
            datasets: [{
                label: 'ภาระภาษี (บาท/ปี)',
                data: [residential, commercial, agriculture],
                backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(211, 47, 47, 0.8)', 'rgba(50, 128, 79, 0.8)'],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) { return ' ' + context.raw.toLocaleString() + ' บาท/ปี'; }
                    }
                }
            },
            scales: {
                y: { beginAtZero: true, ticks: { callback: function(value) { return value.toLocaleString(); } } }
            }
        }
    });
}