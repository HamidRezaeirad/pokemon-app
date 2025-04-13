import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  /**
   * Initializes the AppController with the required service.
   * @param appService - The service responsible for application logic.
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Returns the App version.
   *
   * @returns A string containing the version of the App.
   */
  @ApiResponse({ status: 200 })
  @Get('version')
  getHello(): string {
    return this.appService.getAppVersion();
  }
}
