import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('guestbook') // Your API will be at http://localhost:3000/guestbook
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll() {
    return await this.appService.getEntries();
  }

  @Post()
  async create(@Body() body: { name: string; message: string }) {
    return await this.appService.createEntry(body.name, body.message);
  }
}