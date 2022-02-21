@extends('layouts.admin')

@section('content')
    <div class="bg-gray-100">
        <div class="py-3 max-w-7xl mx-auto px-4 sm:px-6">
            <h2 class="text-lg leading-6 font-medium text-gray-900">Overview</h2>
            <div class="mt-2 grid grid-cols-2 gap-5 sm:grid-cols-1 lg:grid-cols-2" x-max="1">
                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                        <livewire:expense.category />
                    </div>
                </div>

                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                        <livewire:expense.month />
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
