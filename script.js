let chart;

// ฟังก์ชันจำลองการโหลดข้อมูล
function mockFetchData() {
    const btn = document.getElementById('searchBtn');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
    btn.style.opacity = "0.7";
    
    setTimeout(() => {
        document.getElementById('assessmentData').classList.remove('hidden');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Found';
        btn.style.background = "#32804f";
        btn.style.opacity = "1";
    }, 1000);
}

function calculateTax() {
    const type = document.getElementById("type").value;
    const value = parseFloat(document.getElementById("value").value);

    if (!value || value <= 0) {
        alert("กรุณาใส่มูลค่าประเมินที่ดิน");
        return;
    }

    // อัตราภาษีตามกฎหมาย (โดยประมาณ)
    const rates = {
        residential: 0.0002, // 0.02% 
        commercial: 0.003,   // 0.3% 
        agriculture: 0.0001  // 0.01% 
    };

    const tax = value * rates[type];
    const agTax = value * rates.agriculture; 
    const savings = tax - agTax; 

    // แสดงผล
    document.getElementById("currentTaxAmount").innerText = tax.toLocaleString() + " ฿ / ปี";
    document.getElementById("results").classList.remove('hidden');

    // ข้อความ AI 
    const aiBox = document.getElementById("aiBox");
    if (type !== "agriculture" && savings > 0) {
        aiBox.style.display = "block";
        document.getElementById("aiMessage").innerHTML = 
            `หากคุณปรับปรุงพื้นที่นี้ให้เป็น <b>"พื้นที่เกษตรกรรม"</b> ภาษีจะลดลงเหลือเพียง <b style="font-size:1.2em;">${agTax.toLocaleString()} บาท/ปี</b><br><br>
            ✨ คุณจะสามารถลดต้นทุนภาษีได้ถึง <b>${savings.toLocaleString()} บาท/ปี</b>`;
    } else {
        aiBox.style.display = "none";
    }

    renderChart(value, rates);
    
    // เลื่อนหน้าจอลงมาดูผลลัพธ์แบบนุ่มนวล
    setTimeout(() => {
        document.getElementById("results").scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function renderChart(baseValue, rates) {
    const residential = baseValue * rates.residential;
    const commercial = baseValue * rates.commercial;
    const agriculture = baseValue * rates.agriculture;

    const ctx = document.getElementById('taxChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['ที่อยู่อาศัย (0.02%)', 'รกร้าง/พาณิชย์ (0.3%)', 'เกษตร (0.01%)'],
            datasets: [{
                label: 'ภาระภาษี (บาท/ปี)',
                data: [residential, commercial, agriculture],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)', // สีฟ้า
                    'rgba(211, 47, 47, 0.8)',  // สีแดง
                    'rgba(50, 128, 79, 0.8)'   // สีเขียว
                ],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ' ' + context.raw.toLocaleString() + ' บาท/ปี';
                        }
                    }
                }
            },
            scales: {
                y: { 
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}