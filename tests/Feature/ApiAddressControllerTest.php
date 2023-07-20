<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApiAddressControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;
    protected $address;

    // Используйте setup метод для инициализации переменных, которые будут использоваться в тестах
    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->address = Address::factory()->create(['user_id' => $this->user->id]);

        $this->actingAs($this->user, 'api');
    }

    // Тест для получения адресов
    public function test_index()
    {
        $response = $this->getJson(route('address.index'));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'address', 'user_id']
                ]
            ]);
    }

    // Тест для создания нового адреса
    public function test_create()
    {
        $addressData = [
            'address' => $this->faker->address,
        ];

        $response = $this->postJson(route('address.create'), $addressData);

        $response->assertStatus(200);
    }

    // Тест для обновления адреса
    public function test_update()
    {
        $addressData = [
            'address' => $this->faker->address,
        ];

        $response = $this->putJson(route('address.update', ['address' => $this->address->id]), $addressData);

        $response->assertStatus(200);
    }

    // Тест для удаления адреса
    public function test_delete()
    {
        $response = $this->deleteJson(route('address.delete', ['address' => $this->address->id]));

        $response->assertStatus(200);
    }
}
