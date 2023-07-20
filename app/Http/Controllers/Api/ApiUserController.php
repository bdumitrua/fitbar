<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UserController;
use App\Http\Requests\UserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ApiUserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function me()
    {
        return $this->handleServiceCall(function () {
            return $this->userService->me();
        });
    }

    public function update(UserRequest $request)
    {
        return $this->handleServiceCall(function () use ($request) {
            return $this->userService->update($request);
        });
    }
}
