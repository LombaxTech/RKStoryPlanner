import { AuthContext } from "@/context/AuthContext";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export default function StoryIdea() {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useContext(AuthContext);
  const [idea, setIdea] = useState<null | any>(null);

  const [notes, setNotes] = useState<any>(null);

  useEffect(() => {
    console.log("here is the username", id);

    const getIdea = async () => {
      let ideaDoc = await getDoc(doc(db, "storyIdeas", id as string));

      let idea: any = { id: ideaDoc.id, ...ideaDoc.data() };
      setIdea(idea);
      setNotes(idea.notes);
    };

    if (id) getIdea();
  }, [id]);

  useEffect(() => {
    if (!idea) return;

    const updateIdeaNotes = async () => {
      try {
        await updateDoc(doc(db, "storyIdeas", idea.id), {
          notes,
        });
      } catch (error) {
        console.log(error);
      }
    };

    updateIdeaNotes();
  }, [notes, idea]);

  if (id && idea)
    return (
      <div className="p-4 flex flex-col">
        <Link href={"/"} className="underline mb-2">
          Back
        </Link>
        <button
          className="m-4 p-4 bg-red-800"
          onClick={() => console.log(idea.story)}
        >
          View idea
        </button>
        <h1 className="text-xl font-bold">{idea.title}</h1>
        <textarea
          className="outline-none border-2 p-2 rounded-lg mt-4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>
    );
}
