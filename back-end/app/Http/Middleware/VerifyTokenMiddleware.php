<?php

namespace App\Http\Middleware;

use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use Closure;

class VerifyTokenMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            JWTAuth::parseToken()->authenticate();
            return $next($request);
        } catch (\Exception $exc) {
            return response()->json(['error' => true, 'message' => $exc->getMessage()], 401);
        }
    }
}
