import { db, storage } from './firebaseConfig';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const pantryCollection = collection(db, 'pantry');
const clarifaiApiKey = 'ca2b7121d61341adb6d2f40c468f786d';

export const addItem = async (item) => {
  try {
    console.log("Adding item to Firestore:", item);
    await addDoc(pantryCollection, item);
    console.log("Item added successfully.");
  } catch (error) {
    console.error("Error adding item:", error);
    throw error; // Ensure errors are propagated
  }
};

export const deleteItem = async (id) => {
  try {
    console.log("Deleting item with ID:", id);
    await deleteDoc(doc(db, 'pantry', id));
    console.log("Item deleted successfully.");
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error; // Ensure errors are propagated
  }
};

export const updateItem = async (id, updatedItem) => {
  try {
    console.log("Updating item with ID:", id, "with data:", updatedItem);
    await updateDoc(doc(db, 'pantry', id), updatedItem);
    console.log("Item updated successfully.");
  } catch (error) {
    console.error("Error updating item:", error);
    throw error; // Ensure errors are propagated
  }
};

export const getItems = async () => {
  try {
    console.log("Fetching items from Firestore...");
    const querySnapshot = await getDocs(pantryCollection);
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Items fetched:", items);
    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error; // Ensure errors are propagated
  }
};

export const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${uuidv4()}`);
  try {
    console.log("Uploading image...");
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Image uploaded successfully. URL:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Ensure errors are propagated
  }
};

export const classifyImage = async (imageUrl) => {
  try {
    console.log("Classifying image with URL:", imageUrl);
    const response = await axios.post(
      'https://api.clarifai.com/v2/models/general-image-recognition/outputs',
      {
        inputs: [
          {
            data: {
              image: {
                url: imageUrl,
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Key ${clarifaiApiKey}`,
        },
      }
    );

    const concepts = response.data.outputs[0].data.concepts;
    console.log("Classification results:", concepts);
    return concepts;
  } catch (error) {
    console.error('Error classifying image:', error);
    return [];
  }
};
