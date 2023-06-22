'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Footer from './footer'

export default function Home() {
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [fuelType, setFuelType] = useState('10');

  const moveToCarsListPage = () => {
    if (startDate && endDate && checkIsDateValid(startDate, endDate)) {
      console.log(`[MainPage]: ${startDate} | ${endDate} | ${fuelType}`);
      router.push(`/carsList?startDate=${startDate}&endDate=${endDate}&fuelType=${fuelType}`);
    } else {
      alert('Wypełnij poprawnie wszystkie pola! Data początkowa nie może być późniejsza niż data końcowa!');
    }
  }

  const moveToAdminLoginPage = () => {
    router.push('/login');
  }

  const checkIsDateValid = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    if (start > end || start < today || end < today) {
      return false;
    }

    return true;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-hero-pattern" >
      <div className="w-full bg-black bg-opacity-40 absolute inset-0">
        <div className="flex flex-col h-screen justify-between">
          <div className='flex justify-end'>
            <button onClick={moveToAdminLoginPage} className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 border border-red-200 rounded">
              Logowanie administratora
            </button>
          </div>
          <div className="max-w-xs mx-auto">
            <form className="bg-sky-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start-date">
                  Data początkowa
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="start-date"
                  type="date"
                  placeholder="Data początkowa"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end-date">
                  Data końcowa
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="end-date"
                  type="date"
                  placeholder="Data końcowa"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="mb-8">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fuelType">
                  Rodzaj paliwa
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setFuelType(e.target.value)}>
                  <option value={10}>dowolne</option>
                  <option value={0}>benzyna </option>
                  <option value={1}>diesel</option>
                  <option value={2}>elektryczny ⚡🍃</option>
                  <option value={3}>hybryda ⚡🍃</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button" onClick={moveToCarsListPage}>
                  Sprawdź dostępność
                </button>
              </div>
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </main>
  )
};
