import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import AuthorizationGuard from 'common/guards/authorization.guard';
import { IsCategory } from 'common/pipes/IsCategory.pipe';
import { CategoryDocument } from 'src/DB/schema/category.schema';
import {
  AddSubCategoryDto,
  deleteSubCategoryDto,
  updateSubCategoryDto,
} from './DTO/subCategoryDto';
import { User } from 'common/decorators/User.decorator';
import { UserDocument } from 'src/DB/schema/user.schema';
import { Roles } from 'common/decorators/Roles.decorator';
import { RoleEnum } from 'common/types/types';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerCloudConfig } from 'common/utils';
import { FILE_CATEGORIES } from 'common/constants/constants';

@Controller('categories/:categoryName/subCategories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post('new')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthorizationGuard)
  @UseInterceptors(
    FileInterceptor(
      'image',
      multerCloudConfig({ allowedCategory: FILE_CATEGORIES.image }),
    ),
  )
  createNewSubCategory(
    @Param('categoryName', IsCategory) category: CategoryDocument,
    @Body() body: AddSubCategoryDto,
    @User() user: UserDocument,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.subCategoriesService.createNewSubCategory(
      category,
      body,
      user,
      file,
    );
  }
  @Put('update')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthorizationGuard)
  @UseInterceptors(
    FileInterceptor(
      'image',
      multerCloudConfig({ allowedCategory: FILE_CATEGORIES.image }),
    ),
  )
  updateSubCategory(
    @Param('categoryName', IsCategory) category: CategoryDocument,
    @User() user: UserDocument,
    @Body() body: updateSubCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.subCategoriesService.updateSubCategory(
      category,
      user,
      body,
      file,
    );
  }

  @Delete()
  @Roles(RoleEnum.super)
  @UseGuards(AuthorizationGuard)
  deleteSubCategory(
    @Param('categoryName', IsCategory) category: CategoryDocument,
    @Body() { subCategory }: deleteSubCategoryDto,
    @User() user: UserDocument,
  ) {
    return this.subCategoriesService.deleteSubCategory(
      category,
      subCategory,
      user,
    );
  }

  @Get()
  getAllSubCategories(@Param('categoryName', IsCategory) category : CategoryDocument){
    return this.subCategoriesService.getAllSubCategories(category)
  }
}
