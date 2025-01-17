import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dtos/login.input';
import { RegisterInput } from './dtos/register.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(_id: string, email: string) {
    console.log(_id, email);
    return this.usersService.validateByIdAndEmail(_id, email);
  }

  async register(registerDto: RegisterInput) {
    await this.usersService.create(registerDto);
    const foundUser = await this.usersService.findOne(registerDto.email);
    if (!foundUser || foundUser.password != foundUser.password) {
      throw new HttpException(
        'There is no user with this username or password!',
        HttpStatus.CONFLICT,
      );
    }

    const payload = { username: foundUser.name, sub: foundUser._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginInput) {
    const foundUser = await this.usersService.findOne(loginDto.email);
    if (!foundUser || foundUser.password != loginDto.password) {
      throw new HttpException(
        'There is no user with this username or password!',
        HttpStatus.CONFLICT,
      );
    }
    console.log(foundUser.name);

    const payload = { email: foundUser.email, sub: foundUser._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
