import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('guestbook') 
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

  // New Delete Route
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.appService.deleteEntry(id);
  }
}