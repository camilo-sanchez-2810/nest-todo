import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/dto';
import { User } from '@prisma/client';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(user: UserDto) {
    // const dto: User = {
    //   name: user.name,
    //   last_name: user.last_name,
    //   email: user.email,
    //   hash: user.password,
    // };
    // const newUser = await this.prisma.user.create({
    //   data: dto,
    // });
    return {
      ok: true,
      data: 'user',
    };
  }
  login() {
    return {
      ok: true,
      message: 'login success',
    };
  }
}
