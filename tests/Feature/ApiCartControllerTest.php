<?php

namespace Tests\Feature;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApiCartControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;
    protected $product;


    // Используйте setup метод для инициализации переменных, которые будут использоваться в тестах
    public function setUp(): void
    {
        parent::setUp();

        Category::factory()->create();
        $this->product = Product::factory()->create();

        $this->user = User::factory()->create();
        $this->actingAs($this->user, 'api');
    }

    public function test_index()
    {
        $response = $this->getJson(route('cart.index'));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'user_id', 'product_id', 'quantity', 'created_at', 'updated_at']
                ]
            ]);
    }

    public function test_store()
    {
        $product = Product::factory()->create();
        $response = $this->postJson(route('cart.store', ['product' => $product->id]));

        $response->assertStatus(200);
    }

    public function test_increase()
    {
        $this->storeProduct();

        $response = $this->patchJson(route('cart.increase', ['product' => $this->product->id]));

        $response->assertStatus(200);
    }

    public function test_decrease()
    {
        $this->increasedProduct();

        $response = $this->patchJson(route('cart.decrease', ['product' => $this->product->id]));

        $response->assertStatus(200);
    }

    public function test_update()
    {
        $this->storeProduct();

        $data = ['quantity' => fake()->numberBetween(1, 99)];

        $response = $this->patchJson(route('cart.update', ['product' => $this->product->id]), $data);

        $response->assertStatus(200);
    }

    public function test_destroy()
    {
        $this->storeProduct();

        $response = $this->deleteJson(route('cart.destroy', ['product' => $this->product->id]));

        $response->assertStatus(200);
    }

    private function storeProduct()
    {
        $this->postJson(route('cart.store', ['product' => $this->product->id]));
    }

    private function increasedProduct()
    {
        // $this->postJson(route('cart.store', ['product' => $product->id]));
        Cart::updateOrCreate(
            [
                'user_id' => $this->user->id,
                'product_id' => $this->product->id
            ],
            ['quantity' => 2]
        );
    }
}
