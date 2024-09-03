const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

document.getElementById('convertBtn').addEventListener('click', function () {
    const conversionType = document.querySelector('input[name="conversion"]:checked').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const rate = parseFloat(document.getElementById('rate').value);
    let result = 0;
    let formula = '';

    if (conversionType === 'usdToMxn') {
        result = amount * rate;
        formula = `${formatter.format(amount)} USD = ${formatter.format(result)} MXN`;
    } else {
        result = amount / rate;
        formula = `${formatter.format(amount)} MXN = ${formatter.format(result)} USD`;
    }

    document.getElementById('result').innerText = formula;
});

document.getElementById('fetchRateBtn').addEventListener('click', function () {
    fetch('https://openexchangerates.org/api/latest.json?app_id=113d7827d40d485bb66a483a3267dc3e')
        .then(response => response.json())
        .then(data => {
            const rate = data.rates.MXN;
            const timestamp = new Date(data.timestamp * 1000);

            const formattedDate = timestamp.toLocaleString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });

            document.getElementById('rate').value = rate.toFixed(6);
            document.getElementById('timestamp').innerText = `Rate last updated: ${formattedDate}`;
        })
        .catch(error => console.error('Error fetching rate:', error));
});
