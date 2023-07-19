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
        return $this->handleServiceCall(function () {
            return $this->addressService->index();
        });
    }

    // Создание нового адреса
    public function create(AddressRequest $request)
    {
        return $this->handleServiceCall(function () use ($request) {
            return $this->addressService->create($request);
        });
    }

    // Обновление существующего адреса
    public function update(AddressRequest $request, Address $address)
    {
        return $this->handleServiceCall(function () use ($request, $address) {
            return $this->addressService->update($request, $address);
        });
    }

    // Удаление адреса
    public function delete(Address $address)
    {
        return $this->handleServiceCall(function () use ($address) {
            return $this->addressService->delete($address);
        });
    }
}
