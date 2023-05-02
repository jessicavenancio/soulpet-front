import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoAgendamento (){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    function onSubmit(data) {
        axios.post("http://localhost:3001/agendamentos", data)
            .then(response => {
                toast.success("Agendamento realizado.", { position: "bottom-right", duration: 2000 });
                navigate("/agendamentos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }
    return (
        <div className="container">
            <h1>Novo Agendamento</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label> Pet</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres."} })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Serviço</Form.Label>
                    <Form.Control type="text" className={errors.tipo && "is-invalid"} {...register("tipo", { required: "O tipo do pet é obrigatório.", maxLength: { value: 25, message: "Limite de 25 caracteres."} })} />
                    {errors.tipo && <Form.Text className="invalid-feedback">{errors.tipo.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Data</Form.Label>
                    <Form.Control type="text" className={errors.porte && "is-invalid"} {...register("porte", { required: "Campo obrigatório.", maxLength: { value: 25, message: "Limite de 25 caracteres."} })} />
                    {errors.porte && <Form.Text className="invalid-feedback">{errors.porte.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Realizado</Form.Label>
                    <Form.Control type="date" className={errors.dataNasc && "is-invalid"} {...register("dataNasc", { required: "Campo obrigatório.", maxLength: { value: 25, message: "Limite de 25 caracteres."} })} />
                    {errors.dataNasc && <Form.Text className="invalid-feedback">{errors.dataNasc.message}</Form.Text>}
                </Form.Group>             
                    
                    
               
                <Button variant="primary" type="submit">
                    Agendar
                </Button>
            </Form>
        </div>
    );
}

