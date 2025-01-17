import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { ValidatedUser } from './types/validatedUser';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }
  async validate(payload: any): Promise<ValidatedUser> {
    if (
      (await this.authService.validateUser(payload.sub, payload.email)) == false
    ) {
      throw new HttpException('Please login again', HttpStatus.UNAUTHORIZED);
    }
    console.log(payload.sub, payload.email);
    return { _id: payload.sub, email: payload.email };
  }
}
