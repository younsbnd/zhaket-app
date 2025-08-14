"use client";

import TiptapEditor from "@/components/shared/tiptapeditor/TipTap";
import React, { useState } from "react";
export default function Page() {
  const [arrayValue, setArrayValue] = useState([]);
  return (
    <div className="p-4">
      <TiptapEditor
     
        onChangeBlocks={setArrayValue}
      />
      <h3 className="mt-4 font-bold">خروجی آرایه:</h3>
      <pre>{JSON.stringify(arrayValue, null, 2)}</pre>
    </div>
  );
}
