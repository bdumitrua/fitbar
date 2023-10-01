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
            'birth' => 'nullable|date|before_or_equal:today',
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Электронная почта является обязательным полем.',
            'email.string'   => 'Электронная почта должна быть строкой.',
            'email.email'    => 'Введите действительный адрес электронной почты.',
            'email.max'      => 'Длина адреса электронной почты не должна превышать 255 символов.',

            'name.required' => 'Имя является обязательным полем.',
            'name.string'   => 'Имя должно быть строкой.',
            'name.max'      => 'Длина имени не должна превышать 255 символов.',

            'phone.string' => 'Телефонный номер должен быть строкой.',
            'phone.max'    => 'Длина телефонного номера не должна превышать 20 символов.',

            'photo.image' => 'Фотография должна быть изображением.',
            'photo.max'   => 'Размер изображения не должен превышать 2048 килобайт.',
        ];
    }
}
