import React from "react";
import { Drawer } from "@material-tailwind/react";
import logo from "../assets/image/green-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faBars,
  faChartLine,
  faCircleXmark,
  faEnvelopeOpenText,
  faKey,
  faPeopleGroup,
  faTableColumns,
  faUnlockKeyhole,
  faUserCheck,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

export function DrawerWithNavigation() {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      {/* Button to open the drawer */}
      <div className="relative z-10">
        <button onClick={openDrawer}>
          <FontAwesomeIcon icon={faBars} className="text-green-700 text-2xl m-3" />
        </button>
      </div>

      {/* Full-screen Drawer */}
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="fixed inset-0 z-10 bg-green-800"
        overlay={false}
      >
        {/* Drawer Header */}
        <div className="text-right pr-5">
          <button
            onClick={closeDrawer}
            className="text-white font-extrabold hover:text-green-600 transition-all"
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>
        <div className="mb-4 flex items-center justify-between p-4 bg-green-200 text-white">
          <img src={logo} alt="Logo" />
        </div>

        {/* Drawer Content */}
        <div className="px-4">
          <ul className="space-y-3">
            <li>
              <a
                href="/dashboard"
                className="block text-left px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200"
              >
                <FontAwesomeIcon icon={faTableColumns} className="mr-2" /> Dashboard
              </a>
            </li>
            <li>
              <a
                href="/sub-admin-list"
                className="block text-left px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200"
              >
                <FontAwesomeIcon icon={faUserTie} className="mr-2" /> Sub Admins
              </a>
            </li>
            <li>
              <a
                href="/all-users-list"
                className="block text-left px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200"
              >
                <FontAwesomeIcon icon={faPeopleGroup} className="mr-2" /> All Users
              </a>
            </li>
            <li>
              <a
                href="/upload-test-id"
                className="block text-left px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200"
              >
                <FontAwesomeIcon icon={faUnlockKeyhole} className="mr-2" /> Upload Test ID
              </a>
            </li>
            <li>
              <li>
                <a
                  href="/upload-result"
                  className="block text-left px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200"
                >
                  <FontAwesomeIcon icon={faChartLine} className="mr-2" /> Upload Result
                </a>
              </li>
            </li>
            <li>
              <a
                href="/qualified-users"
                className="block text-left px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200"
              >
                <FontAwesomeIcon icon={faUserCheck} className="mr-2" /> All Qualified Users
              </a>
            </li>
            <li>
              <a
                href="/admission-form-lists"
                className="block text-left px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200"
              >
                <FontAwesomeIcon icon={faKey} className="mr-2" /> User Password Reset
              </a>
            </li>
            {/* <li>
              <a
                href="/admission-form-list"
                className="block text-left px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200"
              >
                <FontAwesomeIcon icon={faEnvelopeOpenText} className="mr-2" /> Send Offer Letter
              </a>
            </li> */}
            <li>
              <a
                href="/dynamic-offer-letter"
                className="block text-left px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200"
              >
                <FontAwesomeIcon icon={faEnvelopeOpenText} className="mr-2" />Make Offer Letter
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block text-left px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200"
              >
                <FontAwesomeIcon icon={faBackwardStep} className="mr-2" /> Logout
              </a>
            </li>
          </ul>
        </div>
      </Drawer>
    </>
  );
}
