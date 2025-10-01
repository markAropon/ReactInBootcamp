import axios from 'axios';
import { useState, useEffect, type SetStateAction } from 'react';

function DogAxios() {
    const [dogImage, setDogImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchDogImage = () => {
        setIsLoading(true);
        axios.get<{ message: string; status: string }>('https://dog.ceo/api/breeds/image/random')
            .then((response: { data: { message: SetStateAction<string>; }; }) => {
                setDogImage(response.data.message);
            })
            .catch((error: any) => {
                console.error('Error fetching dog image:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchDogImage();
    }, []);

  return (
    <>
    <div className="mb-4">
        {isLoading ? (
            <div className="flex justify-center items-center h-[300px]">
                <p>Loading...</p>
            </div>
        ) : (
            dogImage && <img src={dogImage} alt="Random dog" className="max-w-[300px] max-h-[300px] object-contain mx-auto" />
        )}
    </div>
      <button 
        onClick={fetchDogImage}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        disabled={isLoading}
      >
        {isLoading ? 'Fetching...' : 'Fetch New Dog'}
      </button>
    </>
  );
}
export default DogAxios;