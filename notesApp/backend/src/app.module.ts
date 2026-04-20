import { Module } from '@nestjs/common';
import{TypeOrmModule}from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite', // El nombre del archivo que se creará
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ¡Ojo! Solo para desarrollo: crea las tablas automáticamente
    }),
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
