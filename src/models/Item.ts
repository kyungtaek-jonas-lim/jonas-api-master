import mongoose, { Schema, Document } from "mongoose";

/**
 * @description MongoDB Test Respository
 * @author Jonas Lim
 * @date Jan 29, 2025
 * @reference ORM vs ODM (https://github.com/kyungtaek-jonas-lim/jonastudy/blob/main/concept/database/orm_odm/orm_odm_en.md)
 */
export interface Item extends Document {
    name: string;
    price: number;
}

const ItemSchema: Schema = new Schema({
   name: { type: String, required: true }, 
   price: { type: Number, required: true},
});

export const ItemModel = mongoose.model<Item>("Item", ItemSchema);