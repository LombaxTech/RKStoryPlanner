import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useEffect } from "react";

import { app, auth, db } from "@/firebase";
import { AuthContext } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import CreateIdea from "@/components/CreateIdea";

export default function App() {
  const { user, userLoading } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    console.log("starting logs...");
    console.log(user);

    // if (!userLoading && !user) router.push("signup");
  }, [user, userLoading]);

  const addStuff = async () => {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  };

  const show = async () => {
    console.log(user);
  };

  useEffect(() => {
    // if set up etc...
    router.push(`/ideas`);
  }, []);

  return (
    <div className="">
      {/* <button onClick={addStuff} className="btn btn-primary">
        Click me!
      </button> */}
      {user && (
        <div className="p-10">
          {user.email}
          {user.name}
          <button onClick={show}>show</button>
        </div>
      )}
      {!user && <div>No user found</div>}
      <CreateIdea />
    </div>
  );
}
