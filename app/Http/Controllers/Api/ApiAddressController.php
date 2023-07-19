<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\AddressController;
use App\Http\Controllers\Controller;
use App\Http\Requests\AddressRequest;
use App\Models\Address;
use App\Models\User;
use App\Services\AddressService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiAddressController extends Controller
{
    private $addressService;

    public function __construct(AddressService $addressService)
    {
        $this->addressService = $addressService;
    }


    public function index()
    {
        $response = $this->addressService->index();

        return parent::MainResponseToJSON($response);
    }

    // Создание нового адреса
    public function create(AddressRequest $request)
    {
        $response = $this->addressService->create($request);

        return parent::MainResponseToJSON($response);
    }

    // Обновление существующего адреса
    public function update(AddressRequest $request, Address $address)
    {
        $response = $this->addressService->update($request, $address);

        if (!$response) {
            return parent::MainResponseToJSON([
                'error' => 'access denied',
                'code' => 401
            ]);
        }

        return parent::MainResponseToJSON([
            'message' => "Address updated",
            'code' => 200
        ]);
    }

    // Удаление адреса
    public function delete(Address $address)
    {
        $response = $this->addressService->delete($address);

        if (!$response) {
            return parent::MainResponseToJSON([
                'error' => 'access denied',
                'code' => 401
            ]);
        }

        return parent::MainResponseToJSON([
            'message' => "Address deleted",
            'code' => 200
        ]);
    }
}
