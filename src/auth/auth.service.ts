import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {
    return {
      ok: true,
      message: 'login success',
    };
  }

  signup() {
    return {
      ok: true,
      message: 'signup success',
    };
  }
}
