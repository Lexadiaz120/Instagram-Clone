import {  useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Photo from "../../components/Photo/Photo.js"

const PhotoPage = () => {

    const { id } = useParams();
    const [photo, setPhoto] = useState({});

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                
                const res = await fetch(`http://localhost:5000/photos/${id}`);

                const body = await res.json();

                if(res.ok){
                    setPhoto(body.data)
                } else {
                    throw new Error(body.message);
                }

            } catch (error) {
                alert(error.message)
            }
        };
        fetchPhoto();
    }, [id]);

    return (
        <section>
            { Object.keys(photo).length > 0 && <Photo photo={photo} /> }                                            
        </section>
    );
};

export default PhotoPage;