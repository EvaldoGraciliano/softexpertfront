

import { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {

  const [pedidos, setPedidos] = useState([
    { nomeCliente: '', nomePedido: '', valorPedido: '' }
  ]);
  const [descontoAcrescimo, setDescontoAcrescimo] = useState({
    valorEntrega: 0,
    valorDescontoEmReal: 0,
    valorDescontoEmPorcantagem: 0,
    valorAcrescimoEmReal: 0,
    valorAcrescimoEmPorcentagem: 0
  });

  const [resultados, setResultados] = useState([]);

  const adicionarPedido = () => {
    setPedidos([...pedidos, { nomeCliente: '', nomePedido: '', valorPedido: '' }]);
  };

  const handlePedidoChange = (index: number, campo: string, valor: string) => {
  

    const novosPedidos = [...pedidos];
    if (campo === 'nomeCliente') {
        valor = valor.toLowerCase();
    }
    novosPedidos[index][campo] = valor;
    setPedidos(novosPedidos);
  };

  

  const handleDescontoAcrescimoChange = (campo, valor) => {
    setDescontoAcrescimo({ ...descontoAcrescimo, [campo]: valor });
  };

  const enviarDadosAoBackend = async () => {
    try {
      
      const url = "http://localhost:8080/pagamento";
      const formData = { pedidos, descontoAcrescimo };
      const response = await axios.post(url, formData);
     


      if (response.status === 200) {
        setResultados(response.data);
        alert("Dados enviados com sucesso!");

      } else {
        alert("Erro ao enviar dados.");
      }
    } catch (error) {
      console.error("Houve um erro ao enviar os dados:", error);
      alert("Erro ao enviar dados.");
    }
  };


  return (
    <div className="App">
      <h1>Formulário de Pedidos</h1>

      {pedidos.map((pedido, index) => (
        <div key={index}>
          <h3>Pedido {index + 1}</h3>
          <input
            type="text"
            placeholder="Nome do Cliente"
            value={pedido.nomeCliente}
            onChange={(e) => handlePedidoChange(index, 'nomeCliente', e.target.value)}
          />
          <input
            type="text"
            placeholder="Nome do Pedido"
            value={pedido.nomePedido}
            onChange={(e) => handlePedidoChange(index, 'nomePedido', e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor do Pedido"
            value={pedido.valorPedido}
            onChange={(e) => handlePedidoChange(index, 'valorPedido', e.target.value)}
          />
        </div>
      ))}
      <br />
      <button onClick={adicionarPedido}>Adicionar mais pedidos</button>

      <h2>Descontos e Acréscimos</h2>
      {Object.keys(descontoAcrescimo).map(campo => (
        <div key={campo}>
          <label>{campo}</label>
          <input
            type="number"
            value={descontoAcrescimo[campo]}
            onChange={(e) => handleDescontoAcrescimoChange(campo, e.target.value)}
          />
        </div>
      ))}

      <br />
      <button onClick={enviarDadosAoBackend}>Enviar</button>


      <h2>Resultados</h2>
      <br />
<table style={{ borderCollapse: 'collapse', width: '100%' }}>
    <thead>
        <tr>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Nome do Usuário</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Valor do Pagamento</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Link do Pagamento</th>
        </tr>
    </thead>
    <tbody>
        {resultados.map((resultado, index) => (
            <tr key={index}>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{resultado.nomeUsuario}</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{resultado.valorPagamento}</td>
                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                    <a href={resultado.linkPagamento} target="_blank" rel="noopener noreferrer">
                        Visualizar Boleto
                    </a>
                </td>
            </tr>
        ))}
    </tbody>
</table>

    </div>
  );
}

export default App
