import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    const htmlResponse = `
    <html>
        <body>
            <h1>Projeto Final PIW</h1>
            <h2>PetShop</h2>
            <h4>Um sistema para um PetShop, onde será possível gerenciar os serviços e os clientes (Donos e Pets).</h4>
            <p>Lais Freitas de Queiroz - 470580 - Design Digital</br>
            Arusha Silveira Holanda Gomes - 471988 - Design Digital</p>
        </body>
    </html>
    `;
    res.send(htmlResponse);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
