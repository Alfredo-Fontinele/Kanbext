<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->only(['login', 'senha']);
            $authLogin = $this->authService->login($credentials);
            return response()->json($authLogin);
        } catch (\Exception $exc) {
            return response()->json(['error' => true, 'message' => $exc->getMessage()], $exc->getCode());
        }
    }
}
