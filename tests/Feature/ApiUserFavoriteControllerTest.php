<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use App\Models\UserFavorite;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;

class ApiUserFavoriteControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $product;
    protected $category;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->category = Category::factory()->create();
        $this->product = Product::factory()->create();
    }

    public function test_can_get_user_favorites()
    {
        $this->actingAs($this->user, 'api');

        UserFavorite::create([
            'user_id' => $this->user->id,
            'product_id' => $this->product->id
        ]);

        $response = $this->getJson(route('favorites.index'));

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'product_id' => $this->product->id,
        ]);
    }

    public function test_can_add_to_favorites()
    {
        $this->actingAs($this->user, 'api');

        $response = $this->postJson(route('favorites.store', ['product' => $this->product->id]));

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'message' => 'Product added to favorites',
        ]);

        $this->assertDatabaseHas('user_favorites', [
            'user_id' => $this->user->id,
            'product_id' => $this->product->id,
        ]);
    }

    public function test_cannot_add_same_product_to_favorites()
    {
        $this->actingAs($this->user, 'api');

        UserFavorite::create([
            'user_id' => $this->user->id,
            'product_id' => $this->product->id
        ]);

        $response = $this->postJson(route('favorites.store', ['product' => $this->product->id]));

        $response->assertStatus(405);
    }

    public function test_can_remove_from_favorites()
    {
        $this->actingAs($this->user, 'api');

        UserFavorite::create([
            'user_id' => $this->user->id,
            'product_id' => $this->product->id
        ]);

        $response = $this->deleteJson(route('favorites.remove', ['product' => $this->product->id]));

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'message' => 'Product removed from favorites',
        ]);

        $this->assertDatabaseMissing('user_favorites', [
            'user_id' => $this->user->id,
            'product_id' => $this->product->id,
        ]);
    }

    public function test_cannot_remove_product_not_in_favorites()
    {
        $this->actingAs($this->user, 'api');

        $response = $this->deleteJson(route('favorites.remove', ['product' => $this->product->id]));

        $response->assertStatus(405);
    }
}
