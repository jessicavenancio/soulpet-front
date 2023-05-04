import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [idAgendamento, setIdAgendamento] = useState(null);

  const handleClose = () => {
    setIdAgendamento(null);
    setShowDeleteModal(false);
    setShowDeleteAllModal(false);
  };

  const handleShow = (id) => {
    setIdAgendamento(id);
    setShowDeleteModal(true);
  };

  const handleShowAll = () => {
    setShowDeleteAllModal(true);
  };

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get("http://localhost:3001/agendamentos")
      .then((response) => {
        setAgendamentos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onDelete() {
    axios
      .delete(`http://localhost:3001/agendamentos/${idAgendamento}`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        initializeTable();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
    handleClose();
  }
  function onDeleteAll() {
    axios
      .delete(`http://localhost:3001/agendamentos/`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        initializeTable();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
    handleClose();
  }

  return (
    <div className="agendamentos container">
      <div className="d-flex justify-content-around align-items-center mb-5 mt-5">
        <h1>Agendamentos</h1>
        <Button as={Link} to="/agendamentos/novo" variant="primary">
          Novo agendamento
        </Button>
        <Button
          onClick={() => handleShowAll(agendamentos)}
          variant="primary"
        > Excluir todos agendamentos</Button>
      </div>
      {agendamentos === null ? (
        <Loader />
      ) : (
        <Table striped hover>
          <thead>
            <tr>
              <th>Data do agendamento</th>
              <th>Status de realização</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((agendamento) => {
              return (
                <tr key={agendamento.id}>
                  <td>{agendamento.dataAgendada}</td>
                  <td>{agendamento.realizada}</td>
                  <td className="d-flex gap-2">
                    <Button onClick={handleShow.bind(this, agendamento.id)}>
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                    <Button as={Link} to={`/agendamentos/editar/${agendamento.id}`}>
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>Quer mesmo excluir este agendamento?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteAllModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir todos os agendamentos?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onDeleteAll}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
