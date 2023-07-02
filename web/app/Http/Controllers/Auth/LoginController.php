<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /**
     * Handle an incoming authentication request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        // バリデーションチェック
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // リクエストからメールアドレスとパスワードだけを取り出す
        $credentials = $request->only('email', 'password');

        // 認証をし、成功の場合はセッションIDを再生成。認証されたユーザーの情報をJSON形式でレスポンスとして返す。
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json(Auth::user(), 200);
        }

        // 認証に失敗した場合、エラーメッセージとともにValidationExceptionがスロー
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    /**
     * Handle an outgoing logout request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        // 現在認証されているユーザーをログアウト
        Auth::logout();

        // 現在のセッションを無効に
        $request->session()->invalidate();
        // 新たなCSRFトークンを生成
        $request->session()->regenerateToken();

        // 空のJSONレスポンスを返します。これは通常、ログアウト操作が成功したことをクライアントに伝えるために使用
        return response()->json();
    }
}
