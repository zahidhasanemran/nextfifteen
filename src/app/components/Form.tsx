"use client"
import { signupAction } from "@/other/userController"
import { useFormState, useFormStatus } from "react-dom"
import { useForm } from "react-hook-form"



export default function Form(){

  const [formState, formaction] = useFormState(signupAction, {})
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(formState);
  

  const onSubmit = async (data) => {
    // console.log("Client-side data:", data);
    // Handle form submission via server action
    formaction(data);
  };
  

  return (
    <form action={formaction} onSubmit={handleSubmit(onSubmit)} className="mx-auto w-[500px] px-5 py-4 ">
        <div className="">
          <div className="">
            <input type="email" {...register("email", { required: "Email is required" })} className="w-full block py-2 px-3 rounded" autoComplete="off" placeholder="Email" />
            {errors?.email?.message && <p className="error">{errors?.email?.message}</p>}
          </div>
          <div className="">
            <input type="password" {...register("passwordd", { required: "passwordd is required" })} className="w-full block py-2 px-3 rounded my-4 " placeholder="Password" autoComplete="off" />
            {errors?.passwordd?.message && <p className="error">{errors?.passwordd?.message}</p>}
          </div>
          <button className="bg-black rounded px-4 py-3 text-white" type="submit">Submit</button>
        </div>
      </form>
  )
}