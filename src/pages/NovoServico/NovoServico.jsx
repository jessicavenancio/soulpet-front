import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export function NovoServico() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    function onSubmit(data) {
        axios.post("http://localhost:3001/servicos", data)
            .then(response => {
                toast.success("Serviço adicionado.", { position: "bottom-right", duration: 2000 });
                navigate("/servicos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    return (
        <div className="container">
            <h1>Serviços</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="nomeServico">
                    <Form.Label>Nome do Serviço</Form.Label>
                    <Form.Control
                        type="text"
                        className={errors.nome ? "is-invalid" : ""}
                        {...register("nome", {
                            required: "O nome do serviço é obrigatório.",
                        })}
                    />
                    {errors.nome && (
                        <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="precoServico">
                    <Form.Label>Preço do Serviço</Form.Label>
                    <Form.Control
                        type="text"
                        className={errors.preco ? "is-invalid" : ""}
                        {...register("preco", {
                            required: "O preço do serviço é obrigatório.",
                        })}
                    />
                    {errors.preco && (
                        <Form.Text className="invalid-feedback">{errors.preco.message}</Form.Text>
                    )}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Adicionar Serviço
                </Button>
            </Form>
        </div>
    );
}
