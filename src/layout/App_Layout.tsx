import { Outlet } from "react-router-dom";

const App_Layout = () => {
  return (
    <section className=" min-h-[100vh] flex flex-col justify-between">
      <div>nav</div>
      <div className="flex-1">
        <Outlet />
      </div>
    </section>
  );
};

export default App_Layout;
