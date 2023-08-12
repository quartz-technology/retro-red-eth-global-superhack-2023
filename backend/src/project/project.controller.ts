import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectDto } from './dto/ProjectDto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({
    status: 200,
    description: 'Return all projects',
    type: ProjectDto,
  })
  @Get()
  async getProjects(): Promise<ProjectDto[]> {
    return await this.projectService.findAll();
  }

  @ApiOperation({ summary: 'Upvote a project' })
  @ApiResponse({ status: 200, description: 'Upvote a project' })
  @Post('vote/:id')
  async vote(@Param('id') id: number) {
    const project = await this.projectService.findOne(id);
    project.upvotes += 1;
    await this.projectService.update(id, project);

    return { message: 'successful', upvotes: project.upvotes };
  }
}
