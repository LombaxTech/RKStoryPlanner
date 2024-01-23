import { AuthContext } from "@/context/AuthContext";
import { db } from "@/firebase";
import { addDoc, collection, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

export default function CreateIdea() {
  const router = useRouter();

  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");

  const startIdea = async () => {
    // return console.log(user);

    const newIdea = {
      title,
      createdAt: new Date(),
    };

    const savedIdea = await addDoc(collection(db, "storyIdeas"), newIdea);

    router.push(`/ideas/${savedIdea.id}`);
  };

  return (
    <div className="">
      <input
        placeholder="Idea title"
        type="text"
        className="p-2 rounded-full border-2 outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn btn-primary rounded-full" onClick={startIdea}>
        Start Idea
      </button>
    </div>
  );
}
