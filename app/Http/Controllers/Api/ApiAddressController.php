<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddressRequest;
use App\Models\Address;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiAddressController extends Controller
{
    public function index()
    {
        $user = User::find(Auth::id());
        return response()->json($user->addresses);
    }

    // Создание нового адреса
    public function create(AddressRequest $request)
    {
        $address = Address::create([
            'address' => $request->address,
            'user_id' => Auth::id(),
        ]);

        return response()->json([
            'status' => 'success',
            'address' => $address
        ]);
    }

    // Обновление существующего адреса
    public function update(AddressRequest $request, Address $address)
    {
        $user = User::find(Auth::id());
        $address = $user->addresses()->where('id', $address->id)->update([
            'address' => $request->address
        ]);

        if (!$address) {
            return response()->json([
                'message' => 'access denied'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Address updated'
        ], 200);
    }

    // Удаление адреса
    public function delete(Address $address)
    {
        $user = User::find(Auth::id());
        $address = $user->addresses()->where('id', $address->id)->delete();

        if (!$address) {
            return response()->json([
                'message' => 'access denied'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Address deleted'
        ]);
    }
}
