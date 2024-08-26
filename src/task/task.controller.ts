import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { TaskDto } from './dto/task.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all tasks' })
  @Get()
  @Auth()
  async getAll() {
    return this.taskService.getAll();
  }

  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: TaskDto })
  @ApiResponse({ status: 201, description: 'Successfully created task' })
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post()
  @Auth()
  async create(@Body() dto: TaskDto, @CurrentUser('id') userId: string) {
    return this.taskService.create(dto, userId);
  }

  @ApiOperation({ summary: 'Update an existing task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiBody({ type: TaskDto })
  @ApiResponse({ status: 200, description: 'Successfully updated task' })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(@Param('id') taskId: string, @Body() dto: TaskDto) {
    return this.taskService.update(taskId, dto);
  }

  @ApiOperation({ summary: 'Delete an existing task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Successfully deleted task' })
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') taskId: string) {
    await this.taskService.delete(taskId);
    return { message: 'Task successfully deleted' };
  }
}
