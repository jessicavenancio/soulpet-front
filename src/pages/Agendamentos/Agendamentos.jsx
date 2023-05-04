import axios from "axios";
import { useEffect, useState } from "react";
import { Button,Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import Img from "../../assets/soul-pet-logo.svg";

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
            <div className="container-img">
                <img className="img-bg col-md-10 " src={Img} alt="LOGO" />
            </div>
            <div className="d-flex justify-content-between align-items-center m-0 p-0">
                <h1>Agendamentos</h1>                
                    <Button as={Link} to="/agendamentos/novo" variant="primary">
                        Novo agendamento
                    </Button>            
            </div>
            {
                agendamentos === null ?
                    <Loader/>
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