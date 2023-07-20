<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\Role;
use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApiProductControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $manager;
    protected $category;

    public function setUp(): void
    {
        parent::setUp();

        $this->manager = User::factory()->create();

        // Создание роли с ID 3 (или использование существующей, если таковая есть)
        $role = Role::find(3) ?? Role::factory()->create(['id' => 3]);

        // Назначение роли пользователю
        RoleUser::create([
            'user_id' => $this->manager->id,
            'role_id' => $role->id
        ]);

        $this->category = Category::factory()->create();
    }

    public function test_can_get_all_products()
    {
        Product::factory()->count(3)->create();

        $response = $this->getJson(route('products.index'));

        $response->assertStatus(200);
    }

    public function test_can_get_specific_product()
    {
        $product = Product::factory()->create();

        $response = $this->getJson(route('products.show', $product));

        $response->assertStatus(200);
    }

    public function test_can_get_similar_products()
    {
        $product = Product::factory()->create(['price' => 100, 'category_id' => $this->category->id]);
        $similarProduct = Product::factory()->create(['price' => 130, 'category_id' => $this->category->id]);

        $response = $this->getJson(route('products.similar', $product));

        $response->assertStatus(200);
    }

    public function test_can_create_product()
    {
        $this->actingAs($this->manager, 'api');

        $productData = Product::factory()->make(['category_id' => $this->category->id])->toArray();

        $response = $this->postJson(route('products.create'), $productData);

        $response->assertStatus(200);
    }

    public function test_can_not_create_product_with_existing_name()
    {
        $this->actingAs($this->manager, 'api');

        $product = Product::factory()->create();
        $productData = Product::factory()->create(['name' => $product->name])->toArray();

        $response = $this->postJson(route('products.create'), $productData);

        $response->assertStatus(409);
    }

    public function test_can_update_product()
    {
        $this->actingAs($this->manager, 'api');

        $product = Product::factory()->create();
        $productData = Product::factory()->create()->toArray();

        $response = $this->patchJson(route('products.update', $product), $productData);

        $response->assertStatus(200);
    }

    public function test_can_delete_product()
    {
        $this->actingAs($this->manager, 'api');

        $product = Product::factory()->create();

        $response = $this->deleteJson(route('products.delete', $product));

        $response->assertStatus(200);
    }
}
