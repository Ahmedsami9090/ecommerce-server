import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
export class updateCategoryBodyDto {
  @IsOptional()
  @IsString()
  name: string;
}
export class updateCategoryParamsDto {
  @IsNotEmpty()
  @IsString()
  categoryName: string;
}
export class deleteCategoryDto {
  @IsNotEmpty()
  @IsString()
  categoryName: string;
}
