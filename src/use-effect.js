import React from "react";
import { useState,useEffect } from "react";

const URL = "https://jsonplaceholder.typicode.com/users"

function Api(){
    const [userData,setUserData] = useState([]);

    const [loading,setLoading] = useState(false);

    const [isError,setIsError] =useState({status: false,msg: ""});

    const Fetchdata = async (ApiUrl)=>{
        setLoading(true)
        setIsError({status: false,msg: ""})
        try {
            const response = await fetch(ApiUrl);
            const data = await response.json();
            setUserData(data)
            setLoading(false)
            setIsError({status: false,msg: ""})
        } catch (error) {
            setLoading(true)
            setIsError({status: true,msg: "Something Went Wrong , Please Try Again Later"})
        }
    }
    useEffect(()=>{
        Fetchdata(URL)
    },[])

    if(isError?.status){
        return(
            <div className="error-tag"><h2>{isError.msg}</h2></div>
        )
    }
    return( 
        <div>
            <h2 className="main-heading">User Data Fretch From API</h2>
            <hr/>
            {
                loading ? <div className="loading-tag"><h2>Loading.....</h2></div> : 
                <ul>
            {
                userData.map((eachUser)=>{
                    const {id,name,username,email,phone} = eachUser;
                    return(
                        <li key={id}>
                            <p>Name : {name}</p>
                            <p>User Name : {username}</p>
                            <p>User Email : {email}</p>
                            <p> User Phone : {phone}</p>
                        </li>
                    )
                })
            }
            </ul>
            }
        </div>
    )
}
export default Api;