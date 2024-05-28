'use client'; 

import React, { useEffect, useState } from 'react';
import StagesList from './_components/stages-list';
import AddButton from './_components/add-button';
import { getAllStages } from '@/actions/data-load';

const StagesPage = () => {
    const [stages, setStages] = useState([]);

    useEffect(() => {
        fetchData();
    }, []); 

    const fetchData = async () => {
        const data = await getAllStages();
        if (data) {
            setStages(data);
        }
    };

    const handleSuccess = () => {
        fetchData(); 
    };
    
    return ( 
        <>
            <div className="flex flex-col">
                <div className="ml-5">
                    <AddButton onSuccess={handleSuccess} />
                </div>
                <div>
                    <StagesList data={stages} onSuccess={handleSuccess} />
                </div>
            </div>
        </>
    );
}

export default StagesPage;