import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useAuth } from "../../contexts/AuthContext";
import { baseUrl } from "../../config";

const CheckoutPage = ({ offering }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser } = useAuth();

  const renderKlarna = (htmlSnippet) => {
    var checkoutContainer = document.getElementById("klarna-checkout-container");
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

  useEffect(() => {
    const fetchData = async () => {
      let idToken = await currentUser.getIdToken(true);
      axios
        .post(`${baseUrl}/checkout/start`, offering, {
          headers: { Authorization: `Bearer ${idToken}` },
        })
        .then((response) => {
          if (response.status === 200) {
            renderKlarna(response.data.html_snippet);
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 402) {
              renderKlarna();
            } else {
              setErrorMessage(error.response.data.detail);
            }
          }
        });
    };

    fetchData();
  }, [offering, currentUser]);

  return (
    <Container>
      {errorMessage ? <p className="text-danger">{errorMessage}</p> : null}
      <div id="klarna-checkout-container" />
    </Container>
  );
};

export default CheckoutPage;
