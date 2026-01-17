import React, { useState, useEffect } from 'react';
import AccountLayout from '../components/AccountLayout';
import { userService } from '../services/userService';
import { Camera } from 'lucide-react';

const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await userService.getProfile();
            setUser(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            await userService.updateProfilePic(formData);
            fetchProfile(); // Refresh to show new image from S3
        } catch (err) {
            alert("Failed to upload image");
        }
    };

    if (loading) return <div className="p-20 text-center">Loading Profile...</div>;

    return (
        <AccountLayout>
            <div className="profile-section">
                <h2 className="text-xl font-bold">Personal Information</h2>

                {/* Profile Picture Section */}
                <div className="flex items-center gap-8 mb-10">
                    <div className="profile-pic-wrapper">
                        <img
                            src={user.profile?.profile_picture || 'https://via.placeholder.com/150'}
                            alt="avatar"
                            className="w-full h-full object-cover"
                        />
                        <label className="profile-pic-overlay">
                            <Camera size={24} />
                            <input type="file" hidden onChange={handleFileChange} />
                        </label>
                    </div>
                    <div>
                        <p className="text-lg font-bold">{user.first_name} {user.last_name}</p>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>

                {/* Info Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="profile-input-group">
                        <label className="profile-label">First Name</label>
                        <input
                            type="text"
                            defaultValue={user.first_name}
                            disabled={!editMode}
                            className={`fk-input ${!editMode && 'bg-gray-50 cursor-not-allowed'}`}
                        />
                    </div>
                    <div className="profile-input-group">
                        <label className="profile-label">Last Name</label>
                        <input
                            type="text"
                            defaultValue={user.last_name}
                            disabled={!editMode}
                            className={`fk-input ${!editMode && 'bg-gray-50 cursor-not-allowed'}`}
                        />
                    </div>
                    <div className="profile-input-group">
                        <label className="profile-label">Your Gender</label>
                        <div className="flex gap-6 mt-2">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="gender" checked={user.profile?.gender === 'Male'} disabled={!editMode} /> Male
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="gender" checked={user.profile?.gender === 'Female'} disabled={!editMode} /> Female
                            </label>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setEditMode(!editMode)}
                    className="profile-btn-save uppercase"
                >
                    {editMode ? 'Save Information' : 'Edit Profile'}
                </button>
            </div>
        </AccountLayout>
    );
};

export default ProfilePage;