import React from "react";
import { useSelector } from "react-redux";
import { JournalEntry } from "./JournalEntry";

export const JournalEntries = () => {
  const { entries } = useSelector((state) => state.notes);
  // console.log(notes);
  return (
    <div className="journal__entries">
      {entries.map((entry) => (
        <JournalEntry key={entry.id} {...entry} />
      ))}
    </div>
  );
};
