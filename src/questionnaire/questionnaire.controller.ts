import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { QuestionnaireDto } from './dto/questionnaire.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Questionnaire')
@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @ApiOperation({ summary: 'Get user questionnaire' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved questionnaire',
  })
  @ApiResponse({
    status: 404,
    description: 'Questionnaire not found for the given user',
  })
  @Get()
  @Auth()
  async get(@CurrentUser('id') userId: string) {
    const questionnaire = await this.questionnaireService.get(userId);

    if (!questionnaire) {
      throw new NotFoundException('Questionnaire not found for the given user');
    }

    return questionnaire;
  }

  @ApiOperation({ summary: 'Create a new questionnaire' })
  @ApiBody({ type: QuestionnaireDto })
  @ApiResponse({
    status: 201,
    description: 'Successfully created questionnaire',
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Post()
  @Auth()
  async create(
    @Body() dto: QuestionnaireDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.questionnaireService.create(dto, userId);
  }

  @ApiOperation({ summary: 'Update user questionnaire' })
  @ApiBody({ type: QuestionnaireDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated questionnaire',
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async update(
    @Body() dto: QuestionnaireDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.questionnaireService.update(userId, dto);
  }

  @ApiOperation({ summary: 'Delete user questionnaire' })
  @ApiResponse({
    status: 204,
    description: 'Successfully deleted questionnaire',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(204)
  @Delete()
  @Auth()
  async delete(@CurrentUser('id') userId: string) {
    const deletedQuestionnaire = await this.questionnaireService.delete(userId);

    if (!deletedQuestionnaire)
      throw new NotFoundException("User doesn't exist");

    return { message: 'Questionnaire successfully deleted' };
  }
}
