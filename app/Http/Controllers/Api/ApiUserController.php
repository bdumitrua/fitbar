<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UserController;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ApiUserController extends UserController
{
    public function me()
    {
        $response = parent::me();

        return parent::MainResponseToJSON($response);
    }

    public function update(UserRequest $request)
    {
        $response = parent::update($request);

        return parent::MainResponseToJSON($response);
    }
}
