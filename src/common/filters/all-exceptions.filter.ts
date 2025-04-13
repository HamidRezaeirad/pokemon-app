import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

/**
 * A global exception filter that handles all uncaught exceptions in the application.
 * This filter logs the error details and sends a structured JSON response to the client.
 *
 * @decorator `@Catch()`
 * @implements `ExceptionFilter`
 *
 * The filter performs the following:
 * - Logs the HTTP method, URL, and error message using the `Logger` service.
 * - Determines the HTTP status code based on the exception type.
 * - Constructs a JSON response containing error details such as status code, message, timestamp, and request path.
 *
 * Usage:
 * - This filter should be registered globally to handle all exceptions in the application.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    this.logger.error(
      `[${request.method}] ${request.url} → ${JSON.stringify(message)}`,
    );

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
