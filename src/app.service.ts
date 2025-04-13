import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Returns the application version.
   *
   * @returns A string containing the application version.
   **/

  getAppVersion(): string {
    return '1.0.0';
  }
}
