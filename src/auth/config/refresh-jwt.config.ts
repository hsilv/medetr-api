import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'refresh-jwt',
  (): JwtSignOptions => ({
    secret: process.env.JWT_REFRESH_SECRET_KEY,
    expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
  }),
);
