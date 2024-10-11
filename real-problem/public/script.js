function formatJSON(json) {
    if (typeof json !== 'object') {
        return JSON.stringify(json);
    }
    
    const formattedJSON = Object.entries(json).map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
            return `<div class="json-item"><span class="json-key">${key}:</span> <span class="json-value">${formatJSON(value)}</span></div>`;
        } else {
            return `<div class="json-item"><span class="json-key">${key}:</span> <span class="json-value">${value}</span></div>`;
        }
    }).join('');

    return `<div class="json-object">${formattedJSON}</div>`;
}

function toggleJSON(element) {
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const latestRatesElement = document.getElementById('latestRates');
    const historicalRatesElement = document.getElementById('historicalRates');

    document.getElementById('getLatestRates').addEventListener('click', async () => {
        if (latestRatesElement.innerHTML.trim() !== '') {
            toggleJSON(latestRatesElement);
        } else {
            const response = await fetch('/api/latest');
            const data = await response.json();
            latestRatesElement.innerHTML = formatJSON(data);
            latestRatesElement.style.display = 'block';
        }
    });

    document.getElementById('getHistoricalRates').addEventListener('click', async () => {
        if (historicalRatesElement.innerHTML.trim() !== '') {
            toggleJSON(historicalRatesElement);
        } else {
            const date = document.getElementById('historicalDate').value;
            const response = await fetch(`/api/historical/${date}`);
            const data = await response.json();
            historicalRatesElement.innerHTML = formatJSON(data);
            historicalRatesElement.style.display = 'block';
        }
    });
});