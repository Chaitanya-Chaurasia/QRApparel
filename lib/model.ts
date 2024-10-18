import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  orderId: string;
  link: string;
}

const UserSchema = new mongoose.Schema({
  name: { type: String, unique: false },
  email: { type: String, unique: true },
  orderId: { type: String, unique: true },
  qrCode: { type: String },
  link: { type: String },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("Users", UserSchema);
