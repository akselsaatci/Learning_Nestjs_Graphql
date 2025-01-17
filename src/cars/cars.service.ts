import { Injectable } from '@nestjs/common';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';

@Injectable()
export class CarsService {
  create(createCarInput: CreateCarInput) {}

  findAll() {
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarInput: UpdateCarInput) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
