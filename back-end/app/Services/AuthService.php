<?php

namespace App\Services;

use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;

class AuthService
{
    public function login(array $credentials)
    {
        $user = User::where('login', $credentials['login'])->first();
        if (!$user) {
            return response()->json(['error' => true, 'message' => 'invalid credentials'], 400);
        }
        if (!password_verify($credentials['senha'], $user->senha)) {
            return response()->json(['error' => true, 'message' => 'invalid credentials'], 400);
        }
        $token = JWTAuth::fromUser($user);
        return [
            'access_token' => $token
        ];
    }
}
