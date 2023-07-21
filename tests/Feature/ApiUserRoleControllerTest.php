<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\RoleUser;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApiUserRoleControllerTest extends TestCase
{
    use refreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        Role::factory(5)->create();
    }

    public function test_index()
    {
        $user = User::factory()->create();

        RoleUser::create([
            'user_id' => $user->id,
            'role_id' => 3,
        ]);

        $response = $this->actingAs($user, 'api')
            ->getJson(route('roles.get', ['user' => $user->id]));

        $response->assertStatus(200)
            ->assertJsonStructure([
                '*' => ['id', 'user_id', 'role_id', 'created_at', 'updated_at']
            ]);
    }

    public function test_make_seller()
    {
        $user = User::factory()->create();
        $manager = User::factory()->create();
        RoleUser::create(['user_id' => $manager->id, 'role_id' => 3]);

        $response = $this->actingAs($manager, 'api')
            ->postJson(route('roles.make.seller', ['user' => $user->id]));

        $response->assertStatus(200);
    }

    public function test_remove_seller()
    {
        $user = User::factory()->create();
        $manager = User::factory()->create();

        RoleUser::create(['user_id' => $manager->id, 'role_id' => 3]);
        RoleUser::create(['user_id' => $user->id, 'role_id' => 2]); // Seller role

        $response = $this->actingAs($manager, 'api')
            ->postJson(route('roles.remove.seller', ['user' => $user->id]));

        $response->assertStatus(200);
    }

    public function test_make_manager()
    {
        $user = User::factory()->create();
        $admin = User::factory()->create();

        RoleUser::create(['user_id' => $admin->id, 'role_id' => 4]);

        $response = $this->actingAs($admin, 'api')
            ->postJson(route('roles.make.manager', ['user' => $user->id]));

        $response->assertStatus(200);
    }

    public function test_remove_manager()
    {
        $user = User::factory()->create();
        $admin = User::factory()->create();

        RoleUser::create(['user_id' => $admin->id, 'role_id' => 4]);
        RoleUser::create(['user_id' => $user->id, 'role_id' => 3]); // Manager role

        $response = $this->actingAs($admin, 'api')
            ->postJson(route('roles.remove.manager', ['user' => $user->id]));

        $response->assertStatus(200);
    }

    public function test_make_admin()
    {
        $user = User::factory()->create();
        $headAdmin = User::factory()->create();

        RoleUser::create(['user_id' => $headAdmin->id, 'role_id' => 5]);

        $response = $this->actingAs($headAdmin, 'api')
            ->postJson(route('roles.make.admin', ['user' => $user->id]));

        $response->assertStatus(200);
    }

    public function test_remove_admin()
    {
        $user = User::factory()->create();
        $headAdmin = User::factory()->create();

        RoleUser::create(['user_id' => $headAdmin->id, 'role_id' => 5]);
        RoleUser::create(['user_id' => $user->id, 'role_id' => 4]); // Admin role

        $response = $this->actingAs($headAdmin, 'api')
            ->postJson(route('roles.remove.admin', ['user' => $user->id]));

        $response->assertStatus(200);
    }

    public function test_destroy()
    {
        $user = User::factory()->create();
        $headAdmin = User::factory()->create();

        RoleUser::create(['user_id' => $user->id, 'role_id' => 2]); // Seller role
        RoleUser::create(['user_id' => $headAdmin->id, 'role_id' => 5]); // Head admin role

        $response = $this->actingAs($headAdmin, 'api')
            ->putJson(route('roles.clear', $user->id));

        $response->assertStatus(200);
    }
}
