<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
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
            'rating' => 'required|integer|min:1|max:5',
            'recommendation' => 'required|string|in:Не рекомендую,Рекомендую',
            'pros' => 'nullable|string|max:250',
            'cons' => 'nullable|string|max:250',
            'comment' => 'nullable|string|max:1000',
        ];
    }

    public function messages()
    {
        return [
            'rating.required' => 'Рейтинг является обязательным полем.',
            'rating.integer'  => 'Рейтинг должен быть целым числом.',
            'rating.min'      => 'Минимальное значение рейтинга - 1.',
            'rating.max'      => 'Максимальное значение рейтинга - 5.',

            'recommendation.required' => 'Поле рекомендации является обязательным.',
            'recommendation.in'       => 'Рекомендация должна быть либо "Не рекомендую", либо "Рекомендую".',

            'pros.string'   => 'Поле "плюсы" должно быть строкой.',
            'pros.max'      => 'Максимальная длина поля "плюсы" - 250 символов.',

            'cons.string'   => 'Поле "минусы" должно быть строкой.',
            'cons.max'      => 'Максимальная длина поля "минусы" - 250 символов.',

            'comment.string'   => 'Комментарий должен быть строкой.',
            'comment.max'      => 'Максимальная длина комментария - 1000 символов.',
        ];
    }
}
