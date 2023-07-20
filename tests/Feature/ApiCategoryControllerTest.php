<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\Role;
use App\Models\RoleUser;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApiCategoryControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        // Создание роли с ID 4 (или использование существующей, если таковая есть)
        $role = Role::find(4) ?? Role::factory()->create(['id' => 4]);

        // Назначение роли пользователю
        RoleUser::create([
            'user_id' => $this->user->id,
            'role_id' => $role->id
        ]);

        $this->actingAs($this->user, 'api');
    }

    public function test_index()
    {
        $response = $this->getJson(route('category.index'));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'slug', 'created_at', 'updated_at']
                ]
            ]);
    }

    public function test_getProductsBySlug()
    {
        $category = Category::factory()->create();
        $product = Product::factory()->create(['category_id' => $category->id]);

        $response = $this->getJson(route('category.slug', ['slug' => $category->slug]));

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        'id' => $product->id,
                        'category_id' => $product->category_id,
                    ]
                ]
            ]);
    }

    public function test_getProductsByCategoryId()
    {
        $category = Category::factory()->create();
        $product = Product::factory()->create(['category_id' => $category->id]);

        $response = $this->getJson(route('category.id', ['id' => $category->id]));

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        'id' => $product->id,
                        'image' => $product->image,
                        'name' => $product->name,
                        'price' => $product->price,
                        'rating' => $product->rating,
                        'category_id' => $product->category_id,
                        'short_description' => $product->short_description,
                        'long_description' => $product->long_description,
                    ]
                ]
            ]);
    }

    public function test_create()
    {
        $data = ['name' => fake()->name()];

        $response = $this->postJson(route('category.create'), $data);

        $response->assertStatus(200);
    }

    public function test_update()
    {
        $category = Category::factory()->create();
        $data = ['name' => fake()->name()];

        $response = $this->putJson(route('category.update', ['category' => $category->id]), $data);

        $response->assertStatus(200);
    }

    public function test_destroy()
    {
        $category = Category::factory()->create();

        $response = $this->deleteJson(route('category.delete', ['category' => $category->id]));

        $response->assertStatus(200);
    }
}
