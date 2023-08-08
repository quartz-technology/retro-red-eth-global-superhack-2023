import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mariadb',
          host: configService.getOrThrow<string>('db.host'),
          port: configService.getOrThrow<number>('db.port'),
          username: configService.getOrThrow<string>('db.username'),
          password: configService.getOrThrow<string>('db.password'),
          database: configService.getOrThrow<string>('db.name'),
          // TODO need to remove it in production
          synchronize: true,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
