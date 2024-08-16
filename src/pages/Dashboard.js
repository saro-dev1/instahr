import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if userId is present in localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/'); // Redirect to home if userId is not present
        }
    }, [navigate]);

    return (
        <div className="p-6 bg-purple-100 h-full">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="flex justify-between space-x-4">
                {/* Rectangle 1 */}
                <div className="w-1/4 h-96 pup rounded-lg shadow-md flex justify-center text-white">
                    <div className='my-2 pup2 p-2 rounded h-10 w-full mx-2'>
                    <p>Follow Up</p>
                    </div>
                </div>

                {/* Rectangle 2 */}
                <div className="w-1/4 h-96 pup rounded-lg shadow-md flex  justify-center text-white">
                    <div className='my-2 pup2 p-2 rounded h-10 w-full mx-2'>
                    <p>Open Tasks</p>
                    </div>
                </div>

                {/* Rectangle 3 */}
                <div className="w-1/4 h-96 pup rounded-lg shadow-md flex  justify-center text-white">
                    <div className='my-2 pup2 p-2 rounded h-10 w-full mx-2'>
                    <p>Contact Made</p>
                    </div>
                </div>

                {/* Rectangle 4 */}
                <div className="w-1/4 h-96 pup rounded-lg shadow-md flex  justify-center text-white">
                   <div className='my-2 pup2 p-2 rounded h-10 w-full mx-2'>
                    <p>Rejected</p>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
