/**
 * Basic Telemetry and Logger Service
 * Wraps console.log for local dev and can be extended to Sentry/Axiom in production.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private log(level: LogLevel, message: string, meta?: any) {
    const timestamp = new Date().toISOString();

    if (process.env.NODE_ENV !== 'production') {
      console[level](
        `[${timestamp}] ${level.toUpperCase()}: ${message}`,
        meta ? meta : '',
      );
    } else {
      // In production, integrate with a real telemetry service (Sentry, Datadog)
      // e.g., Sentry.captureMessage(message, { level, extra: meta })
      console[level](
        `[${timestamp}] ${level.toUpperCase()}: ${message}`,
        meta ? JSON.stringify(meta) : '',
      );
    }
  }

  info(message: string, meta?: any) {
    this.log('info', message, meta);
  }
  warn(message: string, meta?: any) {
    this.log('warn', message, meta);
  }
  error(message: string, error?: Error | any) {
    this.log('error', message, error);
  }
  debug(message: string, meta?: any) {
    this.log('debug', message, meta);
  }
}

export const logger = new Logger();
