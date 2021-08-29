<?php

namespace App\Http\Controllers;

use App\Http\Requests\SettingsRequest;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index()
    {
        $user = User::find(auth()->id());

        $setting = $user->setting;

        return view('admin.settings.index', compact('setting'));
    }

    public function update(SettingsRequest $request, Setting $setting): RedirectResponse
    {
        $setting->update([
            'income' => $request->input('income'),
            'savings' => $request->input('savings'),
        ]);

        session()->flash('success', 'The settings has been update');
        return back();
    }
}
