<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'email' => 'required|string|email|max:255',
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'photo' => 'nullable|image|max:2048',
        ];
    }

    // TODO 
    // Дописать сообщения
    public function messages()
    {
        return [
            'email.required' => 'Почта является обязательным полем.',
            // 'email.string'   => 'Почта должен быть строкой.',
            'email.email'    => 'Введена некорректная почта.',
            'email.max'    => 'Длина почты может быть не более 255 символов.',
        ];
    }
}
