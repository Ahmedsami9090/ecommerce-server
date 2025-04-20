import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CloudUpload } from 'common/services';
import { CategoryRepoService } from 'src/DB/repository/category.repository.service';
import { createCategoryDto, updateCategoryBodyDto } from './DTO/categoryDto';
import { _slugify } from 'common/utils';
import { AuthenticationGuardReq } from 'common/types/types';
import { UserDocument } from 'src/DB/schema/user.schema';
import { Types } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryRepoService: CategoryRepoService,
    private readonly cloudUpload: CloudUpload,
  ) {}
  //================================ createCategory =======================================
  async createCategory(
    user: UserDocument,
    body: createCategoryDto,
    file: Express.Multer.File,
  ) {
    const categoryCheck = await this.categoryRepoService.findOne({
      slug: _slugify(body.name),
    });
    if (categoryCheck) {
      throw new ConflictException('category already listed');
    }
    const { public_id, secure_url } = await this.cloudUpload.uploadFile(file, {
      folder: 'categories',
    });
    const category = await this.categoryRepoService.create({
      name: body.name,
      slug: _slugify(body.name),
      addedBy: user._id,
      image: {
        public_id,
        secure_url,
      },
    });
    return { message: 'success', category };
  }
  //============================= updateCategory =======================================
  async updateCategory(
    categoryName: string,
    user: UserDocument,
    body?: updateCategoryBodyDto,
    file?: Express.Multer.File,
  ) {
    let tmp: {
      image?: { secure_url: string; public_id: string };
      name?: string;
      slug?: string;
      modifiedBy?: Types.ObjectId;
    } = {};
    const category = await this.categoryRepoService.findOne({
      slug: categoryName,
      isDeleted : {$exists : false}
    });
    if (!category) {
      throw new NotFoundException('category not found');
    }
    if (file) {
      const { secure_url, public_id } = await this.cloudUpload.uploadFile(
        file,
        { folder: 'categories' },
      );
      tmp.image = { secure_url, public_id };
      if (category.image?.public_id) {
        await this.cloudUpload.deleteFile(category.image.public_id);
      }
    }
    if (body?.name) {
      const nameCheck = await this.categoryRepoService.findOne({
        slug: _slugify(body.name),
      });
      if (nameCheck) {
        throw new ConflictException('Category name already used');
      }
      tmp.name = body.name;
      tmp.slug = _slugify(body.name);
    }

    if (Object.keys(tmp).length > 0) {
      tmp.modifiedBy = user._id;
    }
    const updatedCategory = await this.categoryRepoService.findOneAndUpdate(
      { _id: category._id },
      tmp,
    );
    return { message: 'success', updatedCategory };
  }

  //============================== deleteCategory ========================================
  async deleteCategory(categoryName: string, user: UserDocument) {
    const category = await this.categoryRepoService.findOneAndUpdate(
      { slug: _slugify(categoryName), isDeleted : {$exists : false} },
      {
        isDeleted: true,
        deletedBy: user._id,
      },
    );
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return { message: 'success', category };
  }
  //============================= getAllCategories =======================================
  async getAllCategories(){
    const categories = await this.categoryRepoService.findAll({isDeleted : {$exists : false}})
    return {categories}
  }
}
