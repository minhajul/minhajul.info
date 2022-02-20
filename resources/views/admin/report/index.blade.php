@extends('layouts.admin')

@section('content')
    <div class="bg-gray-100">
        <div class="py-3 max-w-7xl mx-auto px-4 sm:px-6">

        <div>
            <h2 class="text-lg leading-6 font-medium text-gray-900">Overview</h2>
            <div class="mt-2 grid grid-cols-2 gap-5 sm:grid-cols-1 lg:grid-cols-2" x-max="1">
                <!-- Card -->

                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="p-2">
                        <canvas id="doughnutChart" width="400" height="400"></canvas>
                    </div>
                </div>

                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                        <div class="border-t border-gray-200">
                            @foreach($reports as $report)
                                <dl>
                                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500">
                                            {{ $report->category_name }}
                                        </dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            ${{ $report->total_amount }}
                                        </dd>
                                    </div>
                                </dl>
                            @endforeach
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js"></script>
    <script>
        let ctx = document.getElementById('doughnutChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: {!! $categories !!},
                datasets: [{
                    label: '# of Tomatoes',
                    data: {!! $amounts !!},
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
                //cutoutPercentage: 40,
                responsive: true,
            }
        });
    </script>
@endpush
