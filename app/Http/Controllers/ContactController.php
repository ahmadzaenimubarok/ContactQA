<?php
namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function show()
    {
        return view('contact');
    }

    public function submit(ContactRequest $request)
    {
        // Simulasi penyimpanan atau pengiriman email
        return back()->with('success', 'Your message has been sent successfully.');
    }
}