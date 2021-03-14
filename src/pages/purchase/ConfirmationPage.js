import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useAuth } from "../../contexts/AuthContext";
import { baseUrl } from "../../config";
import { useGSC } from "../../store/GlobalStateProvider";

const ConfirmationPage = () => {
  const [errorMessage, setErrorMessage] = useState();
  const { currentUser, signout } = useAuth();
  const { setActiveUntil, setIsActive, setInvitationToken, setProjects, setWorkTimes } = useGSC();

  const history = useHistory();

  const renderKlarna = (htmlSnippet) => {
    var checkoutContainer = document.getElementById("klarna-confirmation-container");
    checkoutContainer.innerHTML = htmlSnippet;
    var scriptsTags = checkoutContainer.getElementsByTagName("script");

    for (var i = 0; i < scriptsTags.length; i++) {
      var parentNode = scriptsTags[i].parentNode;
      var newScriptTag = document.createElement("script");
      newScriptTag.type = "text/javascript";
      newScriptTag.text = scriptsTags[i].text;
      parentNode.removeChild(scriptsTags[i]);
      parentNode.appendChild(newScriptTag);
    }
  };

  const handleLogout = async () => {
    try {
      await signout();
      history.push("/");
    } catch (error) {}
  };

  const fetchUserdata = async () => {
    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.get(`${baseUrl}/userdata`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (response.status === 200) {
        setActiveUntil(response.data.active_until);
        let date = new Date(Date.parse(response.data.active_until));
        setIsActive(new Date() < date);
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

  useEffect(() => {
    const fetchOrderData = async () => {
      if (/\/order-confirmation\/[a-z0-9-]+/.test(window.location.pathname)) {
        let klarnaOrderId = window.location.pathname.substring(
          window.location.pathname.lastIndexOf("/") + 1
        );

        try {
          let idToken = await currentUser.getIdToken(true);
          let response = await axios.get(`${baseUrl}/checkout/order/${klarnaOrderId}`, {
            headers: { Authorization: `Bearer ${idToken}` },
          });

          if (response.status === 200) {
            await fetchUserdata();
            renderKlarna(response.data.html_snippet);
          }
        } catch (error) {
          if (error.response) {
            setErrorMessage(error.response.data.detail);
          }
        }
      }
    };

    fetchOrderData();
  }, [currentUser]);

  return (
    <Container>
      {errorMessage ? (
        <Row>
          <p className="text-danger">{errorMessage}</p>
        </Row>
      ) : null}
      <div id="klarna-confirmation-container"></div>
    </Container>
  );
};

export default ConfirmationPage;
