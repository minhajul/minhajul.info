<?php

namespace App\Http\Controllers;

class AdminController extends Controller
{
    public function index()
    {
        return view('admin.home');
    }

    public function profile()
    {
        return view('admin.profile.index');
    }
}
