<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
