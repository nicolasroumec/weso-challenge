document.addEventListener('DOMContentLoaded', () => {
    const ratesResultsElement = document.getElementById('ratesResults');
    const selectedDateInput = document.getElementById('selectedDate');
    const getRatesButton = document.getElementById('getRates');

    const today = new Date();
    const minDate = new Date('1999-01-01');
    
    selectedDateInput.max = today.toISOString().split('T')[0];
    selectedDateInput.min = minDate.toISOString().split('T')[0];
    selectedDateInput.value = today.toISOString().split('T')[0];

    function displayRates(data) {
        const dateElement = ratesResultsElement.querySelector('.date');
        const ratesElement = ratesResultsElement.querySelector('.rates');
        
        dateElement.textContent = `Date: ${data.date}`;
        
        ratesElement.innerHTML = '';
        Object.entries(data.rates).forEach(([currency, rate]) => {
            const rateElement = document.createElement('div');
            rateElement.classList.add('rate-item');
            rateElement.innerHTML = `<span class="currency">${currency}:</span> <span class="rate">${Number(rate).toFixed(4)}</span>`;
            ratesElement.appendChild(rateElement);
        });

        ratesResultsElement.style.display = 'block';
    }

    async function fetchRates(date) {
        try {
            const response = await fetch(`/api/historical/${date}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching rates:', error);
            throw error;
        }
    }

    getRatesButton.addEventListener('click', async () => {
        const selectedDate = selectedDateInput.value;
        if (!selectedDate) {
            alert('Please select a date');
            return;
        }
        try {
            const data = await fetchRates(selectedDate);
            displayRates(data);
        } catch (error) {
            ratesResultsElement.innerHTML = '<p>Error fetching exchange rates. Please try again.</p>';
        }
    });
});