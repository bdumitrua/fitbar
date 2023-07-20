<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApiReviewControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;
    protected $product;
    protected $category;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->category = Category::factory()->create();
        $this->product = Product::factory()->create();
    }

    public function test_can_get_all_reviews()
    {
        Product::factory()->count(3)->create()->each(function ($product) {
            Review::factory()->create([
                'user_id' => $this->user->id,
                'product_id' => $product->id,
            ]);
        });

        $response = $this->getJson(route('reviews.index'));

        $response->assertStatus(200);
    }

    public function test_can_get_product_reviews()
    {
        Product::factory()->count(3)->create()->each(function ($product) {
            Review::factory()->create([
                'user_id' => $this->user->id,
                'product_id' => $product->id,
            ]);
        });
        $response = $this->getJson(route('reviews.product', $this->product));

        $response->assertStatus(200);
    }

    public function test_can_get_product_average_rating()
    {
        Product::factory()->count(3)->create()->each(function ($product) {
            Review::factory()->create([
                'user_id' => $this->user->id,
                'product_id' => $product->id,
            ]);
        });

        $response = $this->getJson(route('reviews.productavg', $this->product));

        $response->assertStatus(200);
    }

    public function test_can_get_category_reviews()
    {
        $this->product->update([
            'category_id' => $this->category->id
        ]);

        Review::factory()->create(['user_id' => $this->user->id, 'product_id' => $this->product->id]);

        $response = $this->getJson(route('reviews.category', $this->category));

        $response->assertStatus(200);
    }

    public function test_can_get_own_reviews()
    {
        $this->actingAs($this->user, 'api');

        Review::factory()->create(['user_id' => $this->user->id, 'product_id' => $this->product->id]);

        $response = $this->getJson(route('reviews.me'));

        $response->assertStatus(200);
    }

    public function test_can_create_review()
    {
        $this->actingAs($this->user, 'api');

        $reviewData = Review::factory()->make(['product_id' => $this->product->id, 'user_id' => $this->user->id])->toArray();

        $response = $this->postJson(route('reviews.create', $this->product), $reviewData);

        $response->assertStatus(200);
    }

    public function test_can_not_create_multiple_reviews()
    {
        $this->actingAs($this->user, 'api');

        $reviewData = Review::factory()->create(['user_id' => $this->user->id, 'product_id' => $this->product->id])->toArray();

        $response = $this->postJson(route('reviews.create', $this->product), $reviewData);

        $response->assertStatus(409);
    }

    public function test_can_update_own_review()
    {
        $this->actingAs($this->user, 'api');

        $review = Review::factory()->create(['user_id' => $this->user->id, 'product_id' => $this->product->id]);
        $reviewData = Review::factory()->make(['user_id' => $this->user->id, 'product_id' => $this->product->id])->toArray();

        $response = $this->patchJson(route('reviews.update', $review), $reviewData);

        $response->assertStatus(200);
    }

    public function test_can_not_update_other_users_review()
    {
        $this->actingAs($this->user, 'api');

        $otherUser = User::factory()->create();
        $review = Review::factory()->create(['user_id' => $otherUser->id, 'product_id' => $this->product->id]);
        $reviewData = Review::factory()->make(['product_id' => $this->product->id])->toArray();

        $response = $this->patchJson(route('reviews.update', $review), $reviewData);

        $response->assertStatus(404);
    }

    public function test_can_delete_own_review()
    {
        $this->actingAs($this->user, 'api');

        $review = Review::factory()->create(['user_id' => $this->user->id, 'product_id' => $this->product->id]);

        $response = $this->deleteJson(route('reviews.delete', $review));

        $response->assertStatus(200);
    }

    public function test_can_not_delete_other_users_review()
    {
        $this->actingAs($this->user, 'api');

        $otherUser = User::factory()->create();
        $review = Review::factory()->create(['user_id' => $otherUser->id, 'product_id' => $this->product->id]);

        $response = $this->deleteJson(route('reviews.delete', $review));

        $response->assertStatus(404);
    }
}
