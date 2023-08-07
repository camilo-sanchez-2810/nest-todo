import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto, AuthDto } from 'src/dto';
import * as Argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { KNOWN_REQUEST_ERRORS } from 'src/configs/error-codes/prisma';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: UserDto) {
    const hash = await Argon.hash(dto.password);

    try {
      const newUser =
        await this.prisma.user.create({
          data: {
            name: dto.name,
            last_name: dto.last_name ?? '',
            email: dto.email,
            hash,
          },
          select: {
            name: true,
            last_name: true,
            email: true,
          },
        });

      return {
        ok: true,
        data: newUser,
      };
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (
          error.code.includes(
            KNOWN_REQUEST_ERRORS.unique_constraint_violation,
          )
        ) {
          throw new ForbiddenException(
            'Email already exist',
          );
        }
      }
    }
  }
  async login(dto: AuthDto) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (!user) {
      throw new ForbiddenException(
        'Email incorrect or user doesnt exist',
      );
    }

    const pwMatches = await Argon.verify(
      user.hash,
      dto.password,
    );

    if (!pwMatches) {
      throw new ForbiddenException(
        'Password incorrect',
      );
    }

    delete user.hash;
    return {
      ok: true,
      data: user,
    };
  }
}
