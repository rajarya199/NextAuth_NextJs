import mongoose, { model, models,InferSchemaType } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for OAuth users
    image: { type: String, default: "" },
    provider: {
      type: String,
      default: "credentials",
      enum: ["credentials", "google", "github", "linkedin"],
    },
    emailVerified: { type: Date },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

// Hash password before saving to database
userSchema.pre("save",async function(this:any,next){
    if(this.isModified("password")){
          this.password = await bcrypt.hash(this.password, 10);

    }
next()
})
export type UserType = InferSchemaType<typeof userSchema>;

const User = models?.User || model<UserType>("User", userSchema);
export default User;
