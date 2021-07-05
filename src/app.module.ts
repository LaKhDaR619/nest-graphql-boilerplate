import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import dbConfig from './config/dbConfig';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(dbConfig),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      context: ({ req }) => ({ request: req }),
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            error.extensions?.exception?.response?.message || error.message,
        };
        return graphQLFormattedError;
      },
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
