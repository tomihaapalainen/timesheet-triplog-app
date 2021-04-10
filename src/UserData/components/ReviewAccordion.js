import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Loading from "../../shared/Loading";
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

export default function ReviewAccordion() {
  const [displayName, setDisplayName] = useState("");
  const [rating, setRating] = useState(4);
  const [errorMessage, setErrorMessage] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);

  const [ratingMissing, setRatingMissing] = useState(false);
  const [reviewMissing, setReviewMissing] = useState(false);

  const { currentUser } = useAuth();

  const { language } = useGSC();
  strings.setLanguage(language);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let idToken = await currentUser.getIdToken(true);
        let response = await axios.get(`${baseUrl}/review`, {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        if (response.data) {
          setHasReviewed(true);
          setDisplayName(response.data.display_name);
          setRating(response.data.rating);
          setReviewContent(response.data.review);
          localStorage.setItem("user-review", JSON.stringify(response.data));
        }
      } catch (error) {
        if (error.response) {
          setErrorMessage(strings.serverDidNotRespond);
        }
      }
    };

    let reviewData = localStorage.getItem("user-review");
    if (reviewData !== null) {
      reviewData = JSON.parse(reviewData);
      setHasReviewed(true);
      setDisplayName(reviewData.display_name);
      setRating(reviewData.rating);
      setReviewContent(reviewData.review);
    } else {
      fetchData();
    }
    setInitializing(false);
  }, []);

  const createReview = async () => {
    setLoading(true);
    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.post(
        `${baseUrl}/reviews`,
        {
          display_name: displayName,
          review: reviewContent,
          rating: rating,
        },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      if (response.status === 200) {
        setHasReviewed(true);
        setMessage(strings.thanksForTheReview);
        setDisplayName(response.data.display_name);
        setRating(response.data.rating);
        setReviewContent(response.data.review);
        sessionStorage.removeItem("offerings-cache");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(strings.errorSendingReview);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async () => {
    setLoading(true);
    try {
      let idToken = await currentUser.getIdToken(true);
      let response = await axios.post(
        `${baseUrl}/update-review`,
        {
          display_name: displayName,
          review: reviewContent,
          rating: rating,
        },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      if (response.status === 200) {
        setMessage(strings.thanksForTheReview);
        localStorage.removeItem("user-review");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(strings.errorSendingReview);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (hasReviewed) {
      updateReview();
    } else {
      createReview();
    }
  };

  if (initializing) {
    return <Loading />;
  }

  return (
    <Accordion className="mw-1024 mx-auto">
      <Card className={`${!hasReviewed ? "review-border" : ""}`}>
        <AccordionToggle
          title={hasReviewed ? strings.updateReview : strings.reviewTheApplication}
        />
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
                    value={displayName}
                    as="input"
                    maxLength={50}
                    onChange={(event) => setDisplayName(event.target.value)}
                  ></Form.Control>
                  <Form.Label className="mt-2 mb-1">{strings.yourRating + "*"}</Form.Label>
                  <Row className="w-100 mw-1024 center-flex">
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
                    value={reviewContent}
                    as="textarea"
                    style={{ resize: "none", height: "200px" }}
                    maxLength={250}
                    onChange={(event) => setReviewContent(event.target.value)}
                  ></Form.Control>
                  <p>{reviewContent.length}/250 (min 50)</p>
                </Form.Group>
                {!loading && (
                  <Container>
                    {hasReviewed ? (
                      <Button disabled={reviewContent.length < 50} type="submit">
                        {strings.update}
                      </Button>
                    ) : (
                      <Button disabled={reviewContent.length < 50} type="submit">
                        {strings.send}
                      </Button>
                    )}
                  </Container>
                )}
                {loading && (
                  <Container fluid className="center-flex">
                    <Spinner variant="primary" animation="border" role="status" />
                  </Container>
                )}
              </Form>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
