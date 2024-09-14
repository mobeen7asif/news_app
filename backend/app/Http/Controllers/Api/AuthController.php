<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Helpers\ResponseHelper;

class AuthController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Register User
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createUser(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required'
            ]);

            if ($validator->fails()) {
                return ResponseHelper::sendError('Validation error', $validator->errors(), 422);
            }

            $user = $this->authService->registerUser($request->all());

            return ResponseHelper::sendResponse([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'token' => $user->createToken("API_TOKEN")->plainTextToken,
                ],
            ], 'User Created Successfully', 201);

        } catch (\Exception $exception) {
            return ResponseHelper::sendError($exception->getMessage(), null, 500);
        }
    }

    /**
     * Login User
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function loginUser(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if ($validator->fails()) {
                return ResponseHelper::sendError('Validation error', $validator->errors(), 422);
            }

            $userData = $this->authService->loginUser($request->only(['email', 'password']));

            return ResponseHelper::sendResponse([
                'user' => $userData,
            ], 'User Logged In Successfully');

        } catch (\Exception $exception) {
            return ResponseHelper::sendError($exception->getMessage(), null, 500);
        }
    }

    public function logOut(Request $request)
    {
        try {
            $user = Auth::user();
            if ($user) {
                $this->authService->logOutUser($user);
            }
            return ResponseHelper::sendResponse([], 'Logged Out Successfully');
        } catch (\Exception $exception) {
            return ResponseHelper::sendError($exception->getMessage(), null, 500);
        }
    }

    public function webLogin(Request $request)
    {
        if ($request->expectsJson()) {
            return ResponseHelper::sendResponse(['success' => false]);
        }
    }
}
