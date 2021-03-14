import React, { useRef, useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { baseUrl } from "../../config";
import { useAuth } from "../../contexts/AuthContext";
import {
  RiEmotionLaughLine,
  RiEmotionHappyLine,
  RiEmotionNormalLine,
  RiEmotionSadLine,
  RiEmotionUnhappyLine,
} from "react-icons/ri";
import AccordionToggle from "../../shared/AccordionToggle";
import strings from "./strings";
import { useGSC } from "../../store/GlobalStateProvider";

export default function ReviewAccordion({ review }) {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rating, setRating] = useState(4);
  const displayNameRef = useRef();
  const reviewRef = useRef();

  const [ratingMissing, setRatingMissing] = useState(false);
  const [reviewMissing, setReviewMissing] = useState(false);

  const { currentUser } = useAuth();

  const { language } = useGSC();
  strings.setLanguage(language);

  const createReview = async (name, reviewContent) => {
    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.post(
        `${baseUrl}/reviews`,
        { display_name: name, review: reviewContent, rating: rating },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      if (response.status === 200) {
        setMessage(strings.thanksForTheReview);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(strings.errorSendingReview);
      }
    }
  };

  const updateReview = async (name, reviewContent) => {
    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.post(
        `${baseUrl}/update-review`,
        { display_name: name, review: reviewContent, rating: rating },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      if (response.status === 200) {
        setMessage(strings.thanksForTheReview);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(strings.errorSendingReview);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let name = displayNameRef.current.value;
    let reviewContent = reviewRef.current.value;

    if (!reviewContent) {
      setReviewMissing(true);
      return;
    }

    if (review === null) {
      await createReview(name, reviewContent);
    } else {
      await updateReview(name, reviewContent);
    }
  };

  const toggleTitle = () => {
    if (review) {
      return strings.updateReview;
    } else {
      return strings.reviewTheApplication;
    }
  };

  return (
    <Accordion className="mw-1024 mx-auto">
      <Card style={review === null ? { border: "2px solid #11d3bc" } : {}}>
        <AccordionToggle title={toggleTitle()} />
        <Accordion.Collapse eventKey="0">
          <Card.Body className="mx-auto">
            {message && (
              <Container className="my-3">
                <p>{message}</p>
              </Container>
            )}
            {errorMessage && (
              <Container className="my-3">
                <p className="text-danger">{errorMessage}</p>
              </Container>
            )}
            <Alert
              show={ratingMissing}
              variant="danger"
              dismissible
              onClose={() => setRatingMissing(false)}
            >
              <p>{strings.invalidRating}</p>
            </Alert>
            <Alert
              show={reviewMissing}
              variant="danger"
              dismissible
              onClose={() => setReviewMissing(false)}
            >
              <p>{strings.reviewCannotBeEmpty}</p>
            </Alert>
            {!message && !errorMessage && (
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label className="mt-2 mb-1">{strings.alias}</Form.Label>
                  <Form.Control
                    ref={displayNameRef}
                    as="input"
                    maxLength={50}
                    defaultValue={review !== null ? review.display_name : ""}
                  ></Form.Control>
                  <Form.Label className="mt-2 mb-1">{strings.yourRating + "*"}</Form.Label>
                  <Row className="w-100 mw-1024 d-flex justify-content-center align-items-center">
                    <Button
                      className="bg-light"
                      variant="light"
                      onClick={() => setRating(1)}
                      style={rating === 1 ? { border: "2px solid red" } : {}}
                    >
                      <RiEmotionUnhappyLine size={30} color="red" />
                    </Button>

                    <Button
                      className="bg-light"
                      variant="light"
                      onClick={() => setRating(2)}
                      style={rating === 2 ? { border: "2px solid orange" } : {}}
                    >
                      <RiEmotionSadLine size={30} color="orange" />
                    </Button>

                    <Button
                      className="bg-light"
                      variant="light"
                      onClick={() => setRating(3)}
                      style={rating === 3 ? { border: "2px solid darkgrey" } : {}}
                    >
                      <RiEmotionNormalLine size={30} color="darkgrey" />
                    </Button>
                    <Button
                      className="bg-light"
                      variant="light"
                      onClick={() => setRating(4)}
                      style={rating === 4 ? { border: "2px solid lightgreen" } : {}}
                    >
                      <RiEmotionHappyLine size={30} color="lightgreen" />
                    </Button>

                    <Button
                      className="bg-light"
                      variant="light"
                      onClick={() => setRating(5)}
                      style={rating === 5 ? { border: "2px solid green" } : {}}
                    >
                      <RiEmotionLaughLine size={30} color="green" />
                    </Button>
                  </Row>
                  <Form.Label className="mt-2 mb-1">{strings.review + "*"}</Form.Label>
                  <Form.Control
                    ref={reviewRef}
                    as="textarea"
                    style={{ resize: "none", height: "200px" }}
                    maxLength={255}
                    defaultValue={review !== null ? review.review : ""}
                  ></Form.Control>
                </Form.Group>
                {review === null ? (
                  <Button type="submit">{strings.send}</Button>
                ) : (
                  <Button type="submit">{strings.update}</Button>
                )}
              </Form>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
