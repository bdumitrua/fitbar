<?php

namespace App\Services;

use App\Http\Requests\AddressRequest;
use App\Models\Address;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AddressService
{
    public function index()
    {
        $user = User::find(Auth::id());

        return $user->addresses;
    }

    // Создание нового адреса
    public function create(AddressRequest $request)
    {
        Address::create([
            'address' => $request->address,
            'user_id' => Auth::id(),
        ]);
    }

    // Обновление существующего адреса
    public function update(AddressRequest $request, Address $address)
    {
        $user = User::findOrFail(Auth::id());
        $addressUpdateStatus = $user->addresses()->where('id', $address->id)->update([
            'address' => $request->address
        ]);

        if (!$addressUpdateStatus) {
            throw new HttpException(Response::HTTP_NOT_FOUND, 'Address not found');
        }
    }

    // Удаление адреса
    public function delete(Address $address)
    {
        $user = User::find(Auth::id());
        $addressDeleteStatus = $user->addresses()->where('id', $address->id)->delete();

        if (!$addressDeleteStatus) {
            throw new HttpException(Response::HTTP_NOT_FOUND, 'Address not found');
        }
    }
}
