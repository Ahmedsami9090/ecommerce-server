import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SubCategoryRepoService } from 'src/DB/repository/subCategory.repository.service';
import { AddSubCategoryDto, updateSubCategoryDto } from './DTO/subCategoryDto';
import { UserDocument } from 'src/DB/schema/user.schema';
import { CategoryDocument } from 'src/DB/schema/category.schema';
import { _slugify } from 'common/utils';
import { CloudUpload } from 'common/services';
import { Types } from 'mongoose';
import { SubCategoryDocument } from 'src/DB/schema/subCategory.schema';

@Injectable()
export class SubCategoriesService {
  constructor(
    private readonly subCategoryRepoService: SubCategoryRepoService,
    private readonly cloudUpload: CloudUpload,
  ) {}
  //========================================== createNewSubCategory ========================================
  async createNewSubCategory(
    category: CategoryDocument,
    body: AddSubCategoryDto,
    user: UserDocument,
    file: Express.Multer.File,
  ) {
    const subCategoryCheck = await this.subCategoryRepoService.findOne({
      name: _slugify(body.SubCategoryName),
      category: category._id,
    });
    if (subCategoryCheck) {
      throw new ConflictException('Sub-category already listed');
    }
    const { secure_url, public_id } = await this.cloudUpload.uploadFile(file, {
      folder: 'sub-categories',
    });
    const subCategory = await this.subCategoryRepoService.create({
      name: body.SubCategoryName,
      slug: _slugify(body.SubCategoryName),
      image: {
        public_id,
        secure_url,
      },
      addedBy: user._id,
      category: category._id,
    });
    return { message: 'success', subCategory };
  }
  //=================================== updateSubCategory =====================================
  async updateSubCategory(
    category: CategoryDocument,
    user: UserDocument,
    body: updateSubCategoryDto,
    file?: Express.Multer.File,
  ) {
    let tmp: {
      image?: { secure_url: string; public_id: string };
      name?: string;
      slug?: string;
      modifiedBy?: Types.ObjectId;
    } = {};
    const subCategory = await this.subCategoryRepoService.findOne({
      slug: body.subCategory,
      category: category._id,
      isDeleted: { $exists: false },
    });
    if (!subCategory) {
      throw new NotFoundException('Sub-Category not found');
    }
    if (body.newName) {
      const nameCheck = await this.subCategoryRepoService.findOne({
        slug: _slugify(body.newName),
      });
      if (nameCheck) {
        throw new ConflictException('Sub-Category name already used');
      }
      tmp.name = body.newName;
      tmp.slug = _slugify(body.newName);
    }
    if (file) {
      const { secure_url, public_id } = await this.cloudUpload.uploadFile(
        file,
        { folder: 'sub-categories' },
      );
      tmp.image = { secure_url, public_id };
      if (subCategory.image?.public_id) {
        await this.cloudUpload.deleteFile(subCategory.image.public_id);
      }
    }
    if (Object.keys(tmp).length > 0) {
      tmp.modifiedBy = user._id;
    }
    const updatedCategory = await this.subCategoryRepoService.findOneAndUpdate(
      { _id: subCategory._id },
      tmp,
    );
    return { message: 'success', updatedCategory };
  }
  //=================================== deleteSubCategory =====================================
  async deleteSubCategory(
    category: CategoryDocument,
    subCategory: string,
    user: UserDocument,
  ) {
    const _category = await this.subCategoryRepoService.findOneAndUpdate(
      {
        slug: subCategory,
        category: category._id,
      },
      {
        isDeleted: true,
        deletedBy: user._id,
      },
    );
    if (!_category) {
      throw new NotFoundException('Sub-Category not found');
    }
    return { message: 'success', _category };
  }
  //=================================== getAllSubcategories =====================================
  async getAllSubCategories(category: CategoryDocument) {
    const subCategories = await this.subCategoryRepoService.findAll({
      category: category._id,
      isDeleted: { $exists: false },
    });
    if (subCategories.length < 1) {
      throw new NotFoundException('Sub-Categories not found');
    }
    return { message: 'success', subCategories };
  }
}
