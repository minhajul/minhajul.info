@extends('layouts.admin')

@section('content')
    <div class="bg-gray-100">
        <div class="py-3 max-w-7xl mx-auto px-4 sm:px-6">
            <h2 class="text-lg leading-6 font-medium text-gray-900">Overview</h2>
            <div class="mt-2 grid grid-cols-2 gap-5 sm:grid-cols-1 lg:grid-cols-2" x-max="1">

                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="p-2">
                        <canvas id="doughnutChart" width="400" height="400"></canvas>
                    </div>
                </div>

                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                        <canvas id="barChart" width="400" height="400"></canvas>
{{--                        <div class="border-t border-gray-200">--}}
{{--                            @foreach($reports as $report)--}}
{{--                                <dl>--}}
{{--                                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">--}}
{{--                                        <dt class="text-sm font-medium text-gray-500">--}}
{{--                                            {{ $report->category_name }}--}}
{{--                                        </dt>--}}
{{--                                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">--}}
{{--                                            ${{ $report->total_amount }}--}}
{{--                                        </dd>--}}
{{--                                    </div>--}}
{{--                                </dl>--}}
{{--                            @endforeach--}}
{{--                        </div>--}}
                    </div>
                </div>
            </div>

{{--            <div class="mt-6 flex flex-col">--}}
{{--                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">--}}
{{--                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">--}}
{{--                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">--}}
{{--                            <table class="min-w-full divide-y divide-gray-200">--}}
{{--                                <thead class="bg-gray-50">--}}
{{--                                <tr>--}}
{{--                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>--}}
{{--                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>--}}
{{--                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>--}}
{{--                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>--}}
{{--                                    <th scope="col" class="relative px-6 py-3">--}}
{{--                                        <span class="sr-only">Edit</span>--}}
{{--                                    </th>--}}
{{--                                </tr>--}}
{{--                                </thead>--}}
{{--                                <tbody class="bg-white divide-y divide-gray-200">--}}
{{--                                <tr>--}}
{{--                                    <td class="px-6 py-4 whitespace-nowrap">--}}
{{--                                        <div class="flex items-center">--}}
{{--                                            <div class="flex-shrink-0 h-10 w-10">--}}
{{--                                                <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">--}}
{{--                                            </div>--}}
{{--                                            <div class="ml-4">--}}
{{--                                                <div class="text-sm font-medium text-gray-900">Jane Cooper</div>--}}
{{--                                                <div class="text-sm text-gray-500">jane.cooper@example.com</div>--}}
{{--                                            </div>--}}
{{--                                        </div>--}}
{{--                                    </td>--}}
{{--                                    <td class="px-6 py-4 whitespace-nowrap">--}}
{{--                                        <div class="text-sm text-gray-900">Regional Paradigm Technician</div>--}}
{{--                                        <div class="text-sm text-gray-500">Optimization</div>--}}
{{--                                    </td>--}}
{{--                                    <td class="px-6 py-4 whitespace-nowrap">--}}
{{--                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"> Active </span>--}}
{{--                                    </td>--}}
{{--                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Admin</td>--}}
{{--                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">--}}
{{--                                        <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>--}}
{{--                                    </td>--}}
{{--                                </tr>--}}

{{--                                <!-- More people... -->--}}
{{--                                </tbody>--}}
{{--                            </table>--}}
{{--                        </div>--}}
{{--                    </div>--}}
{{--                </div>--}}
{{--            </div>--}}
        </div>
    </div>
@endsection

@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js"></script>
    <script>
        let doughnutChart = document.getElementById('doughnutChart').getContext('2d');
        new Chart(doughnutChart, {
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
                //cutoutPercentage: 40,
                responsive: true,
            }
        });
    </script>
@endpush
