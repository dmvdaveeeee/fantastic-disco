// Clothing items (updated: Windbreaker → Ralph Lauren Polo T-shirts)
const items = [
    { name: "Puffer Jacket", searches: 82000, trend: 18, color: "rgba(255,0,0,0.7)" },
    { name: "Soccer Jersey", searches: 134000, trend: 31, color: "rgba(0,128,0,0.7)" },
    { name: "Hoodie", searches: 96000, trend: 6, color: "rgba(0,0,255,0.7)" },
    { name: "Ralph Lauren Polo T-shirts", searches: 54000, trend: 22, color: "rgba(255,165,0,0.7)" },
];

// Display cards with current trend
function renderDashboard() {
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const trendText = item.trend > 0 ? `↑ ${item.trend}%` : `↓ ${Math.abs(item.trend)}%`;
        const signal = item.trend > 15 ? 'BUY' : item.trend < -10 ? 'SELL' : 'HOLD';

        card.innerHTML = `
            <h2>${item.name}</h2>
            <p>Monthly Searches: ${item.searches.toLocaleString()}</p>
            <p>Trend: ${trendText}</p>
            <p>Recommendation: <b>${signal}</b></p>
        `;

        dashboard.appendChild(card);
    });
}

// Chart with different colors per clothing item
function renderChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');

    // Mock monthly data for each item
    const monthlyData = {
        "Puffer Jacket": [40000, 50000, 60000, 70000, 82000],
        "Soccer Jersey": [90000, 100000, 110000, 120000, 134000],
        "Hoodie": [60000, 70000, 80000, 90000, 96000],
        "Ralph Lauren Polo T-shirts": [30000, 35000, 40000, 45000, 54000]
    };

    const datasets = items.map(item => ({
        label: item.name,
        data: monthlyData[item.name],
        borderColor: item.color,
        backgroundColor: item.color.replace('0.7', '0.3'),
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
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Initialize
renderDashboard();
renderChart();
