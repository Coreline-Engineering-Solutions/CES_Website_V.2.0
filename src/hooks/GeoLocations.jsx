import { useState, useEffect } from 'react';

const geolocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: ""},
        error: null,
    });

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: { lat: location.coords.latitude, lng: location.coords.longitude },
            error: null,
        });
    };

    const onError = (error) => {
        setLocation({
            loaded: true,
            error,
        });
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }
    }, []);

    return location;
};

export default geolocation;
