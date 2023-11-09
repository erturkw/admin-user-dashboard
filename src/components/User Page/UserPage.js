import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Create from '../Create Page/Create';
import UserUpdate from './UserUpdate';
import ChangePasswordModal from './ChangePasswordModal';


function UserPage() {

    const [data, setData] = useState([]);
    const [currentUserData, setCurrentUserData] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');


    const openChangePasswordModal = () => {
        setShowChangePasswordModal(true);
    };

    const closeChangePasswordModal = () => {
        setShowChangePasswordModal(false);
    };

    const handleChangePasswordClick = () => {
        openChangePasswordModal();
    };
    const openCreateModal = () => {
        setShowCreateModal(true);
    };

    const closeCreateModal = () => {
        setShowCreateModal(false);
    };


    const handleUpdateClick = (data) => {
        setCurrentUserData(data);
        setShowUpdate(true);
    };



    const token = localStorage.getItem('jwt');


    const loadData = () => {
        axios
            .get('http://127.0.0.1:8089/users/?skip=0&limit=100', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => setData(res.data))

    }

    useEffect(() => {
        loadData()
    }, [])


    const handleUpdate = (updatedData) => {
        const updatedDataIndex = data.findIndex((user) => user.id === updatedData.id);
        if (updatedDataIndex !== -1) {
            const newData = [...data];
            newData[updatedDataIndex] = updatedData;
            setData(newData);
        }
    };

    const handlePasswordChange = () => {
        axios.patch('http://127.0.0.1:8089/users/me/change-password', {
            oldPassword: oldPassword,
            newPassword: newPassword
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log('Şifre değişikliği başarılı.');
            })
            .catch((error) => {
                console.error('Şifre değişikliği başarısız oldu:', error);
            });
    }
    return (
        <div className="container mt-5 table-responsive-xxl">
            <div className='text-center border border-dark rounded-3 mb-5 border-3 bg-dark text-white list-u '>
                <h1>User List</h1>
            </div>
            <div className=" d-grid gap-2 d-md-flex justify-content-md-end">
                <button onClick={handleChangePasswordClick} className="fs-5 btn btn-secondary c-btn  mb-4">Change Password </button>
                <button onClick={() => handleUpdateClick(currentUserData)} className='fs-5 btn btn-success c-btn  mb-4'>Update</button>
                
                <button onClick={openCreateModal} className="fs-5 btn btn-primary c-btn  mb-4"> Create User </button>
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
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((data) =>
                            <tr key={data.id} >
                                <td className='col-1'>{data.id}</td>
                                <td className='col-3'>{data.first_name}</td>
                                <td className='col-3'>{data.last_name}</td>
                                <td className='col-1'>{data.age}</td>
                                <td className='col-3'>{data.email}</td>
                                <td className='col-1'>{data.role}</td>
                                <td>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                {showCreateModal && (
                    <Create
                        show={showCreateModal}
                        onClose={() => { closeCreateModal(); loadData(); }}
                        onUpdate={handleUpdate}

                    />
                )}
            </div>
            {showUpdate && (
                <UserUpdate
                    show={showUpdate}
                    onClose={() => setShowUpdate(false)}
                    data={currentUserData}
                    onUpdate={handleUpdate}
                />
            )}
            {showChangePasswordModal && (
                <ChangePasswordModal
                    show={showChangePasswordModal}
                    onClose={closeChangePasswordModal}
                    onPasswordChange={handlePasswordChange}
                    oldPassword={oldPassword}
                    newPassword={newPassword}
                    onOldPasswordChange={(e) => setOldPassword(e.target.value)}
                    onNewPasswordChange={(e) => setNewPassword(e.target.value)}
                    token={token} 
                />
            )}
        </div>
    )
}


export default UserPage;