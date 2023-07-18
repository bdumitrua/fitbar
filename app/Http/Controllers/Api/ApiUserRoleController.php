<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\UserRoleController;
use App\Models\User;

class ApiUserRoleController extends UserRoleController
{
    public function index(User $user)
    {
        $response = parent::index($user);

        return parent::MainResponseToJSON($response);
    }

    public function makeSaller(User $user)
    {
        $response = parent::makeSaller($user);

        return parent::MainResponseToJSON($response);
    }
    public function removeSeller(User $user)
    {
        $response = parent::removeSeller($user);

        return parent::MainResponseToJSON($response);
    }

    public function makeManager(User $user)
    {
        $response = parent::makeManager($user);

        return parent::MainResponseToJSON($response);
    }

    public function removeManager(User $user)
    {
        $response = parent::removeManager($user);

        return parent::MainResponseToJSON($response);
    }

    public function makeAdmin(User $user)
    {
        $response = parent::makeAdmin($user);

        return parent::MainResponseToJSON($response);
    }

    public function removeAdmin(User $user)
    {
        $response = parent::removeAdmin($user);

        return parent::MainResponseToJSON($response);
    }

    public function destroy(User $user)
    {
        $response = parent::destroy($user);

        return parent::MainResponseToJSON($response);
    }
}
