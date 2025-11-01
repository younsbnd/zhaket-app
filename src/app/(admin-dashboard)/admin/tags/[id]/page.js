import EditProductTagLogic from '@/components/admin/tags/[id]/EditProductCategoryLogic';
import React from 'react';

export const generateMetadata = () => {
    return {
        title: "ویرایش تگ",
        description: "ویرایش تگ",
    };
};

const EditProductTagPage = () => {
    return (
        <div>
            <EditProductTagLogic/>
        </div>
    );
};

export default EditProductTagPage;