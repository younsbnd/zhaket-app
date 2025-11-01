import mongoose from "mongoose";

// ticket reply schema
const TicketReplySchema = new mongoose.Schema(
  {
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: [true, "ticket الزامی است"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user الزامی است"],
    },
    message: {
      type: String,
      required: [true, "message الزامی است"],
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.TicketReply ||
  mongoose.model("TicketReply", TicketReplySchema);
