"use server"
import {getCollection} from "@/lib/db.js"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export const signupAction = async (prevState, formData) => {
  console.log(formData);
  
  const user = {
    email: formData?.email,
    password: formData?.password
  }

  const salt = await bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user?.password, salt);

  const userCollection = await getCollection("users");
  const newUser = await userCollection.insertOne(user);
  const userIdd = newUser.insertedId.toString()

  const ourToken = jwt.sign({
    userId: userIdd,
    exp: Math.floor(Date.now() / 10000) + 60 * 60 * 24
  }, process.env.Secret)

  cookies().set("haikuapp", ourToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24
  })





}






// https://cloud.mongodb.com/v2/66f5956c097f53277b2cd303#/metrics/replicaSet/66f5962400691174afdc917f/explorer/nextfifteen/users/find