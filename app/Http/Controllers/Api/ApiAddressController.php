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
        $response = parent::index();

        return parent::MainResponseToJSON($response);
    }

    // Создание нового адреса
    public function create(AddressRequest $request)
    {
        $response = parent::create($request);

        return parent::MainResponseToJSON($response);
    }

    // Обновление существующего адреса
    public function update(AddressRequest $request, Address $address)
    {
        $response = parent::update($request, $address);

        return parent::MainResponseToJSON($response);
    }

    // Удаление адреса
    public function delete(Address $address)
    {
        $response = parent::delete($address);

        return parent::MainResponseToJSON($response);
    }
}
