import {
  Controller,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
  Query,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { UserDto } from './dto/user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of user profile.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get()
  @Auth()
  async getUser(@CurrentUser('id') id: string) {
    const { password, ...user } = await this.userService.getById(id);

    return user;
  }

  @ApiOperation({ summary: 'Update user profile' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 200, description: 'User profile has been updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async updateUser(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    const updatedUser = await this.userService.update(id, dto);

    if (!updatedUser) throw new NotFoundException("User doesn't exist");

    return updatedUser;
  }

  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User has been deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Delete(':id')
  @Auth()
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userService.delete(id);

    if (!deletedUser) throw new NotFoundException("User doesn't exist");

    return deletedUser;
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({
    name: 'searchTerm',
    required: false,
    description: 'Search term to filter users',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of all users.',
  })
  @Get('getAll')
  @Auth('admin')
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.userService.getAll(searchTerm);
  }
}
