import { isNotEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  SubCategoryName: string;
}

export class updateSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  subCategory: string;

  @IsOptional()
  @IsString()
  newName: string;
}

export class deleteSubCategoryDto{
  @IsString()
  @IsNotEmpty()
  subCategory : string
}
