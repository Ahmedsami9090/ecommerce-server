import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { _slugify } from 'common/utils';
import { Types } from 'mongoose';
import { CategoryRepoService } from 'src/DB/repository/category.repository.service';

@Injectable()
export class IsCategory implements PipeTransform {
  constructor(private readonly categoryRepoService: CategoryRepoService) {}

  async transform(name : string , metadata: ArgumentMetadata) {
    const category = await this.categoryRepoService.findOne({
      name: _slugify(name),
      isDeleted: { $exists: false },
    });

    if (!category) {
      throw new NotFoundException('Category not found or deleted');
    }
    return category;
  }
}
