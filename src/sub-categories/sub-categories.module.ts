import { Module } from '@nestjs/common';
import { SubCategoriesController } from './sub-categories.controller';
import { SubCategoriesService } from './sub-categories.service';
import { subCategoryModel } from 'src/DB/schema/subCategory.schema';
import { SubCategoryRepoService } from 'src/DB/repository/subCategory.repository.service';
import { IsCategory } from 'common/pipes/IsCategory.pipe';
import AuthorizationGuard from 'common/guards/authorization.guard';
import { CloudUpload } from 'common/services';
import { CategoryRepoService } from 'src/DB/repository/category.repository.service';
import { AuthenticationGuard } from 'common/guards/authentication.guard';
import { Authorization } from 'common/guards/authorization';
import { categoryModel } from 'src/DB/schema/category.schema';
import { JwtService } from '@nestjs/jwt';
import { UserRepoService } from 'src/DB/repository/users.repository.service';
import { userModel } from 'src/DB/schema/user.schema';

@Module({
  imports: [subCategoryModel, categoryModel, userModel],
  controllers: [SubCategoriesController],
  providers: [
    SubCategoriesService,
    SubCategoryRepoService,
    IsCategory,
    AuthorizationGuard,
    CloudUpload,
    CategoryRepoService,
    UserRepoService,
    AuthenticationGuard,
    Authorization,
    JwtService,
  ],
})
export class SubCategoriesModule {}
