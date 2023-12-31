<?php

namespace App\Http\Requests;

class LoginRequest extends AuthRequest
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
        return array_merge(parent::rules(), [
            'email' => 'required|string|email|max:255',
        ]);
    }

    public function messages()
    {
        return array_merge(parent::messages(), [
            'email.required' => 'Почта является обязательным полем.',
            // 'email.string'   => 'Почта должен быть строкой.',
            'email.email'    => 'Введена некорректная почта.',
            'email.max'    => 'Длина почты может быть не более 255 символов.',
        ]);
    }
}
