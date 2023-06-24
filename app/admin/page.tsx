"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import UserList from './UserList';
import VehicleList from './VehicleList';
import RentalList from './RentalList';

function admin() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');
    const rank = searchParams.get('rank');
    const [view, setView] = useState('');
    console.log(`User name: ${userName} + rank ${rank}`);

    function getUserRank(rank: number) {
        switch (rank) {
            case 1:
                return "Administrator";
            case 2:
                return "Pracownik";
            default:
                return "Nieznany";
        }
    }

    const handleSetView = (view: string) => {
        setView(view);
    }

    useEffect(() => {
        if (userName === null || rank === null) {
            router.push('/login');
        }
    }, []);

    const handleLogout = () => {
        router.push('/login');
    }

    return (
        <div className="h-screen w-full flex items-center justify-center bg-zinc-800">
            <button onClick={handleLogout} className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Wyloguj</button>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-gray-500 font-bold text-xl mb-2">Witaj, {userName}</h1>
                <p className="text-gray-700 text-base">Twoja ranga: {getUserRank(Number(rank))}</p>
                <div className="flex flex-wrap justify-between mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={() => handleSetView('users')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Przejdź do zarządzania użytkownikami
                    </button>
                    <button
                        onClick={() => handleSetView('vehicles')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Przejdź do zarządzania pojazdami
                    </button>
                    <button
                        onClick={() => handleSetView('rental')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Przejdź do zarządzania wynajmami
                    </button>
                </div>
                {view === 'users' && <UserList />}
                {view === 'vehicles' && <VehicleList />}
                {view === 'rental' && <RentalList />}
            </div>
        </div>
    );
}



export default admin;
