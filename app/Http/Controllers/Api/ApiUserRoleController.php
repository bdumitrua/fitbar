<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\UserRoleService;

class ApiUserRoleController extends Controller
{
    private $userRoleService;

    public function __construct(UserRoleService $userRoleService)
    {
        $this->userRoleService = $userRoleService;
    }

    public function index(User $user)
    {
        return $this->handleServiceCall(function () use ($user) {
            return $this->userRoleService->index($user);
        });
    }

    public function makeSaller(User $user)
    {
        return $this->handleServiceCall(function () use ($user) {
            return $this->userRoleService->makeSaller($user);
        });
    }
    public function removeSeller(User $user)
    {
        return $this->handleServiceCall(function () use ($user) {
            return $this->userRoleService->removeSeller($user);
        });
    }

    public function makeManager(User $user)
    {
        return $this->handleServiceCall(function () use ($user) {
            return $this->userRoleService->makeManager($user);
        });
    }

    public function removeManager(User $user)
    {
        return $this->handleServiceCall(function () use ($user) {
            return $this->userRoleService->removeManager($user);
        });
    }

    public function makeAdmin(User $user)
    {
        return $this->handleServiceCall(function () use ($user) {
            return $this->userRoleService->makeAdmin($user);
        });
    }

    public function removeAdmin(User $user)
    {
        return $this->handleServiceCall(function () use ($user) {
            return $this->userRoleService->removeAdmin($user);
        });
    }

    public function destroy(User $user)
    {
        return $this->handleServiceCall(function () use ($user) {
            return $this->userRoleService->destroy($user);
        });
    }
}
