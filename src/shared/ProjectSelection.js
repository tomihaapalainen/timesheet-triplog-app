import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import FormLabel from "react-bootstrap/FormLabel";
import InputGroup from "react-bootstrap/InputGroup";
import { useGSC } from "../store/GlobalStateProvider";
import strings from "./strings";
import { FaPlus } from "react-icons/fa";
import AddProjectModal from "./AddProjectModal";

export default function ProjectSelection({ project, setProject, required }) {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const { projects, language } = useGSC();

  strings.setLanguage(language);

  const handleShowAddProjectModal = () => {
    setShowAddProjectModal(true);
    setTimeout(() => {
      let elem = document.getElementById("project-name-input");
      elem.focus();
    }, 500);
  };

  const calculateRate = (rateInCentsPerHour) => {
    if (rateInCentsPerHour > 0) {
      return (rateInCentsPerHour / 100).toFixed(2) + (language === "fi" ? " €/t" : " €/h");
    }
    return "";
  };

  return (
    <Container className="px-0 mb-3">
      <FormLabel className="mb-0">{strings.project + (required ? "*" : "")}</FormLabel>
      <InputGroup>
        <FormControl
          style={{ height: "40px" }}
          as="select"
          value={project}
          onChange={(event) => setProject(parseInt(event.target.value))}
          placeholder={strings.project}
        >
          <option key={0} value={0}>
            {""}
          </option>
          {projects.map((p) => (
            <option style={{ backgroundColor: "#fff" }} value={p.id} key={p.id}>
              {p.project_name} {calculateRate(p.hourly_rate)}
            </option>
          ))}
        </FormControl>
        <InputGroup.Append>
          <Button variant="primary" style={{ width: "70px" }} onClick={handleShowAddProjectModal}>
            <FaPlus size={25} color="#fff" />
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <AddProjectModal show={showAddProjectModal} setShow={setShowAddProjectModal} />
    </Container>
  );
}
