<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
