import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: String,
  amount: Number,
  // Added status field here
  // status: { 
  //   type: String, 
  //   enum: ['pending', 'completed', 'failed'], 
  //   default: 'pending' 
  // }
  status: { 
  type: String,
  enum: ['pending', 'approved', 'awaiting_bank', 'completed', 'failed'],
  default: 'pending'
}
,
  type: { type: String, enum: ['payment', 'deposit', 'withdrawal'] },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);