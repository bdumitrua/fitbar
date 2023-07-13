<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
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
            'password' => 'required|string|min:8',
        ];
    }

    public function messages()
    {
        return [
            'password.required' => 'Пароль является обязательным полем',
            'password.min' => 'Длина пароля должна быть 8 и более символов',
        ];
    }
}
