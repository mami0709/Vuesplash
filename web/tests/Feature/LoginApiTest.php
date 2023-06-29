<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginApiTest extends TestCase
{
    use RefreshDatabase;

    protected $user; // プロパティの追加

    public function setUp(): void
    {
        parent::setUp();

        // テストユーザー作成
        $this->user = User::factory()->create(); // Laravel 8以上のファクトリーの書き方
    }

    /**
     * @test
     */
    public function should_登録済みのユーザーを認証して返却する()
    {
        $response = $this->json('POST', route('login'), [
            'email' => $this->user->email,
            'password' => 'password',
        ]);
        $response->dump();  // Add this

        $response
            ->assertStatus(200)
            ->assertJson(['name' => $this->user->name]);

        $this->assertAuthenticatedAs($this->user);
    }
}
