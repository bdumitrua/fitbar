<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddressRequest extends FormRequest
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
            'address' => 'required|string|max:255|unique:addresses'
        ];
    }

    public function messages()
    {
        return [
            'address.required' => 'Адрес является обязательным полем.',
            'address.string'   => 'Адрес должен быть строкой.',
            'address.max'      => 'Длина адреса не должна превышать 255 символов.',
            'address.unique'   => 'Данный адрес был добавлен ранее',
        ];
    }
}
