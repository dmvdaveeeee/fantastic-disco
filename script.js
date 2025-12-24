// Clothing items with unique chart colors
const items = [
    { name: "Puffer Jacket", color: "rgba(255,0,0,0.7)", monthlyData: [] },
    { name: "Soccer Jersey", color: "rgba(0,128,0,0.7)", monthlyData: [] },
    { name: "Hoodie", color: "rgba(0,0,255,0.7)", monthlyData: [] },
    { name: "Ralph Lauren Polo T-shirts", color: "rgba(255,165,0,0.7)", monthlyData: [] }
];

// Generate random monthly data for demonstration
function generateMonthlyData() {
    return Array.from({length: 5}, () => Math.floor(Math.random() * 100000 + 20000));
}

// Render dashboard cards
function renderDashboard() {
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = '';

    items.forEach(item => {
        item.monthlyData = generateMonthlyData();
        const current = item.monthlyData[item.monthlyData.length-1];
        const previous = item.monthlyData[item.monthlyData.length-2] || 1; // prevent division by zero
        const trend = Math.round(((current - previous) / previous) * 100);
        const signal = trend > 15 ? 'BUY' : trend < -10 ? 'SELL' : 'HOLD';

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${item.name}</h2>
            <p>Monthly Searches: ${current.toLocaleString()}</p>
            <p>Trend: ${trend > 0 ? `↑ ${trend}%` : `↓ ${Math.abs(trend)}%`}</p>
            <p>Recommendation: <b>${signal}</b></p>
        `;
        dashboard.appendChild(card);
    });
}

// Render chart
function renderChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');

    const datasets = items.map(item => ({
        label: item.name,
        data: item.monthlyData,
        borderColor: item.color,
        backgroundColor: item.color.replace('0.7','0.3'),
        fill: true,
        tension: 0.4
    }));

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });
}

// Initialize everything
renderDashboard();
renderChart();
