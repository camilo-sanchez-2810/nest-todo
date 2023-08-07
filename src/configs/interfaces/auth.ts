import { JWT } from './jwt';

export interface AUTH {
  ok: boolean;
  data: JWT;
}
