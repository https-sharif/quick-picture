import React, { useEffect, useState } from "react";
import Form from './Form';
import ImageCanvas from "./Images";
import User from "./User";
import './index.css';

type UserType = {
    name: string;
    username: string;
    bio: string;
    profile_image : {
        small: string;
        medium: string;
        large: string;
    };
    instagram_username: string;
    twitter_username: string;
    links: {
        self: string;
        html: string;
        photos: string;
        likes: string;
        portfolio: string;
        following: string;
        followers: string;
    };
} | null;

type PhotoResult = {
    urls: {
        regular: string;
    };
    location?: {
        name?: string;
        city?: string;
        country?: string;
        position?: {
            latitude: number;
            longitude: number;
        };
    };
    user: UserType;
};

type UnsplashResponse = {
    results?: PhotoResult[];
    user?: UserType;
} | PhotoResult[];

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [images, setImages] = useState<{ url: string }[]>([]);
    const [queryType, setQueryType] = useState<string>('');
    const [user, setUser] = useState<UserType>(null);
    const [haveImages, setHaveImages] = useState<boolean>(true);
    const [pages, setPages] = useState<number>(1);
    const [previousPrompt, setPreviousPrompt] = useState<string>('');

    useEffect(() => {
        setError(null);
    }, [queryType]);

    

    const selectUrl = () => {
        const API_URL = import.meta.env.VITE_UNSPLASH_API_URL;
        const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
        switch (queryType) {
            case 'random':
                return API_URL + '/photos/random' + '?count=10&client_id=' + ACCESS_KEY ;
            case 'user':
                return API_URL + '/users/' + prompt + '/photos' + '?client_id=' + ACCESS_KEY;
            default:
                return API_URL + '/search/photos?query=' + prompt + '&client_id=' + ACCESS_KEY;
        }
    }

    const fetchUser = (response : UnsplashResponse) => {
        try {
            console.log('User:', response);
            if(Array.isArray(response) && response.length > 0){
                setUser(response[0].user);
                return;
            }
            setUser(null);
        } catch (error) {
            setUser(null);
            console.error('Error in fetchUser:', error);
            setError(`An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    
    const formatResult = (response: UnsplashResponse) => {

        switch (queryType) { 
            case 'random':
                setUser(null);
                if(Array.isArray(response)) {
                    return response.map((item) => ({ url: item.urls.regular }));
                }
                break;
            case 'user':
                fetchUser(response);
                if(Array.isArray(response)) {
                    fetchUser(response);
                    return response.map((item) => ({ url: item.urls.regular }));
                }
                break;
            case '':
                setUser(null);
                if (Array.isArray(response)) {
                    return response.map((item) => ({ url: item.urls.regular }));
                } else if (response.results) {
                    return response.results.map((item) => ({ url: item.urls.regular }));
                } else {
                    throw new Error('Unexpected response format');
                }
            break;
            default:
                return [];
        }
    };

    const handleFetchImages = async () => {
        if(previousPrompt !== prompt){
            setImages([]);
            setPreviousPrompt(prompt);
        }
        setError(null);
        setLoading(true);
        setHaveImages(true);
        try {
            const requestUrl = selectUrl();

            const response = await fetch(requestUrl).then((res) => res.json());
            const result = formatResult(response) as { url: string }[];

            console.log('Result:', result);
            setHaveImages(result.length > 0);
            setImages(result);

        } catch (error) {
            console.error('Error in handleFetchImages:', error);
            setError(`An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setLoading(false);
        }
    }

    const getMoreImages = async () => {
        setPrompt(previousPrompt);
        setPages(pages => pages + 1);
        setLoading(true);
        try {
            const requestUrl = selectUrl() + '&page=' + pages;
            const response = await fetch(requestUrl).then((res) => res.json());
            const result = formatResult(response) as { url: string }[];

            console.log('Result:', result);


            setHaveImages(preloadImages.length > 0);

            const preloadedImages = await preloadImages(result);
            setImages([...images, ...preloadedImages]);

        } catch (error) {
            console.error('Error in getMoreImages:', error);
            setError(`An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setLoading(false);
        }
    }

    const preloadImages = (imageArray: { url: string }[]) => {
        return new Promise<{ url: string }[]>((resolve, reject) => {
            const loadedImages: { url: string }[] = [];
            let loadedCount = 0;
    
            imageArray.forEach((imageData, index) => {
                const img = new Image();
                img.src = imageData.url;
    
                img.onload = () => {
                    loadedImages[index] = imageData;
                    loadedCount++;
    
                    if (loadedCount === imageArray.length) {
                        resolve(loadedImages);
                    }
                };
    
                img.onerror = (err) => {
                    reject(`Image failed to load: ${err}`);
                };
            });
        });
    };
    

    const handleClick = () => {
        if (prompt.trim() === '') {
            setError('Error! Prompt cannot be empty!');
        } else if (prompt.length > 100) {
            setError('Prompt input cannot exceed 100 characters.');
        } else {
            handleFetchImages();
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleClick();
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setError(null);
        setPrompt(event.target.value);
    }

    return (
        <div className="flex flex-col items-center justify-center no-scrollbar">
            <Form 
                prompt={prompt} 
                onInputChange={handleInputChange}
                loading={loading} 
                handleClick={handleClick}
                handleKeyPress={handleKeyPress}
                error={error}
                queryType={queryType}
                setQueryType={setQueryType}
            />

            {user !== null &&
                <User   name={user.name}
                        username={user.username}
                        bio={user.bio}
                        profile_image={user.profile_image}
                        instagram_username={user.instagram_username}
                        links={user.links}
                        twitter_username={user.twitter_username}
                        />

            }

            <ImageCanvas images={images} haveImages={haveImages} />

            {images.length > 0 && <button onClick={getMoreImages} disabled={loading} className="w-28 rounded-2xl text-white font-bold h-12 bg-[#386FA4] active:bg-[#2b5680] disabled:opacity-50 mb-40">More</button>}

        </div>
    );
}

export default App;
