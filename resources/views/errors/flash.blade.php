<div class="max-w-3xl mx-auto lg:max-w-full px-2 mb-4">
    @if( session()->has('success') )
        <div class="mt-3 text-sm bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2" role="alert">
            <span class="block sm:inline">{{ session()->get('success') }}</span>
        </div>
    @endif

    @if( session()->has('error') )
        <div class="mt-3 text-sm bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
            <span class="block sm:inline">{{ session()->get('error') }}</span>
        </div>
    @endif

    @if ($errors->any())
        <div class="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline"><strong>Whoops!</strong> There were some problems with your input.<br></span>
            @foreach ($errors->all() as $error)
                <li class="text-red-700">{{ $error }}</li>
            @endforeach
        </div>
    @endif
</div>
