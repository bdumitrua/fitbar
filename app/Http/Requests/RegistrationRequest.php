<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegistrationRequest extends AuthRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users'
        ]);
    }

    public function messages()
    {
        return array_merge(parent::messages(), [
            'name.required' => 'Имя является обязательным полем.',
            'name.string'   => 'Имя должно быть строкой.',
            'name.max'      => 'Имя может быть не длиннее 255 символов.',
            'email.required'    => 'Почта является обязательным полем.',
            // 'email.string'   => 'Почта должен быть строкой.',
            'email.email'   => 'Введена некорректная почта.',
            'email.max'     => 'Длина почты может быть не более 255 символов.',
            'email.unique'  => 'Данная почта уже занята.'
        ]);
    }
}
