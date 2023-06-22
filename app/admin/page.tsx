import React from 'react';

function admin() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-200">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="font-bold text-xl mb-2">Panel administratora</h1>
                <p className="text-gray-700 text-base">
                    Witaj w panelu administratora. Tutaj możesz zarządzać swoją stroną.
                </p>
                <div className="flex items-center justify-between mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Przejdź do zarządzania użytkownikami
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Przejdź do zarządzania pojazdami
                    </button>
                </div>
            </div>
        </div>
    );
}

export default admin;
