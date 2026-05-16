// app.js — отримує дані про студента з Azure Functions API
async function loadApiData() {
const box = document.getElementById('api-result')
box.textContent = 'Завантаження...'
try {
// Запит до Azure Functions (папка /api/about)
const response = await fetch('/api/about')
if (!response.ok) {
throw new Error('HTTP ' + response.status)
}
const data = await response.json()
// Відображаємо дані у вигляді красивої картки
renderStudentCard(box, data)
} catch (error) {
box.textContent = 'Помилка: ' + error.message
box.style.color = '#e74c3c'
}
}
// Завантажуємо дані автоматично при відкритті сторінки
loadApiData()
// Відображає дані з API у вигляді структурованої картки
function renderStudentCard(container, data) {
const fields = [
{ key: 'name', label: '�� Name&#39},
{ key: 'email', label: '�� Email&#39},
{ key: 'specialty', label: '�� Speciality&#39},
{ key: 'labs_done', label: '✅ Labs&#39},
{ key: 'platform', label: '☁️ Platform&#39},
]
const skillsHtml = (data.skills || []).map(s => `<span class="api-
tag">${s}</span>`).join('')
let html = fields.map(f => `
<div class="info-row">
<span class="label">${f.label}</span>
<span class="value">${data[f.key]}</span>
</div>`).join('')
html += `<div class="info-row"><span class="label">�� Skills</span>&ltdi
class="skills-tags">${skillsHtml}</div></div>`
html += `<p class="api-timestamp">� Оновлено: ${data.deployed_at}</p>`
container.innerHTML = html
}
