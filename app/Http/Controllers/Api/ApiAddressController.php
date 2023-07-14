<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddressRequest;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiAddressController extends Controller
{
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
        $address->update([
            'address' => $request->address
        ]);

        return response()->json([
            'status' => 'success',
            'address' => $address
        ]);
    }

    // Удаление адреса
    public function delete(Address $address)
    {
        $address->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Address deleted'
        ]);
    }
}
