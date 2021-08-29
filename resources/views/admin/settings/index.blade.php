@extends('layouts.admin')

@section('content')
    <div class="bg-gray-100">
        <div class="py-3 max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                <div class="grid grid-cols-1 lg:col-span-3">
                    <div class="flex items-center justify-between flex-wrap sm:flex-nowrap">
                        <div class="mt-2">
                            <h3 class="text-xl leading-6 font-medium text-gray-900">
                                Settings
                            </h3>
                        </div>
                    </div>

                    @include('flash.success')
                    @include('flash.message')

                    <div class="mt-2 grid grid-cols-1 gap-5">
                        <form action="{{ route('admin.settings.edit', $setting) }}" method="post">
                            @csrf
                            @method('PUT')

                            <div class="px-4 py-5 bg-white sm:p-6 shadow rounded-md">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6">
                                        <label class="block font-medium text-sm text-gray-700" for="income">
                                            Income <span class="text-red-500">*</span>
                                        </label>

                                        <input type="text" name="income" value="{{ old('income', $setting->income ?? 0) }}" class="mt-2 shadow-sm appearance-none border border-gray-200 rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none">
                                        @error('income') <span class="text-red-500 text-sm italic">{{ $message }}</span> @enderror
                                    </div>

                                    <div class="col-span-6">
                                        <label class="block font-medium text-sm text-gray-700" for="savings">
                                            Savings (%) <span class="text-red-500">*</span>
                                        </label>

                                        <input type="text" name="savings" value="{{ old('savings', $setting->savings ?? 0) }}" class="mt-2 shadow-sm appearance-none border border-gray-200 rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none">
                                        @error('savings') <span class="text-red-500 text-sm italic">{{ $message }}</span> @enderror
                                    </div>
                                </div>

                                <div class="flex items-center justify-end text-right mt-5">
                                    <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-xs-gray disabled:opacity-25 transition ease-in-out duration-150">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
