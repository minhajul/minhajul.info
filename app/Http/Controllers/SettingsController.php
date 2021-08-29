<?php

namespace App\Http\Controllers;

use App\Http\Requests\SettingsRequest;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class SettingsController extends Controller
{
    public function index()
    {
        $user = User::find(auth()->id());

        $setting = $user->setting;

        $response = Gate::inspect('view', $setting);

        if (!$response->allowed()) {
            session()->flash('error', $response->message());
            return back();
        }

        return view('admin.settings.index', compact('setting'));
    }

    public function update(SettingsRequest $request, Setting $setting): RedirectResponse
    {
        $response = Gate::inspect('update', $setting);

        if (!$response->allowed()) {
            session()->flash('error', $response->message());
            return back();
        }

        $setting->update([
            'income' => $request->input('income'),
            'savings' => $request->input('savings'),
        ]);

        session()->flash('success', 'The settings has been update');
        return back();
    }
}
