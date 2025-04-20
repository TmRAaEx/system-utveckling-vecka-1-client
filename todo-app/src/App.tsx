
import {fileRouter} from "@tmraaex/simpleframework";
import {RouterProvider} from "react-router";

export default function App() {
    return (
        <div className="App">
            <main className="px-3 py-5">
                <RouterProvider router={fileRouter}/>
            </main>
        </div>
    );
}
