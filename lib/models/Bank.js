import mongoose from "mongoose";

const BankSchema = new mongoose.Schema(
  {
    bank: String,
    accountName: String,
    accountNumber: String,
  },
  { timestamps: true }
);

export default mongoose.models.Bank ||
  mongoose.model("Bank", BankSchema);
