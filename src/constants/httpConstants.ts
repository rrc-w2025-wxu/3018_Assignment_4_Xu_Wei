/**
 * HTTP status codes used throughout the API for consistency.
 *
 * Each property represents a standard HTTP response code:
 * - OK (200): Request succeeded.
 * - CREATED (201): Resource successfully created.
 * - BAD_REQUEST (400): Client sent invalid data or request.
 * - NOT_FOUND (404): Resource not found.
 * - INTERNAL_SERVER_ERROR (500): Server encountered an unexpected error.
 */

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const;