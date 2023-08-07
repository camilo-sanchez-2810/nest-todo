import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto, AuthDto } from 'src/dto';
import * as Argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { KNOWN_REQUEST_ERRORS } from 'src/configs/error-codes/prisma';
import { JwtService } from '@nestjs/jwt';
import { CONFIGURATION_OPTIONS } from 'src/configs/options/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT } from 'src/configs/interfaces/jwt';
import { AUTH } from 'src/configs/interfaces/auth';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: UserDto): Promise<AUTH> {
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
            email: true,
            id: true,
          },
        });

      return {
        ok: true,
        data: await this.signToken(
          newUser.id,
          newUser.email,
        ),
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
  async login(dto: AuthDto): Promise<AUTH> {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
        select: {
          email: true,
          id: true,
          hash: true,
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

    return {
      ok: true,
      data: await this.signToken(
        user.id,
        user.email,
      ),
    };
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<JWT> {
    const payload = {
      sub: userId,
      email,
    };
    return {
      access_token: await this.jwt.signAsync(
        payload,
        {
          expiresIn: CONFIGURATION_OPTIONS.expire,
          secret: this.config.get('JWT_SECRET'),
        },
      ),
    };
  }
}
