import CreateLeft from "@/app/components/CreateLeft";
import "./page.css"
import CreateRightForm from "@/app/components/CreateRightForm";

function Create() {
    return (
        <div className="create-page">
            <CreateLeft/>
            <CreateRightForm/>
        </div>

    );
}

export default Create;