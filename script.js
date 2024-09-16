const sets = [
    { A: 35000, B: 3000, C: 3000 },
    { A: 38588, B: 6210, C: 3210 },
    { A: 44670, B: 6650, C: 3440 },
    { A: 54296, B: 10330, C: 3680 },
    { A: 69298, B: 14260, C: 3930 },
    { A: 92865, B: 18470, C: 4210 },
    { A: 130670, B: 21460, C: 4500 },
    { A: 193060, B: 25960, C: 4820 },
    { A: 299500, B: 30780, C: 5160 },
    { A: 487850, B: 35930, C: 5520 },
    { A: 834400, B: 41450, C: 5900 },
    { A: 25390000, B: 75390, C: 8280 },
    { A: 58190000, B: 83670, C: 8670 },
    { A: 140040000, B: 92520, C: 9480 }
];

function calculatePercentageIncrease(oldSet, newSet) {
    return {
        A: ((newSet.A - oldSet.A) / oldSet.A * 100).toFixed(2),
        B: ((newSet.B - oldSet.B) / oldSet.B * 100).toFixed(2),
        C: ((newSet.C - oldSet.C) / oldSet.C * 100).toFixed(2)
    };
}

function displayResults() {
    const resultTable = document.getElementById('resultTable');
    for (let i = 0; i < sets.length - 1; i++) {
        const oldSet = sets[i];
        const newSet = sets[i + 1];
        const result = calculatePercentageIncrease(oldSet, newSet);
        const row = `
            <tr>
                <td>Set ${i + 1} to Set ${i + 2}</td>
                <td>${result.A}</td>
                <td>${result.B}</td>
                <td>${result.C}</td>
            </tr>
        `;
        resultTable.innerHTML += row;
    }
}

displayResults();

let percentageChartInstance = null;

function showChart() {
    const labels = sets.map((_, i) => `Set ${i + 1}`);
    const dataA = sets.map(set => set.A);
    const dataB = sets.map(set => set.B);
    const dataC = sets.map(set => set.C);

    const ctx = document.getElementById('percentageChart').getContext('2d');

    if (percentageChartInstance) {
        percentageChartInstance.destroy();
    }

    percentageChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'A',
                    data: dataA,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false
                },
                {
                    label: 'B',
                    data: dataB,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false
                },
                {
                    label: 'C',
                    data: dataC,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Percentage Increase Comparison'
            }
        }
    });
}

const modal = document.getElementById('chartModal');
const btn = document.getElementById('showChartBtn');
const span = document.getElementsByClassName('close')[0];

btn.onclick = function() {
    modal.style.display = 'block';
    showChart(); 
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
