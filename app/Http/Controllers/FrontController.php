<?php

namespace App\Http\Controllers;

/**
 * Class FrontController
 *
 * @package App\Http\Controllers
 */
class FrontController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        if (!auth()->check()) {
            if (systemsettings('system_guest_access')) {
                return redirect()->route('guest.links.index');
            }

            return view('welcome');
        }

        return redirect()->route('dashboard');
    }
}
