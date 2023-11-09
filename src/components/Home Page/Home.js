import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Update from '../Update Page/Update';
import Create from '../Create Page/Create';
import ResetPasswordModal from './ResetPassword';

function Home() {


    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [idResetPassword, setIdResetPassword] = useState(0);

    const openResetPasswordModal = (id) => {
        setShowResetPasswordModal(true);
        setIdResetPassword(id);
    };

    const closeResetPasswordModal = () => {
        setShowResetPasswordModal(false);
    };

    const openCreateModal = () => {
        setShowCreateModal(true);
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
    };

    const handleUpdateClick = (data) => {
        setSelectedUser(data);
        setShowUpdate(true);
    };

    const token = localStorage.getItem('jwt');

    const loadData = () => {
        axios
            .get('http://127.0.0.1:8089/users/w?skip=0&limit=100', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => setData(res.data))
    }

    useEffect(() => {
        loadData();
    },[])

    const handleDeleteUser = (id) => {
        axios
            .delete(`http://127.0.0.1:8089/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    loadData();
                }
            })
    }

    const handleUpdate = (updatedData) => {
        const updatedDataIndex = data.findIndex((user) => user.id === updatedData.id);
        if (updatedDataIndex !== -1) {
            const newData = [...data];
            newData[updatedDataIndex] = updatedData;
            setData(newData);
        }
    };

    const handleResetPassword = () => {
        axios.patch(`http://127.0.0.1:8089/users/reset-password/${idResetPassword}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                console.log('Password reset:', response);
                closeResetPasswordModal();
            })
        .catch((error) => {
            console.error('Password reset error:', error);
        });
        console.log('Resetting password...');
    };

    return (

        <div className="container mt-5 table-responsive-xxl">
            <div className='text-center border border-dark rounded-3 mb-5 border-3 bg-dark text-white list-u '>
                <h1>User List</h1>
            </div>
            <div className=" d-grid gap-2 d-md-flex justify-content-md-end">
                <button onClick={openCreateModal} className="fs-5 btn  btn-dark c-btn  mb-4"> Create User </button>
            </div>
            <div className='w-full border border-5 border-dark rounded-3 tbl'>
                <table className="table table-dark table-hover table-striped w-full table-responsive">
                    <thead className='table-dark '>
                        <tr className=''>
                            <th className=''>ID</th>
                            <th className=''>First Name</th>
                            <th className=''>Last Name</th>
                            <th className=''>Age</th>
                            <th className=''>E-mail</th>
                            <th className=''>Role</th>
                            <th className=''>Salary</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((data) =>
                            <tr key={data.id} >
                                <td className='col-1'>{data.id}</td>
                                <td className='col-2'>{data.first_name}</td>
                                <td className='col-2'>{data.last_name}</td>
                                <td className='col-1'>{data.age}</td>
                                <td className='col-1'>{data.email}</td>
                                <td className='col-1'>{data.role}</td>
                                <td className='col-1'>{data.salary}</td>
                                <td className=''>
                                    <button onClick={() => handleDeleteUser(data.id)} className="btn btn-danger ms-2 ">Delete</button>
                                    <button onClick={() => handleUpdateClick(data)} className='btn btn-success ms-2'>Update</button>
                                    <button onClick={() => openResetPasswordModal(data.id)} className='btn btn-primary ms-2'>Res Pas</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
            </div>
            {showCreateModal && (
                <Create
                    show={showCreateModal}
                    onClose={() => { closeCreateModal(); loadData(); }}
                    onUpdate={handleUpdate}
                />
            )}
            {showUpdate && (
                <Update
                    show={showUpdate}
                    onClose={() => setShowUpdate(false)}
                    data={selectedUser}
                    onUpdate={handleUpdate} 
                />
            )}
            {showResetPasswordModal && (
                <ResetPasswordModal
                    show={showResetPasswordModal}
                    onClose={closeResetPasswordModal}
                    onResetPassword={handleResetPassword}
                />
            )}
        </div>
    )
}


export default Home