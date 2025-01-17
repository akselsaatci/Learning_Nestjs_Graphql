import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooSchema } from 'mongoose';

export type CarDocument = HydratedDocument<Car>;

@ObjectType()
@Schema()
export class Car {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  brand: string;

  @Field(() => String)
  @Prop()
  model: string;

  @Field(() => String)
  @Prop()
  year: number;
}
export const CarSchema = SchemaFactory.createForClass(Car);
