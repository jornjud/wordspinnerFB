// ฟังก์ชันสำหรับสุ่มโดยใช้ Seed คงที่
function seededRandom(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// ฟังก์ชันสำหรับสร้างลำดับการสับเปลี่ยน
function getShuffleOrder(length, seed) {
    let order = Array.from(Array(length).keys());
    for (let i = length - 1; i > 0; i--) {
        let j = Math.floor(seededRandom(seed + i) * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

// ฟังก์ชันสำหรับเข้ารหัส
function encode(text) {
    let seed = 42; // Seed คงที่
    let order = getShuffleOrder(text.length, seed);
    let result = '';
    for (let i = 0; i < order.length; i++) {
        result += text[order[i]];
    }
    return result;
}

// ฟังก์ชันสำหรับถอดรหัส
function decode(text) {
    let seed = 42; // ต้องใช้ Seed เดียวกันกับตอนเข้ารหัส
    let order = getShuffleOrder(text.length, seed);
    let result = [];
    for (let i = 0; i < order.length; i++) {
        result[order[i]] = text[i];
    }
    return result.join('');
}

// การอ้างอิงถึงองค์ประกอบใน DOM
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const modeSelection = document.getElementsByName('mode');
const copyButton = document.getElementById('copyButton');
const clearButton = document.getElementById('clearButton');
const messageDiv = document.getElementById('message');

// ฟังก์ชันสำหรับอัปเดตผลลัพธ์
function updateOutput() {
    let text = inputText.value;
    let mode = Array.from(modeSelection).find(radio => radio.checked).value;
    try {
        if (mode === 'encode') {
            outputText.value = encode(text);
        } else {
            outputText.value = decode(text);
        }
        messageDiv.textContent = ''; 
    } catch (error) {
        messageDiv.textContent = 'เกิดข้อผิดพลาดในการเข้ารหัส/ถอดรหัส'; 
        console.error("Error encoding/decoding:", error); 
    }
}

// ฟังก์ชันสำหรับคัดลอกผลลัพธ์
function copyResult() {
    if (outputText.value.trim() === '') {
        messageDiv.textContent = 'ไม่มีข้อความให้คัดลอก';
        return;
    }
    outputText.select();
    document.execCommand('copy');
    messageDiv.textContent = 'คัดลอกข้อความแล้ว';
}

// ฟังก์ชันสำหรับล้างข้อความ
function clearText() {
    inputText.value = '';
    outputText.value = '';
    messageDiv.textContent = '';
}

// การเชื่อมต่อเหตุการณ์กับองค์ประกอบ
inputText.addEventListener('input', updateOutput);
Array.from(modeSelection).forEach(radio => radio.addEventListener('change', updateOutput));
copyButton.addEventListener('click', copyResult);
clearButton.addEventListener('click', clearText);