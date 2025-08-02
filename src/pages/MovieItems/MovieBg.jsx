import { useMemo } from "react"
import {useParams} from "react-router-dom";

const MovieBg = () => {
    const { movieId } = useParams();

    const randomImage = useMemo(() => {
        const images = [
            { src: "/ryu.png", alt: "ninja" },
            { src: "/bolter.png", alt: "bolter" }
        ]
        return images[Math.floor(Math.random() * images.length)]
    }, [movieId])

    return (
        <div className="bg-mv-container pointer-events-none">
            <img src={randomImage.src} alt={randomImage.alt} className="bg-mv-image" />
        </div>
    )
}

export default MovieBg
