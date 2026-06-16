"use client";


import React,{useEffect,useState} from 'react'
import {useParams} from "next/navigation"
import {useVerifyTokenEmailMutation } from "@/src/store/api";
import {useDispatch,useSelector} from "react-redux";
import {motion} from "framer-motion";
import { RootState } from '@/src/store/store';
import { setEmailVerified } from '@/src/store/slice/userSlice';
import { MdOutlineSms } from 'react-icons/md';
import { HiXCircle } from 'react-icons/hi';
import { AiOutlineLoading } from 'react-icons/ai';
import { BsRocketTakeoff, BsRocketTakeoffFill } from 'react-icons/bs';
import { MailCheck } from 'lucide-react';

export default function Page() {

    const {token} = useParams<{token:string}>();
    

    const [verifyEmail] = useVerifyTokenEmailMutation();
    const dispatch=useDispatch();
    const isVerifiedEmail=useSelector((state:RootState)=>state.user.isEmailVerified);
    const [verificationStatus,setVerificationStatus]=useState<"loading" | "success" | "alreadyVerified" | "failed">("loading");

    useEffect(()=>{
            
      const verif=async()=>{

        if(isVerifiedEmail){
            setVerificationStatus("alreadyVerified");
            return;
        }

        try {
            const response=await verifyEmail({token}).unwrap();
            console.log("response verif: ",response);
            
            if(response.success){
                setVerificationStatus("success");
                dispatch(setEmailVerified(response.success));

               setTimeout(() => {
                window.location.href="/";
            }, 5000);

            }else{
                setVerificationStatus("failed");
            }
           

        } catch (error) {
            console.log(error);
            setVerificationStatus("failed");
        }

      }

      if(token){
        console.log("token: ",token);
      
        
        verif();
      }

            
    },[token,verifyEmail,isVerifiedEmail,dispatch]);


  return (
    <div className='container flex items-center justify-center h-screen'>

      {
        verificationStatus==="loading" && (
          <motion.div className='flex items-center justify-center'
          initial={{scale:0}}
          animate={{scale:1}}
          transition={{duration:0.5}}
          >
           <BsRocketTakeoffFill className='animate-spin text-blue-500 text-4xl md:h-12 md:w-12 '/>
            <span>Loading...</span>
          </motion.div>
        )
      }


      {
        verificationStatus==="success" && (
          <motion.div className='flex items-center justify-center'
          initial={{scale:0}}
          animate={{scale:1}}
          transition={{duration:0.5}}
          >
          <MailCheck className='text-green-500 text-4xl md:h-12 md:w-12 '/>
            <span>Verification Success</span>
          </motion.div>
        )
      }

      {
        verificationStatus==="failed" && (
          <motion.div className='flex items-center justify-center'
          initial={{scale:0}}
          animate={{scale:1}}
          transition={{duration:0.5}}
          >
            <HiXCircle className='text-red-500 text-4xl md:h-12 md:w-12 '/>
            <span>Verification Failed</span>
            {/* <div className='loader ease-linear rounded-full border-8 border-t-8 border-red-400 h-12 w-12 mb-4'></div> */}
          </motion.div>
        )
      }


      {
        verificationStatus==="alreadyVerified" && (
          <motion.div className='flex items-center justify-center'
          initial={{scale:0}}
          animate={{scale:1}}
          transition={{duration:0.5}}
          >
            <MdOutlineSms className='text-green-500 text-4xl md:h-12 md:w-12 '/>
            <span>Verification Success</span>
          </motion.div>
        )
      }

    </div>
  )
}