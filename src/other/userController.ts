"use server"
import {getCollection} from "@/lib/db.js"
import bcrypt from "bcrypt"

export const signupAction = async (prevState, formData) => {
  console.log(formData);
  
  const user = {
    email: formData?.email,
    password: formData?.password
  }

  const salt = await bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user?.password, salt);

  const userCollection = await getCollection("users");
  await userCollection.insertOne(user);





}






// https://cloud.mongodb.com/v2/66f5956c097f53277b2cd303#/metrics/replicaSet/66f5962400691174afdc917f/explorer/nextfifteen/users/find