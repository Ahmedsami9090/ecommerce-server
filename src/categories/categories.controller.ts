import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerCloudConfig } from 'common/utils';
import { CategoriesService } from './categories.service';
import { FILE_CATEGORIES } from 'common/constants/constants';
import { Roles } from 'common/decorators/Roles.decorator';
import { RoleEnum } from 'common/types/types';
import AuthorizationGuard  from 'common/guards/authorization.guard';
import {
  createCategoryDto,
  deleteCategoryDto,
  updateCategoryBodyDto,
  updateCategoryParamsDto,
} from './DTO/categoryDto';
import { User } from 'common/decorators/User.decorator';
import { UserDocument } from 'src/DB/schema/user.schema';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('new')
  @HttpCode(201)
  @Roles(RoleEnum.super)
  @UseGuards(AuthorizationGuard)
  @UseInterceptors(
    FileInterceptor(
      'categoryImage',
      multerCloudConfig({ allowedCategory: FILE_CATEGORIES.image }),
    ),
  )
  createCategory(
    @User() user : UserDocument,
    @Body() body: createCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoriesService.createCategory(user, body, file);
  }

  @Put('modify/:categoryName')
  @HttpCode(201)
  @Roles(RoleEnum.super)
  @UseGuards(AuthorizationGuard)
  @UseInterceptors(
    FileInterceptor(
      'categoryImage',
      multerCloudConfig({ allowedCategory: FILE_CATEGORIES.image }),
    ),
  )
  updateCategory(
    @Param() { categoryName }: updateCategoryParamsDto,
    @User()  user : UserDocument,
    @Body() body: updateCategoryBodyDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoriesService.updateCategory(
      categoryName,
      user,
      body,
      file,
    );
  }

  @Delete('/:categoryName')
  @Roles(RoleEnum.super)
  @UseGuards(AuthorizationGuard)
  deleteCategory(
    @Param() { categoryName }: deleteCategoryDto,
    @User() user : UserDocument,
  ) {
    return this.categoriesService.deleteCategory(categoryName, user);
  }

  @Get('all')
  getAllCategories(){
    return this.categoriesService.getAllCategories()
  }
}
