import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { IoIosCloseCircle } from "react-icons/io";

export const Crud = () => {
    const [users,Setusers] = useState([]);
    const [filterUser,SetfiterUser] = useState([]);
    const [Recordopen,Setrecordopen] = useState(false);
    const [Userdata,SetUserData] = useState({name:"",age:"",city:""});

// API data
    const GetUserData = async ()=>{
      await axios.get("http://localhost:8000/users").then((res)=>{
        console.log(res.data);
        Setusers(res.data);
        SetfiterUser(res.data);
      });
    }

    useEffect(()=>{
        GetUserData();
    },[]);

// Filtered user record 

    const FilterUserData=(e)=>{
        let searchData = e.target.value.toLowerCase();
        // console.log(searchData);
        let filterData = users.filter((user)=> user.name.toLowerCase().includes(searchData) || 
        user.city.toLowerCase().includes(searchData));
        SetfiterUser(filterData ? filterData :"Not Data founded");
        
    }

// delete user record    
   const DeleteUserData = async (UserId)=>{
     const Isconfirm = window.confirm("Are you sure to delete this record");
     if(Isconfirm){
        await axios.delete(`http://localhost:8000/users/${UserId}`).then((res)=>{
            Setusers(res.data);
            SetfiterUser(res.data);
        });
     }
   }

   // close Record 
   const CloseRecord = ()=>{
     Setrecordopen(false);
     GetUserData();
   }

   // open record
   const OpenRecord = ()=>{
     Setrecordopen(true);
     SetUserData({name:"",age:"",city:""});
   }

   // User records Handler
   const UserecordHandler = (e)=>{
      const value = e.target.value;
      const Uname = e.target.name;
      SetUserData({...Userdata,[Uname]:value});
    //   console.log(value);
   };

   // User Record Added  else   // update function if
   const AddUserRecords = async (e)=>{
     e.preventDefault();

     if(Userdata.id){
        await axios.post(`http://localhost:8000/users/${Userdata.id}`,Userdata).then((res)=>{
            // console.log(res);
            alert("User record Updated");
         });

     }else{
        await axios.post("http://localhost:8000/users",Userdata).then((res)=>{
            // console.log(res);
            alert("User record added");
         });
     }

     CloseRecord();
     SetUserData({name:"",age:"",city:""});

   };


   // Update user Records 
   const EditUserRecord= (users)=>{
    SetUserData(users);
    Setrecordopen(true);
   }



  return (
    <>
    <div className=' w-full'>
     <div className=' w-full h-full flex flex-col justify-center'>
        <div className=' flex justify-evenly gap-28 w-full'>
            <input type="text" onChange={(e)=>FilterUserData(e)} placeholder='Search your record here...' className='border border-gray-300 rounded-sm py-2 px-3 outline-none hover:ring-1 hover:ring-blue-500 transition w-80' />
            <button className='border border-blue-500 text-white rounded-sm py-1 px-2 bg-blue-500 cursor-pointer' onClick={OpenRecord}>Add record</button>
        </div>
        <div className='my-8 w-full justify-center items-center'>
            <table className=' border border-collapse border-gray-300 w-full mx-auto my-0'>
                <thead>
                    <tr className=' bg-blue-500 text-white'>
                        <th className=' border border-gray-300 py-2 px-2'>S.no</th>
                        <th className=' border border-gray-300 py-2 px-2'>Name</th>
                        <th className=' border border-gray-300 py-2 px-2'>Age</th>
                        <th className=' border border-gray-300 py-2 px-2'>City</th>
                        <th className=' border border-gray-300 py-2 px-2'>Edit</th>
                        <th className=' border border-gray-300 py-2 px-2'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                   
                    {filterUser && filterUser.map((user,index)=>{
                        return (
                         <tr key={user.id} className=' odd:bg-gray-100 even:bg-white cursor-pointer hover:bg-gray-200'>
                             <td className=' border border-gray-300 py-2 text-center'>{index + 1}</td>
                             <td className=' border border-gray-300 py-2 text-center'>{user.name}</td>
                             <td className=' border border-gray-300 py-2 text-center'>{user.age}</td>
                             <td className=' border border-gray-300 py-2 text-center'>{user.city}</td>
                             <td className=' border border-gray-300 py-2 text-center'><button className=' border border-green-500 bg-green-500 text-white py-1 px-5 cursor-pointer rounded-sm text-sm' onClick={()=> EditUserRecord(user)}>Edit</button></td>
                             <td className=' border border-gray-300 py-2 text-center'><button className=' border border-red-500 bg-red-500 text-white py-1 px-5 cursor-pointer rounded-sm text-sm' onClick={()=>DeleteUserData(user.id)}>Delete</button></td>
                         </tr>
                        )
                    })}
                  
                </tbody>
            </table>
            
        </div>
     </div>

     {
        Recordopen && (
           <div className=' w-full h-full fixed top-0 left-0 z-10 bg-black/40 transition-all'> 
             <div className=' bg-white w-2/5 h-96 my-10 mx-auto p-5 rounded-sm'>

              <div className=' flex justify-between'>
                <h2 className=' text-2xl p-2 text-blue-500 font-medium '>{Userdata.id?"Update User Record":"Add User Record"}</h2>
                <button className=' cursor-pointer text-3xl text-red-500 transition-all hover:scale-110' onClick={CloseRecord}> <IoIosCloseCircle /> </button>
              </div>

              <div>
                <div className='p-2'>
                    <label htmlFor="name" className=' block mb-2'>User name</label>
                    <input type="text" name='name' id='name' className=' border border-gray-300 rounded-sm py-1 px-2 w-full  outline-none hover:ring-2 hover:ring-blue-500' placeholder='Enter your name here...' value={Userdata.name} onChange={UserecordHandler} />
                </div>
                <div className='p-2'>
                    <label htmlFor="age" className=' block mb-2'>User Age</label>
                    <input type="number" name='age' id='age' className=' border border-gray-300 rounded-sm py-1 px-2 w-full  outline-none hover:ring-2 hover:ring-blue-500' placeholder='Enter your age here...' value={Userdata.age} onChange={UserecordHandler}/>
                </div>
                <div className='p-2'>
                    <label htmlFor="city" className=' block mb-2'>User City</label>
                    <input type="text" name='city' id='city' className=' border border-gray-300 rounded-sm py-1 px-2 w-full outline-none hover:ring-2 hover:ring-blue-500' placeholder='Enter your city here...' value={Userdata.city}  onChange={UserecordHandler} />
                </div>

                <div className='p-2'>
                    <button className=' text-sm border border-blue-500 py-1 px-5 rounded-sm bg-blue-500 text-white cursor-pointer hover:bg-blue-400 transition' onClick={AddUserRecords}> {Userdata.id?"Update record":"Add record"}</button>
                </div>

              </div>

             </div>
           </div> 
        )
     }
    </div>
</>
    
  )
}
