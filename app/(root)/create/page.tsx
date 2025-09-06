import CreateLeft from "@/app/components/CreateLeft";
import "./page.css"
import CreateRightForm from "@/app/components/CreateRightForm";
import { auth } from "@/app/auth";

async function Create() {

    const session = await auth()

    return (
        <main className="container-main-page">
            <div className="create-page">
                <CreateLeft />
                <CreateRightForm />
            </div>
        </main>

    );
}

export default Create;