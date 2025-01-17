import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Model, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserInput: CreateUserInput) {
    const newUser = new this.userModel({
      name: createUserInput.name,
      email: createUserInput.email,
      password: createUserInput.password,
    });
    return newUser.save();
  }

  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }

  async validateByIdAndEmail(id: string, email: string): Promise<boolean> {
    return (await this.userModel.findOne({ _id: id, email: email })) != null;
  }

  update(updateUserInput: UpdateUserInput) {
    return `This action updates a #${updateUserInput._id} user`;
  }

  remove(id: Schema.Types.ObjectId) {
    return `This action removes a #${id} user`;
  }
}
