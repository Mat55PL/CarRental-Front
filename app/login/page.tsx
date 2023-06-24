'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function login() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setError(null);
        const response = await fetch(`http://localhost:5192/api/User/GetUserByUserNameAndPasswordAsync?userName=${username}&password=${password}`);
        console.log(`Response status: ${response.status}`)
        if (response.status === 204) {
            setError("Niepoprawne dane logowania!");
            return;
        };
        const data = await response.json();
        router.push(`/admin?name=${data.userName}&rank=${data.rank}`);
    };

    const moveToHomePage = () => {
        router.push(`/`);
    }

    return (
        <div className="flex items-center justify-center h-screen bg-zinc-800">
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mg-2' onClick={moveToHomePage}>Wróć do strony głównej!</button>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
                {error ? (
                    <div className="bg-red-500 text-center text-white p-4 rounded">{error}</div>
                ) : null}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Nazwa użytkownika
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Hasło
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Zaloguj się
                    </button>
                </div>
            </form>
        </div>
    );
}

export default login;
