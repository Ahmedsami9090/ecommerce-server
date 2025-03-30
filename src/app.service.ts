import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  welcomeMessage(res : Response) {
    res.json({message : 'Welcome to E-commerce app.'});
  }
}
