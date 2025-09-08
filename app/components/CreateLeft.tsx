import ImageCard from "./ImageCard";
import "./CreateLeft.css"

function CreateLeft() {
    return (
        <div className="create-left">
            <div className="create-left-header">
                <h1 className="create-left-h1">It All Starts Here - With Your Aspirations</h1>
                <p className="create-left-p">Every great idea needs a place to take shape. This is where your next project begins. Share your vision, find your team, and get the support you need to turn your idea into a thriving reality.</p>
            </div>

            <div className="image-cards-create-page">
                <div className="image-holder-create-page">
                    <ImageCard
                        imageSrc="/joseph-menjivar-ihvIO4KPsTY-unsplash.jpg"
                        altText="Startup Desc image"
                    />

                    <ImageCard
                        imageSrc="/mika-baumeister-Y_LgXwQEx2c-unsplash.jpg"
                        altText="Startup Desc image"
                    />
                </div>

                <div className="image-holder-create-page">
                    <ImageCard
                        imageSrc="/lala-azizli-u0lBTIZgb-g-unsplash.jpg"
                        altText="Startup Desc image"
                    />

                    <ImageCard
                        imageSrc="/kit-formerly-convertkit-UxAyOE3i2Rw-unsplash.jpg"
                        altText="Startup Desc image"
                    />
                </div>

                <div className="image-holder-create-page">
                    <ImageCard
                        imageSrc="/cherful-positive-young-colleagues-using-laptop-computer.jpg"
                        altText="Startup Desc image"
                    />
                </div>
            </div>

            <div className="purple-grad-create-left"></div>
            <div className="yellow-grad-create-left"></div>

        </div>
    );
}

export default CreateLeft;