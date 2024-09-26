"use server"
import {getCollection} from "@/lib/db.js"

export const signupAction = async (prevState, formData) => {
  console.log(formData);
  
  const user = {
    email: formData?.email,
    password: formData?.password
  }

  const userCollection = await getCollection("users");
  await userCollection.insertOne(user);





}