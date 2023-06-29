<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        // 'login',
        'api/*',  // APIのルートを全てCSRF保護の対象外にします
        // 他にCSRF保護を無効にしたいパスがあればここに追加
    ];
}
