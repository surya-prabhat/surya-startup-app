import Image from "next/image"

interface StartupImageStackProps {
    imageUrls: {
        imageUrl: string,
        alt: string
    }[]
}

function StartupImageStack({imageUrls}: StartupImageStackProps) {
    return ( 
        <div className="image-stack">
            {imageUrls.map((image, index) => (
                image.imageUrl && (
                    <div>
                        <Image
                            src={image.imageUrl}
                            alt={image.alt}
                            width={80}
                            height={80}
                        />
                    </div>
                )
            ))}
        </div>
     );
}

export default StartupImageStack;