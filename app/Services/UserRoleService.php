<?php

namespace App\Services;

use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserRoleService
{
    public function index(User $user)
    {
        return $user->roles()->get();
    }

    public function makeSaller(User $user)
    {
        try {
            $this->checkRole($user, 2);

            RoleUser::create([
                'user_id' => $user->id,
                'role_id' => 2
            ]);
        } catch (\Exception $e) {
            throw new HttpException($e->getCode(), $e->getMessage());
        }
    }
    public function removeSeller(User $user)
    {
        try {
            $this->checkNotRole($user, 2);

            RoleUser::where('user_id', $user->id)->where('role_id', 2)->delete();
        } catch (\Exception $e) {
            throw new HttpException($e->getCode(), $e->getMessage());
        }
    }

    public function makeManager(User $user)
    {
        try {
            $this->checkRole($user, 3);

            RoleUser::create([
                'user_id' => $user->id,
                'role_id' => 3
            ]);
        } catch (\Exception $e) {
            throw new HttpException($e->getCode(), $e->getMessage());
        }
    }

    public function removeManager(User $user)
    {
        try {
            $this->checkNotRole($user, 3);

            RoleUser::where('user_id', $user->id)->where('role_id', 3)->delete();
        } catch (\Exception $e) {
            throw new HttpException($e->getCode(), $e->getMessage());
        }
    }

    public function makeAdmin(User $user)
    {
        try {
            $this->checkRole($user, 4);

            RoleUser::create([
                'user_id' => $user->id,
                'role_id' => 4
            ]);
        } catch (\Exception $e) {
            throw new HttpException($e->getCode(), $e->getMessage());
        }
    }

    public function removeAdmin(User $user)
    {
        try {
            $this->checkNotRole($user, 4);

            RoleUser::where('user_id', $user->id)->where('role_id', 4)->delete();
        } catch (\Exception $e) {
            throw new HttpException($e->getCode(), $e->getMessage());
        }
    }

    public function destroy(User $user)
    {
        try {
            $authUser = User::find(Auth::id());
            $authUserMaxRole = $authUser->roles()->max('role_id');

            $userMaxRole = $user->roles()->max('role_id');

            if ($authUserMaxRole <= $userMaxRole) {
                throw new HttpException(Response::HTTP_FORBIDDEN, 'You do not have enough permissions to perform this action');
            }

            $user->roles()->delete();
            RoleUser::create([
                'user_id' => $user->id,
                'role_id' => 1
            ]);
        } catch (\Exception $e) {
            throw new HttpException($e->getCode(), $e->getMessage());
        }
    }

    private function checkRole(User $user, $role_id)
    {
        if ($user->roles()->where('role_id', $role_id)->first()) {
            throw new \Exception('This user already have this role', Response::HTTP_FOUND);
        }
    }

    private function checkNotRole(User $user, $role_id)
    {
        if (!$user->roles()->where('role_id', $role_id)->first()) {
            throw new \Exception("This user doesn't have this role", Response::HTTP_FOUND);
        }
    }
}
