import React from 'react'
import { useAuth } from '../../auth/AuthContext'
import { useQuery } from '@tanstack/react-query';
import moviesApi from '../../api/axiosConfig';

const Profile = () => {
    const { token } = useAuth();
    console.log(token);
    
    const {isPending, error, data} = useQuery({
        queryKey: ['profile'], 
        queryFn: async()=> moviesApi.get('auth/getMyProfile',{headers:{
            "Authorization": `Bearer ${token}` 
        }
        })
    });
    if (isPending) {
        return (
            <h1>loading...</h1>
        )
        
    }
    if (error) {
        console.log(error);
        return (
            <h1>error connecting to server</h1>
            
            
        )
        
    }
    console.log(data.data);
    
  return (
    <div>
        <h1>success</h1>
    </div>
  )
}

export default Profile