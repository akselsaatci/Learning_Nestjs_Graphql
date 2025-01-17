import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { ValidatedUser } from 'src/auth/types/validatedUser';

@Resolver(() => Car)
export class CarsResolver {
  constructor(private readonly carsService: CarsService) {}

  @Mutation(() => Car)
  createCar(@Args('createCarInput') createCarInput: CreateCarInput) {
    return this.carsService.create(createCarInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Car], { name: 'cars' })
  findAll(@CurrentUser() user: ValidatedUser) {
    console.log(user._id);
    return this.carsService.findAll();
  }

  @Query(() => Car, { name: 'car' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.carsService.findOne(id);
  }

  @Mutation(() => Car)
  updateCar(@Args('updateCarInput') updateCarInput: UpdateCarInput) {
    return this.carsService.update(updateCarInput.id, updateCarInput);
  }

  @Mutation(() => Car)
  removeCar(@Args('id', { type: () => Int }) id: number) {
    return this.carsService.remove(id);
  }
}
