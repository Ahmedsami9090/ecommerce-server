import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { categoryModel } from 'src/DB/schema/category.schema';
import { CategoryRepoService } from 'src/DB/repository/category.repository.service';
import { CloudUpload } from 'common/services';
import { AuthenticationGuard } from 'common/guards/authentication.guard';
import { AuthorizationGuard } from 'common/guards/authorization.guard';
import { UserRepoService } from 'src/DB/repository/users.repository.service';
import { JwtService } from '@nestjs/jwt';
import { userModel } from 'src/DB/schema/user.schema';

@Module({
  imports: [categoryModel, userModel],
  providers: [
    CategoriesService,
    CategoryRepoService,
    UserRepoService,
    JwtService,
    CloudUpload,
    AuthenticationGuard,
    AuthorizationGuard,
  ],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
