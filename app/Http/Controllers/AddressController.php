<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddressRequest;
use App\Models\Address;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    public function index()
    {
        $user = User::find(Auth::id());

        return [
            'message' => $user->addresses,
            'code' => 200
        ];
    }

    // Создание нового адреса
    public function create(AddressRequest $request)
    {
        Address::create([
            'address' => $request->address,
            'user_id' => Auth::id(),
        ]);

        return [
            'message' => 'Address created successfully',
            'code' => 200
        ];
    }

    // Обновление существующего адреса
    public function update(AddressRequest $request, Address $address)
    {
        $user = User::findOrFail(Auth::id());
        $addressUpdateStatus = $user->addresses()->where('id', $address->id)->update([
            'address' => $request->address
        ]);

        if (!$addressUpdateStatus) {
            return [
                'message' => 'access denied',
                'code' => 401
            ];
        }

        return [
            'message' => "Address updated",
            'code' => 200
        ];
    }

    // Удаление адреса
    public function delete(Address $address)
    {
        $user = User::find(Auth::id());
        $addressDeleteStatus = $user->addresses()->where('id', $address->id)->delete();

        if (!$addressDeleteStatus) {
            return [
                'error' => "Access denied",
                'code' => 401
            ];
        }

        return [
            'message' => "Address deleted",
            'code' => 200
        ];
    }
}
