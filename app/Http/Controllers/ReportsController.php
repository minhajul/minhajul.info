<?php

namespace App\Http\Controllers;

class ReportsController extends Controller
{
    public function index()
    {
        return view('admin.report.index');
    }
}
