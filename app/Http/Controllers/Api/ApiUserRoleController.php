<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiUserRoleController extends Controller
{
    public function index($user_id)
    {
        $user = User::find($user_id);
        return response()->json($user->roles()->get());
    }
    public function makeSaller($user_id)
    {
        try {
            $user = $this->getUser($user_id);

            $this->checkRole($user, 2);

            RoleUser::create([
                'user_id' => $user_id,
                'role_id' => 2
            ]);

            return response()->json([
                'message' => 'Make user ' . $user_id . ' SELLER succesfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getCode());
        }
    }
    public function removeSeller($user_id)
    {
        try {
            $user = $this->getUser($user_id);
            $this->checkNotRole($user, 2);

            RoleUser::where('user_id', $user_id)->where('role_id', 2)->delete();

            return response()->json([
                'message' => 'Remove user ' . $user_id . ' SELLER role succesfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getCode());
        }
    }

    public function makeManager($user_id)
    {
        try {
            $user = $this->getUser($user_id);
            $this->checkRole($user, 3);

            RoleUser::create([
                'user_id' => $user_id,
                'role_id' => 3
            ]);

            return response()->json([
                'message' => 'Make user ' . $user_id . ' MANAGER succesfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getCode());
        }
    }

    public function removeManager($user_id)
    {
        try {
            $user = $this->getUser($user_id);
            $this->checkNotRole($user, 3);

            RoleUser::where('user_id', $user_id)->where('role_id', 3)->delete();

            return response()->json([
                'message' => 'Remove user ' . $user_id . ' MANAGER role succesfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getCode());
        }
    }

    public function makeAdmin($user_id)
    {
        try {
            $user = $this->getUser($user_id);
            $this->checkRole($user, 4);

            RoleUser::create([
                'user_id' => $user_id,
                'role_id' => 4
            ]);

            return response()->json([
                'message' => 'Make user ' . $user_id . ' ADMIN succesfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getCode());
        }
    }

    public function removeAdmin($user_id)
    {
        try {
            $user = $this->getUser($user_id);
            $this->checkNotRole($user, 4);

            RoleUser::where('user_id', $user_id)->where('role_id', 4)->delete();

            return response()->json([
                'message' => 'Remove user ' . $user_id . ' ADMIN role succesfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getCode());
        }
    }

    public function destroy($user_id)
    {
        try {
            $user = $this->getUser($user_id);
            $authUser = User::find(Auth::id());

            $authUserMaxRole = $authUser->roles()->max('role_id');
            $userMaxRole = $user->roles()->max('role_id');

            if ($authUserMaxRole <= $userMaxRole) {
                return response()->json([
                    'message' => 'You do not have enough permissions to perform this action'
                ], 403);
            }

            $user->roles()->delete();
            RoleUser::create([
                'user_id' => $user->id,
                'role_id' => 1
            ]);

            return response()->json([
                'message' => 'All roles removed for user ' . $user_id . ', set to USER'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getCode());
        }
    }


    private function getUser($user_id)
    {
        $user = User::find($user_id);

        if (!$user) {
            throw new \Exception('User with id: ' . $user_id . ' not found', 404);
        }

        return $user;
    }

    private function checkRole($user, $role_id)
    {
        if ($user->roles()->where('role_id', $role_id)->first()) {
            throw new \Exception('This user already have this role', 300);
        }
    }

    private function checkNotRole($user, $role_id)
    {
        if (!$user->roles()->where('role_id', $role_id)->first()) {
            throw new \Exception('This user doesn\'t have this role', 300);
        }
    }
}
