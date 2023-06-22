'use client';
import Footer from '../footer'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';


const carsListPage = () => {
    const router = useRouter();

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams[0]);

    type Car = {
        id: number;
        brand: string;
        model: string;
        year: number;
        color: string;
        pricePerDay: number;
        fuelType: number;
        isAvailable: boolean;
    }

    interface car {
        brand: string;
        model: string;
        year: number;
        color: string;
        fuelType: number;
        pricePerDay: number;
    }

    const [cars, setCars] = useState<Car[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const startDate = params.get('startDate');
        const endDate = params.get('endDate');
        const fuelType = params.get('fuelType');

        console.log(`[startDate]: ${startDate} | [endDate]: ${endDate} | [fuelType]: ${fuelType}`);

        if (startDate !== null && endDate !== null && fuelType !== null)
            getAvailableCars(startDate, endDate, Number(fuelType));
        else
            setError(`Przepraszamy! Wystąpił błąd podczas pobierania danych [UseEffect Error]: ${startDate} | ${endDate} | ${fuelType}`);
    }, []);

    const getAvailableCars = async (start: string, end: string, fuel: number) => {
        try {
            const response = await fetch(`http://localhost:5192/api/Car/GetAvailableCarsByDateRange?startDate=${start}&endDate=${end}`);
            const data = await response.json();
            setCars(data);
        } catch (error) {
            setError('Przepraszamy! Wystąpił błąd podczas pobierania danych [' + error + ']');
            console.log(`[getAvailableCars:ERROR]: ${error}`);
        }
    }

    function getFuelType(fuelType: number) {
        switch (fuelType) {
            case 0:
                return 'Benzyna'; //Petrol
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

    function GetCarImage(brand: string, model: string, callback: (imgUrl: string) => void) {
        const imgUrl = `./cars-img/${brand}.${model}.img.png`;

        const img = new Image();

        img.onload = function () {
            callback(imgUrl);
        }

        img.onerror = function () {
            callback('./cars-img/unknownCar.jpg');
        }

        img.src = imgUrl;
    }

    function moveToHomePage() {
        router.push('/');
    }

    function CarItem({ car }: { car: car }) {
        const [carImageUrl, setCarImageUrl] = useState<string | null>(null);

        useEffect(() => {
            GetCarImage(car.brand, car.model, (imageUrl) => {
                setCarImageUrl(imageUrl);
            });
        }, [car.brand, car.model]);

        return (
            <div className="flex flex-col opacity-90 bg-white shadow-md rounded p-8 m-8">
                <img className="w-full h-64 rounded" alt={car.brand} src={carImageUrl || './cars-img/unknownCar.jpg'} />
                <div className="mt-8 text-center">
                    <h2 className="text-xl font-bold text-gray-600">{car.brand} {car.model}</h2>
                    <p className="text-sm text-gray-700">
                        Rok produkcji: {car.year == 2023 ? <span className='font-bold text-red-900'>{car.year} | NOWOŚĆ!</span> : <span className='font-bold'>{car.year}</span>}
                    </p>
                    <p className="text-sm text-gray-700">
                        Kolor: <span className="font-bold">{car.color}</span>
                    </p>
                    <p className="text-sm text-gray-700">
                        Cena za dobę: <span className="font-bold">{car.pricePerDay}zł</span>
                    </p>
                    <p className="text-sm text-gray-700">
                        Rodzaj paliwa: <span className="font-bold">{getFuelType(car.fuelType)}</span>
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mg-2">Wypożycz</button>
                </div>
            </div>

        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mg-2' onClick={moveToHomePage}>Wróć do strony głównej!</button>
                <h1 className='text-4xl text-center font-bold mt-8 mb-8'>Dostępne samochody</h1>
                {error ? (
                    <div className="bg-red-500 text-center text-white p-4 rounded">{error}</div>
                ) : (
                    <div className="flex flex-wrap justify-center">
                        {cars.map((car, index) => (
                            <CarItem key={index} car={car} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default carsListPage;


