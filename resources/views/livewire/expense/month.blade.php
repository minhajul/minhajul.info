<div>
    <div class="pb-5">
        <label for="filter" class="block text-sm font-medium text-gray-700">Filter</label>
        <select wire:model="filter" id="filter" name="filter" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option>----</option>
            <option value="3">Last 3 months</option>
            <option value="6">Last 6 months</option>
            <option value="12">Last 12 months</option>
        </select>
    </div>

    <canvas id="barChart" width="400" height="350"></canvas>
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
                        'rgb(22 163 74)',
                        'rgb(45 212 191)',
                        'rgb(6 182 212)',
                        'rgb(14 165 233)'
                    ],
                    borderColor: [
                        'rgb(22 163 74)',
                        'rgb(45 212 191)',
                        'rgb(6 182 212)',
                        'rgb(14 165 233)'
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
