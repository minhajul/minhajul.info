<div>
    <canvas id="barChart" width="400" height="400"></canvas>
</div>

@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js"></script>
    <script>
        let barChart = document.getElementById('barChart').getContext('2d');
        new Chart(barChart, {
            type: 'bar',
            data: {
                labels: {!! $expensesByMonth->pluck('month_name') !!},
                datasets: [{
                    label: '# Expense by Month',
                    data: {!! $expensesByMonth->pluck('total') !!},
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                cutoutPercentage: 40,
                responsive: true,
            }
        });
    </script>
@endpush
