<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderStatusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'status' => 'required|string|in:pending,processing,shipped,delivered,cancelled',
        ];
    }

    public function messages()
    {
        return [
            'status.required'   => 'Статус заказа является обязательным.',
            'status.string'     => 'Статус заказа должен быть в виде строки.',
            'status.in'         => 'Некорректный статус заказа.',
        ];
    }
}
