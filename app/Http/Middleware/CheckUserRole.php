<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        // Получаем пользователя
        $user = User::find(Auth::id());

        // Получаем максимальную роль пользователя
        $userMaxRole = $user->roles()->max('role_id');

        // Проверяем, имеет ли пользователь требуемую роль
        if ($role > $userMaxRole) {
            // Если нет, то возвращаем ошибку
            return response()->json(['error' => 'Insufficient permissions'], 403);
        }

        // Если пользователь имеет необходимую роль, то продолжаем выполнение
        return $next($request);
    }
}
