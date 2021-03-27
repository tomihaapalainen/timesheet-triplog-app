import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useGSC } from "../store/GlobalStateProvider";
import { baseUrl } from "../config";
import { AiOutlineMenu } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import LanguageSelection from "./LanguageSelection";
import NavigationLink from "./NavigationLink";
import pulikkaIcon from "../static/logos/logo192.png";
import strings from "./strings";

const paragraphStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  textTransform: "uppercase",
};

export default function NavigationBar() {
  const { currentUser, signout } = useAuth();
  const {
    setActiveUntil,
    setIsActive,
    setProjects,
    setWorkTimes,
    setInvitationToken,
    language,
  } = useGSC();
  const history = useHistory();

  strings.setLanguage(language);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let idToken = await currentUser.getIdToken(true);
        let response = await axios.get(`${baseUrl}/userdata`, {
          headers: { Authorization: `Bearer ${idToken}` },
        });

        if (response.status === 200) {
          setActiveUntil(response.data.active_until);
          setIsActive(response.data.is_active);
          setInvitationToken(response.data.invitation_token);
          setProjects(response.data.projects);
          setWorkTimes(response.data.worktimes);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            await handleLogout();
          }
        }
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signout();
      history.push("/");
    } catch (error) {}
  };

  return (
    <Navbar collapseOnSelect expand="xl" bg="primary" variant="dark" className="my-0 py-1">
      <Navbar.Brand className="m-0 p-0 d-flex flex-row justify-content-center align-items-center nav-brand">
        <Link
          to="/app"
          style={{ textDecoration: "none" }}
          className="d-flex flex-row align-items-center text-white"
        >
          <Image
            src={pulikkaIcon}
            alt="logo"
            style={{ width: 40, height: 40, marginRight: "10px" }}
          />
          {currentUser === null && (
            <p
              style={{
                fontSize: 26,
                fontWeight: "bold",
              }}
            >
              Pulikka.fi
            </p>
          )}
        </Link>

        <LanguageSelection />
      </Navbar.Brand>

      {currentUser && (
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <span>
            <AiOutlineMenu color="white" size={30} />
          </span>
        </Navbar.Toggle>
      )}
      {currentUser && (
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavigationLink eventKey="0" title={strings.timesheet} to="/app/worktime" />
            <NavigationLink eventKey="1" title={strings.tripLog} to="/app/triplog" />
            <NavigationLink eventKey="2" title={strings.reports} to="/app/downloads" />
            <NavigationLink eventKey="3" title={strings.profile} to="/app/userdata" />
            <Nav.Link
              eventKey="4"
              as={Link}
              to="/app/purchase"
              className="mx-1 my-1 px-3 bg-primary border-success"
              style={{ borderRadius: "5px" }}
            >
              <p style={{ ...paragraphStyle, fontSize: 15 }} className="m-1 p-0 text-success">
                {strings.purchase}
              </p>
            </Nav.Link>
            <NavigationLink eventKey="5" title={strings.terms} to="/terms" />
            <Nav.Link
              eventKey="6"
              onClick={handleLogout}
              as={Link}
              to="#"
              className="bg-primary mx-1 my-1 px-3 d-flex align-items-center"
            >
              <FaSignOutAlt size={25} color="lightgrey" className="mx-1" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}
