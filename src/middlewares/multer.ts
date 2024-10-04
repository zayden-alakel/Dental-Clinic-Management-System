import multer,{Multer} from 'multer'
import { Request } from 'express';
import __dirname from '../../uploads/path';

type DestinationCallback = (error: Error | null, destination: string) => void;  
type FileNameCallback = (error: Error | null, filename: string) => void
     
const upload = multer({
    storage: multer.diskStorage({
      destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {        
        cb(null, __dirname);
      },
      filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
        cb(null, Date.now()+ '-' + file.originalname);
      }
    }),
    
    fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
      if (['image/jpeg', 'image/png', 'image/tiff', 'application/pdf'].includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only images (JPEG, PNG, TIFF) and PDF files are allowed.'));
      }
    }
  });
  
  export default upload;