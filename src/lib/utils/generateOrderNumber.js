import Counter from "@/models/Counter";

// get next sequence value for order number
export async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequenceValue;
}
