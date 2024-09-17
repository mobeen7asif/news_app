<?php

namespace App\Helpers;

class ResponseHelper
{
	private static $statusMessages = [
		200 => 'Success',
		201 => 'Created',
		204 => 'No Content',
		400 => 'Bad Request',
		401 => 'Unauthenticated',
		403 => 'Forbidden',
		404 => 'Not Found',
		422 => 'Validation Error',
		500 => 'Internal Server Error',
	];

	public static function sendResponse($data = null, $message = null, $code = 200)
	{
		$status = true;
		$message = $message ?? self::$statusMessages[$code];

		if ($code >= 400) {
			$status = false;
		}

		$response = [
			'status' => $status,
			'message' => $message,
		];

		if (!is_null($data)) {
			$response = array_merge($response, $data);
		}

		return response()->json($response, $code);
	}

	public static function sendError($message = null, $errors = null, $code = 400)
	{
		$response = [
			'status' => false,
			'message' => $message ?? self::$statusMessages[$code],
		];

		if (!is_null($errors)) {
			$response['errors'] = $errors;
		}

		return response()->json($response, $code);
	}
}