import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";

const config = {
  apiKey: process.env.APP_FIREBASE_KEY,
  authDomain: "app-feedback-1f16f.firebaseapp.com",
  projectId: "app-feedback-1f16f",
  storageBucket: "app-feedback-1f16f.appspot.com",
  messagingSenderId: "694762859569",
  appId: "1:694762859569:web:3f69bb8a264a3c68d93910",
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc(`${obj.id}`);
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
};

export const addCollection = async (collectionKey, objectToAdd) => {
  await addDoc(collection(firestore, collectionKey), objectToAdd);
};

export const addFeedbackFire = async (collectionKey, objectToAdd) => {
  await firestore
    .collection(collectionKey)
    .doc(`${objectToAdd.id}`)
    .set(objectToAdd);
};

// VOTE ACTION TO FIREBASE DB
export const upvoteActionFire = async (data) => {
  const docRef = firestore.collection("productRequests").doc(`${data.id}`);
  const userRef = firestore.collection("user").doc("currentUser");
  await docRef.update({ upvotes: firebase.firestore.FieldValue.increment(1) });
  await userRef.update({
    votes: firebase.firestore.FieldValue.arrayUnion(`${data.id}`),
  });
};

// ADD COMMENT ACTION TO FIREBASE DB
export const addCommentFire = async (id, data) => {
  const docRef = firestore.collection("productRequests").doc(`${id}`);
  await docRef.update({
    comments: firebase.firestore.FieldValue.arrayUnion(data),
  });
};

// REPLY TO A COMMENT ACTION TO FIREBASE DB
export const replyToCommentFire = async (id, data) => {
  const docRef = firestore.collection("productRequests").doc(`${id}`);
  await docRef.update({ comments: data });
};

// DELETE FEEDBACK ACTION TO FIREBASE DB
export const deleteFeedbackFire = async (id) => {
  const docRef = firestore.collection("productRequests").doc(`${id}`);
  await docRef
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

// EDIT FEEDBACK ACTION TO FIREBASE DB
export const editFeedbackFire = async (id, data) => {
  const docRef = firestore.collection("productRequests").doc(`${id}`);
  await docRef.update(data);
};

export const getData = async () => {
  const appData = [];
  try {
    const querySnapshot = await getDocs(
      collection(firestore, "productRequests")
    );
    querySnapshot.forEach((doc) => appData.push(doc.data()));
    return appData;
  } catch (error) {
    alert(`Something went wrong!... ${error.message}`);
  }
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

export default firebase;
