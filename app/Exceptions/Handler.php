<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];


    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->renderable(function (NotFoundHttpException $e) {
            $responseCode = Response::HTTP_NOT_FOUND;
            $message = $e->getMessage();

            if (strpos($message, 'Product')) {
                return response()->json(['error' => 'Product not found'], $responseCode);
            }
            if (strpos($message, 'Address')) {
                return response()->json(['error' => 'Address not found'], $responseCode);
            }
            if (strpos($message, 'Category')) {
                return response()->json(['error' => 'Category not found'], $responseCode);
            }
            if (strpos($message, 'Order')) {
                return response()->json(['error' => 'Order not found'], $responseCode);
            }
            if (strpos($message, 'Review')) {
                return response()->json(['error' => 'Review not found'], $responseCode);
            }
            if (strpos($message, 'User')) {
                return response()->json(['error' => 'User not found'], $responseCode);
            }

            return response()->json(['error' => $message], $responseCode);
        });
    }

    /**
     * Convert a validation exception into a JSON response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Validation\ValidationException  $exception
     * @return \Illuminate\Http\JsonResponse
     */
    protected function invalidJson($request, ValidationException $exception): JsonResponse
    {
        return response()->json([
            'errors' => $exception->errors(),
        ], $exception->status);
    }
}
