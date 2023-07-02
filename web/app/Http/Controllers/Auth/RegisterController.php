<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    // registerエンドポイントへのPOSTリクエストを受け付け、ユーザー情報を取得し、その情報を用いて新たなユーザーを登録
    public function register(Request $request)
    {
        // リクエストデータの検証
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        // 失敗した場合
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // 新しいユーザーインスタンスの作成
        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        // ユーザーをログイン状態にする
        Auth::login($user);

        // registeredメソッドを呼び出し、そのレスポンスを返す
        return $this->registered($request, $user)
            ?: redirect()->route('home');
    }

    // 新しく作成されたユーザー情報をJSON形式で返し、HTTPステータスコードは201を返す
    protected function registered(Request $request, $user)
    {
        // ユーザーをJSONレスポンスとして返す
        return response()->json($user, 201);
    }
}
