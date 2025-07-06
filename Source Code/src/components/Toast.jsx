import { Alert } from "@material-tailwind/react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

export const Toast = ({ open, type, message, onClose }) => {
  const color = {
    success: "green",
    error: "red",
    warning: "amber",
  }[type || "success"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed top-4 right-4 z-[9999]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
        >
          <Alert color={color} onClose={onClose} className="shadow-md max-w-sm">
            {message}
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning"]),
  message: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
