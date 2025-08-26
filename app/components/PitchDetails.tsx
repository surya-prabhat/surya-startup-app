import { PortableText, PortableTextBlock } from "@portabletext/react";
import "./PitchDetails.css"

interface PitchDetailsProps {
    pitchDetails: PortableTextBlock[]
}

function PitchDetails({pitchDetails}: PitchDetailsProps) {
    return ( 
        <div className="pitch-details">
            <h1 className="pitch-heading">Pitch Details</h1>
            <PortableText value={pitchDetails}></PortableText>
        </div>
     );
}

export default PitchDetails;