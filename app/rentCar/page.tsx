'use client';
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Footer from '../footer'
const rentCar = () => {
    const [startDateRent, setStartDateRent] = useState<string | null>(null);
    const [carInfo, setCarInfo] = useState<any>(null);
    const [endDateRent, setEndDateRent] = useState<string | null>(null);
    const [carId, setCarId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        const startDate = params.get('startDate');
        const endDate = params.get('endDate');
        const carId = params.get('carId');
        console.log(`[startDate]: ${startDate} | [endDate]: ${endDate} | [carId]: ${carId}`);
        setStartDateRent(startDate);
        setEndDateRent(endDate);
        setCarId(Number(carId));
        getInfoAboutCar(Number(carId));
    }, []);

    const getInfoAboutCar = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5192/api/Car/${id}`);
            const data = await response.json();
            setCarInfo(data);
        } catch (error) {
            setError(`Przepraszamy! Wystąpił błąd podczas pobierania danych [getInfoAboutCar Error]: ${error}`);
        }
    }

    const sendDataRentCar = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const name = (event.target as any).name.value;
        const lastname = (event.target as any).lastname.value;
        const email = (event.target as any).email.value;

        const rentalData = {
            carId: carInfo.id,
            startDate: startDateRent,
            endDate: endDateRent,
            userId: 1,
            customerFirstName: name,
            customerLastName: lastname,
            customerEmail: email,
        };
        console.log(rentalData);
        try {
            const response = await fetch(`http://localhost:5192/api/Rental/AddRental`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rentalData)
            });
            if (response.ok) {
                setSuccess("Pomyślnie zarezerwowano pojazd! Wkrótce skontaktuje się z Tobą nasz pracownik w celu potwierdzenia rezerwacji.");
            }
            else if (response.status == 500)
                setError(`Przepraszamy! Pojazd jest zajęty w tej dacie. Prosimy o wybranie innej daty.`);

        }
        catch (error) {
            setError(`Przepraszamy! Wystąpił błąd podczas wysyłania danych [sendDataRentCar Error]: ${error}`);
        }
    };

    const moveToHomePage = () => {
        router.push('/');
    }

    return (
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
            <button onClick={moveToHomePage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">Powrót do strony głównej</button>
            {carInfo &&
                <>
                    <h2 className="text-2xl font-semibold text-zinc-300 my-4">Rezerwujesz pojazd: [{carInfo.id}] {carInfo.brand} {carInfo.model}</h2>
                    <p className="mb-4 text-zinc-300"><b>Termin:</b> {startDateRent} - {endDateRent}</p>
                    <form onSubmit={sendDataRentCar} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            <span>Imię:</span>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required type="text" name="name" />
                        </label>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            <span>Nazwisko:</span>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required type="text" name="lastname" />
                        </label>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            <span>Email:</span>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required type="email" name="email" />
                        </label>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            <span>Miasto:</span>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required type="text" name="city" />
                        </label>
                        <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" type="submit" value="Wyślij" />
                    </form>
                </>}
            {error && <p className="bg-red-200 text-red-700 p-4 rounded-md text-center font-bold">{error}</p>}
            {success && <p className="bg-green-200 text-green-700 p-4 rounded-md text-center font-bold">{success}</p>}
            <Footer />
        </div>
    )
}

export default rentCar;