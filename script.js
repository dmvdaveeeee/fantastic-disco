// Mock Data (replace with API data if available)
const items = [
    { name: "Puffer Jacket", searches: 82000, trend: 18 },
    { name: "Soccer Jersey", searches: 134000, trend: 31 },
    { name: "Hoodie", searches: 96000, trend: 6 },
    { name: "Windbreaker", searches: 54000, trend: 22 },
];

// Function to display cards
function renderDashboard() {
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = ''; // clear first

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

// Render line chart using Chart.js
function renderChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Searches Over Time',
                data: [40000, 55000, 78000, 110000, 150000],
                borderColor: 'blue',
                backgroundColor: 'rgba(0,0,255,0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Initialize dashboard
renderDashboard();
renderChart();
