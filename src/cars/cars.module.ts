import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsResolver } from './cars.resolver';
import { Car, CarSchema } from './entities/car.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [CarsResolver, CarsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Car.name,
        schema: CarSchema,
      },
    ]),
  ],
})
export class CarsModule {}
