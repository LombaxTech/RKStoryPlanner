import CreateIdea from "@/components/CreateIdea";
import { db } from "@/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Ideas() {
  const router = useRouter();
  const [ideas, setIdeas] = useState<any>([]);

  useEffect(() => {
    const getIdeas = async () => {
      let ideaDocs = await getDocs(collection(db, "storyIdeas"));

      let ideas: any = [];

      ideaDocs.forEach((ideaDoc) => {
        ideas.push({ id: ideaDoc.id, ...ideaDoc.data() });
      });

      setIdeas(ideas);
    };

    getIdeas();
  }, []);

  const deleteIdea = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    idea: any
  ) => {
    e.stopPropagation();
    await deleteDoc(doc(db, "storyIdeas", idea.id));
    console.log("deleted");
    setIdeas(ideas.filter((i: any) => i.id !== idea.id));
  };

  return (
    <div className="p-4 flex flex-col">
      <CreateIdea />
      <div className="flex flex-col mt-4">
        {ideas &&
          ideas.map((idea: any) => {
            return (
              <div
                key={idea.id}
                className="p-4 border-2 rounded-xl cursor-pointer"
                onClick={() => router.push(`/ideas/${idea.id}`)}
              >
                <h1 className="">{idea.title}</h1>
                <button
                  className="btn btn-warning btn-sm self-end"
                  onClick={(e) => deleteIdea(e, idea)}
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
