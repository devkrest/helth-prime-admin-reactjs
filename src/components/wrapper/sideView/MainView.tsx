import { Outlet } from "react-router-dom";
import HeaderView from "./header/HeaderView";
import { motion } from "framer-motion";

function MainView({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="h-screen w-full flex flex-col relative ">
      <HeaderView setOpen={setOpen} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex-1 overflow-auto p-4"
      >
        <div className="h-full w-full">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
}

export default MainView;
