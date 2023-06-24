'use client';

import React, { useEffect, useState } from 'react';

interface Vehicle {
    id: number;
    brand: string;
    model: string;
    year: number;
    color: string;
    pricePerDay: number;
    fuelType: number;
    isAvailable: boolean;
}

function VehicleList() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [showAddVehicleForm, setShowAddVehicleForm] = useState<boolean>(false);
    const [brand, setBrand] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [year, setYear] = useState<number>(2020);
    const [color, setColor] = useState<string>('');
    const [pricePerDay, setPricePerDay] = useState<number>(1);
    const [fuelType, setFuelType] = useState<number>(0);
    const [isAvailable, setIsAvailable] = useState<boolean>(false);
    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await fetch('http://localhost:5192/api/Car/GetAllCars');
            const data = await response.json();
            setVehicles(data);
        } catch (error) {
            console.log('Wystąpił błąd podczas pobierania danych z API:', error);
        }
    };

    function getFuelType(fuelType: number) {
        switch (fuelType) {
            case 0:
                return 'Benzyna (95/98)'; //Petrol
            case 1:
                return 'Diesel'; //Diesel
            case 2:
                return 'Elektryczny'; //Electric
            case 3:
                return 'Hybryda'; //Hybrid
            default:
                return 'Benzyna';
        }
    }

    const handleEdit = (vehicleId: number) => {
        // Obsłuż akcję edycji dla pojazdu o określonym ID
    };

    const handleDelete = (vehicleId: number) => {

        // usuwanie pojazdu za pomocą api
        fetch(`http://localhost:5192/api/Car/DeleteCar?id=${vehicleId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(() => {
            // usuwanie pojazdu z listy
            setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== vehicleId));
        }).catch((error) => {
            console.log('Wystąpił błąd podczas usuwania pojazdu:', error);
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Zapobieganie przeładowaniu strony po wysłaniu formularza

        const newVehicle = {
            id: vehicles.length + 1, // dla uproszczenia, ale najlepiej użyć unikalnego generatora ID
            brand,
            model,
            year,
            color,
            pricePerDay,
            fuelType,
            isAvailable,
        };
        console.log('Nowy pojazd:', newVehicle);
        // Dodawanie pojazdu za pomocą api
        fetch('http://localhost:5192/api/Car/AddCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newVehicle)
        }).then(() => {
            console.log('Pojazd został dodany');
        }).catch((error) => {
            console.log('Wystąpił błąd podczas dodawania pojazdu:', error);
        }).finally(() => {
            setVehicles(prevVehicles => [...prevVehicles, newVehicle]); // Dodawanie nowego pojazdu do listy
        });

        setShowAddVehicleForm(false); // Zamknięcie formularza po dodaniu pojazdu
        resetForm(); // Resetowanie formularza
    }

    const resetForm = () => {
        setBrand('');
        setModel('');
        setYear(2020);
        setColor('');
        setPricePerDay(1);
        setFuelType(0);
        setIsAvailable(false);
    }

    return (
        <div className="flex flex-wrap justify-center">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded mb-4" onClick={() => setShowAddVehicleForm(prevState => !prevState)}> Dodaj nowy pojazd </button>
            {showAddVehicleForm && (
                <div className="bg-white shadow-md rounded p-4 mb-4 w-64 text-zinc-400">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Marka:
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text" value={brand} onChange={e => setBrand(e.target.value)} />
                        </label>
                        <label>
                            Model:
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text" value={model} onChange={e => setModel(e.target.value)} />
                        </label>
                        <label>
                            Rok produkcji:
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number" min={2010} value={year} onChange={e => setYear(Number(e.target.value))} />
                        </label>
                        <label>
                            Kolor:
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text" value={color} onChange={e => setColor(e.target.value)} />
                        </label>
                        <label>
                            Cena za dzień:
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number" min={1} value={pricePerDay} onChange={e => setPricePerDay(Number(e.target.value))} />
                        </label>
                        <label>
                            Typ paliwa:
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text" value={fuelType} onChange={e => setFuelType(Number(e.target.value))} />
                        </label>
                        <label>
                            Dostępny:
                            <input className="mr-2 leading-tight" type="checkbox" checked={isAvailable} onChange={e => setIsAvailable(e.target.checked)} />
                        </label>
                        <div className="flex justify-end mt-2">
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={() => setShowAddVehicleForm(prevState => !prevState)}> Anuluj </button>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Dodaj pojazd
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white shadow-md rounded p-4 mb-4 w-64 text-zinc-400">
                    <h2 className="text-lg font-bold text-zinc-500">{vehicle.id}. {vehicle.brand} {vehicle.model}</h2>
                    <p>Rok produkcji: {vehicle.year}</p>
                    <p>Kolor: {vehicle.color}</p>
                    <p>Cena za dzień: {vehicle.pricePerDay}</p>
                    <p>Typ paliwa: {getFuelType(vehicle.fuelType)}</p>
                    <p>Dostępny: {vehicle.isAvailable ? 'Tak' : 'Nie'}</p>
                    <div className="flex justify-end mt-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => handleEdit(vehicle.id)}
                        >
                            Edytuj
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDelete(vehicle.id)}
                        >
                            Usuń
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default VehicleList;
