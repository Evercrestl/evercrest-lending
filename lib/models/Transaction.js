import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: String,
  amount: Number,
  type: {type: String, enum: ['payment', 'deposit', 'withdrawal']},
  createdAt: {type: Date, default: Date.now} // repayment / adjustment
}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);