import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseData {
    @Expose()
    @ApiProperty({ example: 'octocat', description: 'Task Name' })
    name!: string;

    @Expose()
    @ApiProperty({ example: 'www.icon.image.com', description: 'Icon image url' })
    icon?: string;

    @Expose()
    @ApiProperty({ example: 'The task description if necessary', description: 'Task description' })
    description?: string;
}

export class UserResponse {
    @ApiProperty({ description: 'Data task response' })
    @Expose()
    @Type(() => TaskResponseData)
    data!: TaskResponseData;
}