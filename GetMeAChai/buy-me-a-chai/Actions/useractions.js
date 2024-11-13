"use server"
import connectDB from "@/app/db/connectDB";
import User from "@/app/models/User";
import Payment from "@/app/models/Payment";
const db = connectDB();


export const updateformdata = async (data,uniquename,oldemail) => {
    
    
        console.log('data', data)
        await User.updateOne({email:oldemail},data)
    
}

export const fetchpaymentdata = async (to_user) => {
  try {
    // Fetch user data using lean() to get a plain JavaScript object
    const datas = await Payment.find({ to_user }).lean();
    console.log(datas);
    
    // Check if user was found
    if (!datas) {
      return null; // or handle the case when user is not found
    }
    return datas.map((data) => ({
      _id: data._id.toString(),
      name: data.name,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      to_user: data.to_user,
      message: data.message,
      amount: data.amount,
      oid: data.oid
    }));
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Could not fetch user data');
  }
};
export const fetchuserdata = async (email) => {
  try {
    // Fetch user data using lean() to get a plain JavaScript object
    const details = await User.findOne({ email }).lean();
    
    // Check if user was found
    if (!details) {
      return null; // or handle the case when user is not found
    }
    
    // If user found, convert ObjectId to string (if needed)
    return {
      _id: details._id.toString(),
      username: details.username,
      email: details.email,
      createdAt: details.createdAt,
      updatedAt: details.updatedAt,
      coverpic: details.coverpic,
      uniquename: details.uniquename,
      profilepic: details.profilepic,
      razorpayid: details.razorpayid,
      razorpaysecret: details.razorpaysecret,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Could not fetch user data');
  }
};

export const updatepayment = async (data, email) =>{
  try{
    console.log("data",data, email)
    const newPayment = await Payment.create({
      email:email,
      name :data.name,
      to_user:data.to_user,
      message:data.message,
      amount:data.amount,
      oid:"12344"
    })
    console.log("Payment successfully created:", newPayment);
  }catch(error){
    console.error("Error updating payment",error)
    throw new Error("Could not update payment")
  }
}