@extends('layouts.admin')

@section('content')
    <div class="mt-8">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-lg leading-6 font-medium text-gray-900">Profile Information</h2>

            <div class="mt-2 grid grid-cols-1 gap-5" x-max="1">

                @include('flash.error')
                @include('flash.success')
                @include('flash.message')

                <livewire:update-profile />

                <div class="hidden sm:block">
                    <div class="py-6">
                        <div class="border-t border-gray-200"></div>
                    </div>
                </div>

                <div class="mt-10 sm:mt-0">
                    <div class="xsm:p-4 md:col-span-2">
                        <livewire:update-password />
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
