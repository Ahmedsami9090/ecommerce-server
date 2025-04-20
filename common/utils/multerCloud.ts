import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

interface ImulterCloudConfig extends MulterOptions {
  allowedCategory: string[];
  sizeLimit?: number;
}

export const multerCloudConfig = ({
  allowedCategory,
  limits,
  sizeLimit = 10,
}: ImulterCloudConfig) => {
  const storage = diskStorage({});
  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: Function,
  ) => {
    if (!allowedCategory.includes(file.mimetype)) {
      cb(new BadRequestException('File extension not allowed'), false);
    }
    cb(null, true);
  };
  limits = { fileSize: sizeLimit * 1024 * 1024 };
  return { storage, fileFilter, limits };
};
