<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CartRequest extends FormRequest
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
            'product_id' => 'required|integer|exists:products,id'
        ];
    }

    public function messages()
    {
        return [
            'product_id.required' => 'Поле идентификатора продукта является обязательным.',
            'product_id.integer'  => 'Идентификатор продукта должен быть целым числом.',
            'product_id.exists'   => 'Продукт с таким идентификатором не существует.',
        ];
    }
}
