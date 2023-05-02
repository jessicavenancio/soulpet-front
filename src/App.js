import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { Clientes } from "./pages/Clientes/Clientes";
import { EditaCliente } from "./pages/EditaCliente/EditaCliente";
import { NovoPets } from "./pages/NovoPets/NovoPets";
import { AddProduto } from "./pages/Produtos/AddProd";
import { NovoPedido } from "./pages/NovoPedido/NovoPedido";
import { Produtos } from "./pages/Produtos/Produtos";
import { EditarProd } from "./pages/Produtos/EditarProd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/novo" element={<NovoCliente />} />
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />
          <Route path="/pets/novo" element={<NovoPets />} />
          <Route path="/produtos/novo" element={<AddProduto />} />
          <Route path="/pedidos/novo" element={<NovoPedido />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/novo" element={<AddProduto />} />
          <Route path="/produtos/editar/:id" element={<EditarProd />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
