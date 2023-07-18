<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
class RoleFactory extends Factory
{
    protected static $orderIndex = 0;

    protected static $roleNames = [
        'USER',
        'SELLER',
        'MANAGER',
        'ADMIN',
        'HEAD_ADMIN'
    ];

    public function definition(): array
    {
        if (self::$orderIndex >= count(self::$roleNames)) {
            self::$orderIndex = 0;
        }

        return [
            'name' => self::$roleNames[self::$orderIndex++],
            'id' => self::$orderIndex
        ];
    }
}
