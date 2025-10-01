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
    <div className="flex flex-col items-center justify-between h-full w-full">
      <div className="flex-grow flex items-center justify-center w-full overflow-hidden">
        {isLoading ? (
            <div className="flex justify-center items-center h-full">
                <p>Loading...</p>
            </div>
        ) : (
            dogImage && <img src={dogImage} alt="Random dog" className="max-w-full max-h-[140px] object-contain" />
        )}
      </div>
      <div className="w-full mt-4 flex justify-center">
        <button 
          onClick={fetchDogImage}
          className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
          disabled={isLoading}
        >
          {isLoading ? 'Fetching...' : 'Fetch New Dog'}
        </button>
      </div>
    </div>
  );
}
export default DogAxios;