<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\AddressController;
use App\Http\Requests\AddressRequest;
use App\Models\Address;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiAddressController extends AddressController
{
    public function index()
    {
        $addresses = parent::index();
        return response()->json($addresses);
    }

    // Создание нового адреса
    public function create(AddressRequest $request)
    {
        $address = parent::create($request);

        return response()->json([
            'status' => 'success',
            'address' => $address
        ]);
    }

    // Обновление существующего адреса
    public function update(AddressRequest $request, Address $address)
    {
        $addressUpdateStatus = parent::update($request, $address);

        if (!$addressUpdateStatus) {
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
        $addressDeleteStatus = parent::delete($address);

        if (!$addressDeleteStatus) {
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
