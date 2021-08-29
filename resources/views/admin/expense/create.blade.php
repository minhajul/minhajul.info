@extends('layouts.admin')

@section('content')
    <div class="bg-gray-100">
        <div class="py-3 max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                <div class="grid grid-cols-1 lg:col-span-3">
                    <div class="flex items-center justify-between flex-wrap sm:flex-nowrap">
                        <div class="mt-2">
                            <h3 class="text-xl leading-6 font-medium text-gray-900">
                                Create Expense
                            </h3>
                        </div>
                        <div class="ml-4 mt-2 flex-shrink-0">
                            <a href="{{ route('admin.expense.index') }}" class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                View All
                            </a>
                        </div>
                    </div>

                    @include('flash.success')
                    @include('flash.message')


                    <div class="mt-2 grid grid-cols-1 gap-5">
                        <form action="{{ route('admin.expense.store') }}" method="post">
                            @csrf

                            <div class="px-4 py-5 bg-white sm:p-6 shadow rounded-md">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6">
                                        <label class="block font-medium text-sm text-gray-700" for="title">
                                            Title <span class="text-red-500">*</span>
                                        </label>

                                        <input type="text" name="title" value="{{ old('title') }}" class="mt-2 shadow-sm appearance-none border border-gray-200 rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none">
                                        @error('title') <span class="text-red-500 text-sm italic">{{ $message }}</span> @enderror
                                    </div>

                                    <div class="col-span-6">
                                        <label class="block font-medium text-sm text-gray-700" for="amount">
                                            Amount <span class="text-red-500">*</span>
                                        </label>

                                        <input type="text" name="amount" value="{{ old('amount') }}" class="mt-2 shadow-sm appearance-none border border-gray-200 rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none">
                                        @error('amount') <span class="text-red-500 text-sm italic">{{ $message }}</span> @enderror
                                    </div>

                                    <div class="col-span-6">
                                        <label class="block font-medium text-sm text-gray-700" for="role">
                                            Category <span class="text-red-500">*</span>
                                        </label>

                                        <select name="category_id" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm rounded-md">
                                            <option selected value="">----</option>
                                            @foreach($categories as $category)
                                                <option {{ old('category_id') == $category->id ? 'selected' : '' }} value="{{ $category->id }}">{{ $category->name }}</option>
                                            @endforeach
                                        </select>
                                        @error('category_id') <span class="text-red-500 text-sm italic">{{ $message }}</span> @enderror
                                    </div>
                                </div>

                                <div class="flex items-center justify-end text-right mt-5">
                                    <button type="submit" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-xs-gray disabled:opacity-25 transition ease-in-out duration-150">
                                        Create
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
