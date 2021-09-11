<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\SettingsRequest;

class SettingsController extends Controller
{
    public function index()
    {
        $user = User::find(auth()->id());

        $setting = $user->setting;

        return view('admin.settings.index', compact('setting'));
    }

    public function update(SettingsRequest $request): RedirectResponse
    {
        $user = User::find(auth()->id());

        if ($setting = $user->setting) {
            $setting->update($request->validated());
        }else{
            $user->setting()->create($request->validated());
        }

        session()->flash('success', 'The settings has been update');
        return back();
    }
}
