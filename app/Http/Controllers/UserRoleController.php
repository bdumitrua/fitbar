<?php

namespace App\Http\Controllers;

use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserRoleController extends Controller
{
    public function index(User $user)
    {
        return [
            'message' => $user->roles()->get(),
            'code' => 200
        ];
    }

    public function makeSaller(User $user)
    {
        try {
            $this->checkRole($user, 2);

            RoleUser::create([
                'user_id' => $user->id,
                'role_id' => 2
            ]);

            return [
                'message' => 'Make user ' . $user->id . ' SELLER succesfully',
                'code' => 200
            ];
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ];
        }
    }
    public function removeSeller(User $user)
    {
        try {
            $this->checkNotRole($user, 2);

            RoleUser::where('user_id', $user->id)->where('role_id', 2)->delete();

            return [
                'message' => 'Remove user ' . $user->id . ' SELLER role succesfully',
                'code' => 200
            ];
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ];
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

            return [
                'message' => 'Make user ' . $user->id . ' MANAGER succesfully',
                'code' => 200
            ];
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ];
        }
    }

    public function removeManager(User $user)
    {
        try {
            $this->checkNotRole($user, 3);

            RoleUser::where('user_id', $user->id)->where('role_id', 3)->delete();

            return [
                'message' => 'Remove user ' . $user->id . ' MANAGER role succesfully',
                'code' => 200
            ];
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ];
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

            return [
                'message' => 'Make user ' . $user->id . ' ADMIN succesfully',
                'code' => 200
            ];
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ];
        }
    }

    public function removeAdmin(User $user)
    {
        try {
            $this->checkNotRole($user, 4);

            RoleUser::where('user_id', $user->id)->where('role_id', 4)->delete();

            return [
                'message' => 'Remove user ' . $user->id . ' ADMIN role succesfully',
                'code' => 200
            ];
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ];
        }
    }

    public function destroy(User $user)
    {
        try {
            $authUser = User::find(Auth::id());
            $authUserMaxRole = $authUser->roles()->max('role_id');

            $userMaxRole = $user->roles()->max('role_id');

            if ($authUserMaxRole <= $userMaxRole) {
                return [
                    'error' => 'You do not have enough permissions to perform this action',
                    'code' => 403
                ];
            }

            $user->roles()->delete();
            RoleUser::create([
                'user_id' => $user->id,
                'role_id' => 1
            ]);

            return [
                'message' => 'All roles removed for user ' . $user->id . ', set to USER',
                'code' => 200
            ];
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ];
        }
    }

    private function checkRole(User $user, $role_id)
    {
        if ($user->roles()->where('role_id', $role_id)->first()) {
            throw new \Exception('This user already have this role', 300);
        }
    }

    private function checkNotRole(User $user, $role_id)
    {
        if (!$user->roles()->where('role_id', $role_id)->first()) {
            throw new \Exception('This user doesn\'t have this role', 300);
        }
    }
}
