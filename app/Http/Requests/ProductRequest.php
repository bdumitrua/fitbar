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
        // Добавить проверку вкуса, веса
        return [
            'image' => 'required|image|max:2048',
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:1|max:1000',
            'short_description' => 'required|string|min:10|max:255',
            'long_description' => 'required|string|min:150',
            'category_id' => 'required|integer|min:1|exists:categories,id'
        ];
    }

    public function messages()
    {
        return [
            'image.required' => 'Поле изображения является обязательным.',
            'image.url'      => 'URL изображения должен быть валидным URL-адресом.',
            'image.max'      => 'URL изображения не должен превышать 2048 символов.',

            'name.required' => 'Название продукта является обязательным полем.',
            'name.string'   => 'Название продукта должно быть строкой.',
            'name.max'      => 'Длина названия продукта не должна превышать 255 символов.',
            'name.unique'   => 'Продукт с таким названием уже существует.',

            'price.required' => 'Цена продукта является обязательной.',
            'price.numeric'  => 'Цена продукта должна быть числом.',
            'price.min'      => 'Цена продукта должна быть не меньше 1.',
            'price.max'      => 'Цена продукта должна быть не больше 1000.',

            'short_description.required' => 'Краткое описание является обязательным полем.',
            'short_description.string'   => 'Краткое описание должно быть строкой.',
            'short_description.min'      => 'Краткое описание должно содержать не менее 10 символов.',
            'short_description.max'      => 'Краткое описание не должно превышать 255 символов.',

            'long_description.required' => 'Подробное описание является обязательным полем.',
            'long_description.string'   => 'Подробное описание должно быть строкой.',
            'long_description.min'      => 'Подробное описание должно содержать не менее 150 символов.',

            'category_id.required' => 'Идентификатор категории является обязательным.',
            'category_id.integer'  => 'Идентификатор категории должен быть целым числом.',
            'category_id.min'      => 'Идентификатор категории должен быть не меньше 1.',
            'category_id.exists'   => 'Категория с таким идентификатором не существует.',
        ];
    }
}
