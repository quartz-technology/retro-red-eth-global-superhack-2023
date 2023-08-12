import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getProjects() {
    return await this.projectService.findAll();
  }

  @Post('vote/:id')
  async vote(@Param('id') id: number) {
    const project = await this.projectService.findOne(id);
    project.upvotes += 1;
    await this.projectService.update(id, project);

    return { message: 'successful', upvotes: project.upvotes };
  }
}
