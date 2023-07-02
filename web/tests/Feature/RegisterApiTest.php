<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegisterApiTest extends TestCase
{
    // DBのリセット
    use RefreshDatabase;

    /**
     * @test
     */
    public function should_新しいユーザーを作成して返却する()
    {
        $data = [
            'name' => 'vuesplash user',
            'email' => 'dummy@email.com',
            'password' => 'test1234',
            'password_confirmation' => 'test1234',
        ];

        // 新規ユーザー登録のエンドポイントに対してPOSTリクエストを送信
        $response = $this->json('POST', route('register'), $data);

        // 最初に作成されたユーザー情報をデータベースから取得
        $user = User::first();
        // 取得したユーザーの名前が送信したデータの名前と一致することを確認
        $this->assertEquals($data['name'], $user->name);
        // 応答ステータスが201かつ、応答データ内に作成したユーザーの名前が含まれていることを確認
        $response
            ->assertStatus(201)
            ->assertJson(['name' => $user->name]);
    }
}
