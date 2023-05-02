import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Pets() {

    const [pets, setPets] = useState(null);
    const [show, setShow] = useState(false);
    const [idPets, setIdPets] = useState(null);

    const handleClose = () => {
        setIdPets(null);
        setShow(false)
    };
    const handleShow = (id) => {
        setIdPets(id);
        setShow(true)
    };

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/pets")
            .then(response => {
                setPets(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="pets container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Pets</h1>
                <div>
                <Button as={Link} to="/pets/novo" className="m-2">
                    <i className="bi bi-plus-lg"></i> Pets
                </Button>

                <Button onClick={() => window.open('http://localhost:3001/relatorio')}>
                <i class="bi bi-filetype-pdf"></i> Relatório
                </Button>
                </div>
            </div>
            {
                pets === null ?
                    <Loader />
                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Tipo</th>
                                <th>Porte</th>
                                <th>Data Nascimento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.map(pet => {
                                return (
                                    <tr key={pet.id}>
                                        <td>{pet.nome}</td>
                                        <td>{pet.tipo}</td>
                                        <td>{pet.porte}</td>
                                        <td>{pet.dataNasc}</td>
                                        <td className="d-flex gap-2">
                                            <Button onClick={() => handleShow(pet.id)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button as={Link} to={`/pets/editar/${pet.id}`}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir o pet?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}