<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected function MainResponseToJSON($response)
    {
        if (isset($response['error'])) {
            return response()->json(['error' => $response['error']], $response['code']);
        }

        return response()->json(['message' => $response['message']], $response['code']);
    }
}
