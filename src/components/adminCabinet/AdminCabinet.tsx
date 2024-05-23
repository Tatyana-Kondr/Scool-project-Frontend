import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { deleteUser, getUsers, selectUsers } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';


export default function AdminCabinet() {

    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUsers);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    
    const handleDeleteUser = (userId: number) => {
        dispatch(deleteUser(userId));
        console.log("thdjhtgyj")
    };
  
    return (
        <div>
            <h1>Admin Cabinet</h1>
            <h2>Users List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <div>
                            <Link to={`/user/${user.login}/pets`}>  {user.login}  </Link>  
                            <span>  {user.fullName}  </span>
                            <span>  {user.email}  </span>
                        </div>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate(-1)}> Back </button>
        </div>
    )
}
