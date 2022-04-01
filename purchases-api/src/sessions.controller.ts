import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { AuthServiceContract } from 'src/shared/contracts/auth-service.contract';
import { CreateSessionDto } from './shared/dtos/create-session.dto';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController implements OnModuleInit {
  private authService: AuthServiceContract;

  constructor(
    @Inject('AuthModule')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authService = this.client.getService('AuthService');
  }

  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    return this.authService.createSession(createSessionDto);
  }
}
