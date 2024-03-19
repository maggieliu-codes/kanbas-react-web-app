import ModuleList from "../Modules/List";
import Status from "./Status";

function Home() {
  return (
    <div className="row">
      <div className="col">
        <ModuleList />
      </div>
      <div className="col-lg-4 col-xl-4 col-xxl-4 d-none d-xl-block">
        <Status />
      </div>
    </div>
  );
}
export default Home;
