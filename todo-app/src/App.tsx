
import {fileRouter} from "@tmraaex/simpleframework";
import {RouterProvider} from "react-router";

export default function App() {
    return (
        <div className="App">
                <RouterProvider router={fileRouter}/>
        </div>
    );
}
