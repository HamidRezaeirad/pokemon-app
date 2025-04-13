import { Logger } from '@nestjs/common';

const logger = new Logger('BattleService');

export function getLogger(): Logger {
  return logger;
}
