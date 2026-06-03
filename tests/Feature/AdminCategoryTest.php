<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminCategoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_category_with_type(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
            'status' => 'active',
        ]);

        $response = $this->actingAs($admin)
            ->post('/admin/categories', [
                'name' => 'Tech Events',
                'type' => 'standard',
                'description' => 'Technology category',
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('categories', [
            'name' => 'Tech Events',
            'type' => 'standard',
            'slug' => 'tech-events',
        ]);
        $this->assertCount(1, Category::all());
    }
}
