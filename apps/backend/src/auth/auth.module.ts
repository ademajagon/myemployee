import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard'; // Import guard
import { RolesGuard } from './roles.guard'; // Import guard

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ], // Add guards here
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard, RolesGuard], // Export guards if needed in other modules
})
export class AuthModule {}
