@extends('layouts.admin')

@section('content')
    <div class="bg-gray-100">
        <div class="py-3 max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                <div class="grid grid-cols-1 lg:col-span-3">
                    <div class="flex items-center justify-between flex-wrap sm:flex-nowrap">
                        <div class="mt-2">
                            <h3 class="text-xl leading-6 font-medium text-gray-900">
                                People
                            </h3>
                        </div>
                        <div class="ml-4 mt-2 flex-shrink-0">
                            <a href="{{ route('admin.people.index') }}" class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                View All
                            </a>
                        </div>
                    </div>

                    @include('flash.success')
                    @include('flash.message')


                    <div class="mt-2 grid grid-cols-1 gap-5">
                        <form action="{{ route('admin.people.store') }}" method="post" enctype="multipart/form-data">
                            @csrf

                            <div class="px-4 py-5 bg-white sm:p-6 shadow rounded-md">
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6">
                                        <label class="mt-4 block font-medium text-sm text-gray-700" for="avatar">
                                            Upload Profile Picture
                                        </label>

                                        <input type="file" name="avatar" class="mt-2 shadow-sm appearance-none border border-gray-200 rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none">
                                        @error('avatar') <span class="text-red-500 text-sm italic">{{ $message }}</span> @enderror
                                    </div>

                                    <div class="col-span-6">
                                        <label class="block font-medium text-sm text-gray-700" for="name">
                                            Name <span class="text-red-500">*</span>
                                        </label>

                                        <input type="text" name="name" value="{{ old('name') }}" class="mt-2 shadow-sm appearance-none border border-gray-200 rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none">
                                        @error('name') <span class="text-red-500 text-sm italic">{{ $message }}</span> @enderror
                                    </div>

                                    <div class="col-span-6">
                                        <label class="block font-medium text-sm text-gray-700" for="designation">
                                            Designation <span class="text-red-500">*</span>
                                        </label>

                                        <input type="text" name="designation" value="{{ old('designation') }}" class="mt-2 shadow-sm appearance-none border border-gray-200 rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none">
                                        @error('designation') <span class="text-red-500 text-sm italic">{{ $message }}</span> @enderror
                                    </div>

                                    <div class="col-span-6">
                                        <label class="block font-medium text-sm text-gray-700" for="role">
                                            Role <span class="text-red-500">*</span>
                                        </label>

                                        <select name="role" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:outline-none focus:ring-gray-300 focus:border-gray-300 sm:text-sm rounded-md">
                                            <option selected value="">----</option>
                                            @foreach(config('enums.people_roles') as $role)
                                                <option {{ old('role') == $role ? 'selected' : '' }} value="{{ $role }}">{{ $role }}</option>
                                            @endforeach
                                        </select>
                                        @error('role') <span class="text-red-500 text-sm italic">{{ $message }}</span> @enderror
                                    </div>

                                    <div class="col-span-6">
                                        <label class="mb-2 block font-medium text-sm text-gray-700" for="career_summary">
                                            Career Summary <span class="text-red-500">*</span>
                                        </label>

                                        <input id="x" type="hidden" name="career_summary" value="{{ old('career_summary') }}">
                                        <trix-editor name="career_summary" input="x"></trix-editor>
                                        @error('career_summary') <span class="text-red-500 text-sm italic">{{ $message }}</span> @enderror
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
