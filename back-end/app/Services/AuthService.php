<?php

namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Validation\UnauthorizedException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    public function login(array $credentials)
    {
        $user = User::where('login', $credentials['login'])->first();
        if (!$user) {
            throw new UnauthorizedException('invalid credentials');
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
