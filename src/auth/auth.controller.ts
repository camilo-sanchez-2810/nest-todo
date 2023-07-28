import {
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, UserDto } from 'src/dto';
import { JoiValidationPipe } from 'src/validation/pipeline/validator';
import {
  authSchema,
  userSchema,
} from 'src/validation/schemas';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new JoiValidationPipe(userSchema))
  signup(@Body() dto: UserDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @UsePipes(new JoiValidationPipe(authSchema))
  singin(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.login();
  }
}
