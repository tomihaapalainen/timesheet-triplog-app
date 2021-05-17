import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useGSC } from "../store/GlobalStateProvider";
import { baseUrl } from "../config";
import { AiOutlineMenu } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import LanguageSelection from "./LanguageSelection";
import NavigationLink from "./NavigationLink";
import strings from "./strings";

const paragraphStyle = {
  fontSize: "14px",
  fontWeight: "bolder",
  textTransform: "uppercase",
  color: "#00DD00",
};

export default function NavigationBar() {
  const { currentUser, signout } = useAuth();
  const { setActiveUntil, setIsActive, setProjects, setTimesheets, setInvitationToken, language } =
    useGSC();
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
          setTimesheets(response.data.worktimes);
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
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" className="my-0 py-1">
      <Navbar.Brand className="m-0 p-0 center-flex flex-row nav-brand">
        <Link
          to="/app"
          style={{ textDecoration: "none" }}
          className="d-flex flex-row align-items-center text-white"
        >
          {currentUser === null && (
            <p
              style={{
                fontSize: 32,
                fontWeight: "bold",
              }}
            >
              Pulikka
            </p>
          )}
        </Link>

        <LanguageSelection />
      </Navbar.Brand>

      {!currentUser && (
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <span>
            <AiOutlineMenu color="white" size={30} />
          </span>
        </Navbar.Toggle>
      )}

      {!currentUser && (
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavigationLink eventKey="0" title={strings.timesheet} to="#timesheet" />
            <NavigationLink eventKey="1" title={strings.tripLog} to="/#triplog" />
            <NavigationLink eventKey="2" title={strings.reports} to="/#reports" />
            <NavigationLink eventKey="3" title={strings.pricing} to="/#pricing" />
            <NavigationLink eventKey="4" title={strings.signIn} to="/signin" />
            <NavigationLink eventKey="5" title={strings.register} to="/register" />
          </Nav>
        </Navbar.Collapse>
      )}

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
            <NavigationLink eventKey="2" title={strings.history} to="/app/history" />
            <NavigationLink eventKey="3" title={strings.reports} to="/app/reports" />
            <NavigationLink eventKey="4" title={strings.profile} to="/app/userdata" />
            <Nav.Link
              eventKey="4"
              as={Link}
              to="/app/purchase"
              className="mx-1 my-1 px-2 bg-primary text-success border-success d-flex flex-row align-items-center"
            >
              <p style={paragraphStyle} className="m-1 px-0">
                {strings.purchase}
              </p>
            </Nav.Link>
            <Nav.Link
              eventKey="6"
              onClick={handleLogout}
              as={Link}
              to="#"
              className="bg-primary mx-1 my-1 px-3 center-flex"
            >
              <FaSignOutAlt size={25} color="lightgrey" className="mx-1" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}
