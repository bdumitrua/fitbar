<?php

namespace App\Http\Requests;

use App\Rules\ImageOrUrl;
use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
        // TODO
        // Добавить сообщения
        return [
            'image' => 'required|url|max:2048',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:1|max:1000',
            'short_description' => 'required|string|min:10|max:255',
            'long_description' => 'required|string|min:150',
            'category_id' => 'required|integer|min:1|exists:categories,id'
        ];
    }
}