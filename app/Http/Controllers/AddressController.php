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
        return $user->addresses;
    }

    // Создание нового адреса
    public function create(AddressRequest $request)
    {
        $address = Address::create([
            'address' => $request->address,
            'user_id' => Auth::id(),
        ]);

        return $address;
    }

    // Обновление существующего адреса
    public function update(AddressRequest $request, Address $address)
    {
        $user = User::findOrFail(Auth::id());
        $addressUpdateStatus = $user->addresses()->where('id', $address->id)->update([
            'address' => $request->address
        ]);

        return $addressUpdateStatus;
    }

    // Удаление адреса
    public function delete(Address $address)
    {
        $user = User::find(Auth::id());
        $addressDeleteStatus = $user->addresses()->where('id', $address->id)->delete();

        return $addressDeleteStatus;
    }
}
