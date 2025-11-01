import EditUserLogic from '@/components/admin/users/edit/EditUserLogic';
import React from 'react';

export const generateMetadata = () => {
    return {
        title: "ویرایش کاربر",
        description: "ویرایش کاربر",
    };
};

const page = () => {
    return (
        <div>
            <EditUserLogic/>
        </div>
    );
};

export default page;