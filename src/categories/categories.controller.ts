import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Paramtype,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerCloudConfig } from 'common/utils';
import { CategoriesService } from './categories.service';
import { FILE_CATEGORIES } from 'common/constants/constants';
import { Roles } from 'common/decorators/Roles.decorator';
import { AuthenticationGuardReq, RoleEnum } from 'common/types/types';
import { AuthenticationGuard } from 'common/guards/authentication.guard';
import { AuthorizationGuard } from 'common/guards/authorization.guard';
import {
  createCategoryDto,
  deleteCategoryDto,
  updateCategoryBodyDto,
  updateCategoryParamsDto,
} from './DTO/categoryDto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('new')
  @HttpCode(201)
  @Roles(RoleEnum.admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @UseInterceptors(
    FileInterceptor(
      'categoryImage',
      multerCloudConfig({ allowedCategory: FILE_CATEGORIES.image }),
    ),
  )
  createCategory(
    @Req() { user }: AuthenticationGuardReq,
    @Body() body: createCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoriesService.createCategory(user, body, file);
  }

  @Put('modify/:categoryName')
  @HttpCode(201)
  @Roles(RoleEnum.admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @UseInterceptors(
    FileInterceptor(
      'categoryImage',
      multerCloudConfig({ allowedCategory: FILE_CATEGORIES.image }),
    ),
  )
  updateCategory(
    @Param() { categoryName }: updateCategoryParamsDto,
    @Req() { user }: AuthenticationGuardReq,
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
  @Roles(RoleEnum.admin)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  deleteCategory(
    @Param() { categoryName }: deleteCategoryDto,
    @Req() { user }: AuthenticationGuardReq,
  ) {
    return this.categoriesService.deleteCategory(categoryName, user);
  }

  @Get('all')
  getAllCategories(){
    return this.categoriesService.getAllCategories()
  }
}
