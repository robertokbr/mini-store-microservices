import { UserDto } from '../dtos/user.dto';

export type CreateSessionRequest = {
  name: string;
};

export type CreateSessionResponse = {
  jwt: string;
};

export type GetSessionPayloadRequest = {
  jwt: string;
};

export type GetSessionPayloadResponse = {
  user: UserDto;
};

export interface AuthServiceContract {
  createSession(data: CreateSessionRequest): Promise<CreateSessionResponse>;
  getSessionPayload(
    data: GetSessionPayloadRequest,
  ): Promise<GetSessionPayloadResponse>;
}
