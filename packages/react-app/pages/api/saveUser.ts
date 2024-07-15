// addData.ts
import { db } from 'firebaseConfig';
import { collection, addDoc, DocumentReference } from "firebase/firestore"; 

interface Data {
  walletAddress: string;
  Password: string;
}

const addData = async (): Promise<void> => {
  try {
    const docRef: DocumentReference = await addDoc(collection(db, "User"), {
      name: "Tokyo",
      country: "Japan"
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default addData;
