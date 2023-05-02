import axios from "axios";
import { useEffect, useState } from "react";
import { Button,Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export function Agendamentos() {
    const [agendamentos, setAgendamentos] = useState(null); 

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/agendamentos")
            .then(response => {
                setAgendamentos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="agendamentos container">
            <div className="d-flex justify-content-around align-items-center mb-5 mt-5">
                <h1>Agendamentos</h1>                
                    <Button as={Link} to="/agendamentos/novo" variant="secondary">
                        Novo agendamento
                    </Button>            
            </div>
            {
                agendamentos === null ?
                    <Loader />
                    :
                    <Table striped hover >
                        <thead>
                            <tr>
                                <th>Data do agendamento</th>
                                <th>Status de realização</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentos.map(agendamento => {
                                return (
                                    <tr key={agendamento.id}>
                                        <td>{agendamento.dataAgendada}</td>
                                        <td>{agendamento.realizada}</td>
                                        <td className="d-flex gap-2">
                                            <Button >
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button  >
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
        </div>
    );
}