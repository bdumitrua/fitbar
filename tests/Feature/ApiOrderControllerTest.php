<?php

namespace Tests\Feature;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApiOrderControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->actingAs($this->user, 'api');
    }

    public function test_can_get_all_user_orders()
    {

        $response = $this->getJson(route('orders.index'));

        $response->assertStatus(200);
    }

    public function test_can_get_specific_order()
    {
        $order = Order::factory()->create(['user_id' => $this->user->id]);

        $response = $this->getJson(route('orders.show', $order));

        $response->assertStatus(200);
    }

    public function test_can_not_get_order_of_another_user()
    {
        $anotherUser = User::factory()->create();
        $order = Order::factory()->create(['user_id' => $anotherUser->id]);

        $response = $this->getJson(route('orders.show', $order));

        $response->assertStatus(403);
    }

    public function test_can_create_order()
    {
        Category::factory()->create();
        $product = Product::factory()->create();

        Cart::create([
            'user_id' => $this->user->id,
            'product_id' => $product->id,
            'quantity' => 1
        ]);

        $response = $this->postJson(route('orders.create'));

        $response->assertStatus(200);
    }

    public function test_can_not_create_order_with_empty_cart()
    {
        $response = $this->postJson(route('orders.create'));

        $response->assertStatus(409);
    }
}
