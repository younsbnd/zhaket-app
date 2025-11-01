import Counter from "@/models/Counter";

// get next sequence value for ticket number
export async function getNextTicketNumber() {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { _id: "TICKET_NUMBER" },
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true }
  );
  return `TKT-${sequenceDocument.sequenceValue}`;
}
