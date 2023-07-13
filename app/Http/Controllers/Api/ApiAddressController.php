<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddressRequest;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiAddressController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
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
    public function update(AddressRequest $request, $id)
    {
        $address = Address::where('user_id', Auth::id())
            ->where('id', $id)
            ->first();

        if (!$address) {
            return response()->json([
                'status' => 'error',
                'message' => 'Address not found'
            ], 404);
        }

        $address->update([
            'address' => $request->address
        ]);

        return response()->json([
            'status' => 'success',
            'address' => $address
        ]);
    }

    // Удаление адреса
    public function delete($id)
    {
        $address = Address::where('user_id', Auth::id())
            ->where('id', $id)
            ->first();

        if (!$address) {
            return response()->json([
                'status' => 'error',
                'message' => 'Address not found'
            ], 404);
        }

        $address->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Address deleted'
        ]);
    }
}
