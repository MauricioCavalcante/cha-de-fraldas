import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --gold-color: #e8c357;
        --pink-color: #f194a8;
        --light-color: #fff9fae0;
        --text-color: white;
    }

    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-image: url("cha-de-fraldas/fundo.png");
        background-position: center;
        color: #333;
    }

    .custom-container {
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 10px;
        padding: 10px;
    }

    .custom-navbar-bg {
        background-color: var(--gold-color) !important;
    }

    .container-title {
        display: flex;
        max-width: 600px;
        justify-content: center;
        align-items: center;
        color: var(--text-color);
        font-family: Arial, Helvetica, sans-serif;
        background-color: var(--pink-color);
        clip-path: polygon(100% 0%, 90% 50%, 100% 99%, 0 99%, 10% 50%, 0 0);
        margin: 20px auto;
        flex-direction: column;
    }

    .custom-badge {
        background-color: var(--pink-color) !important;
        color: white;
    }

    .ursinha {
        display: inline-block;
        width: 300px;
        height: 300px;
        border: 4px solid var(--pink-color);
        border-radius: 50%;
        overflow: hidden;
    }

    .ursinha img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .convite {
        padding: 10px;
        width: 100%;
        text-align: center;
        color: var(--text-color);
        font-size: 17px;
        font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        background-color: var(--pink-color);
    }

    .card {
        border: 4px solid var(--gold-color);
        border-radius: 10px;
        padding: 0;
        margin: 0;
    }

    .card-title {
        background-color: var(--pink-color);
        color: white;
        padding: 0.8em;
    }
    .btn-custom {
        background-color: var(--pink-color);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;

        /* Efeito ao passar o mouse */
        &:hover {
            background-color: #d77e97; /* Escurecendo manualmente a cor no hover */
        }

        /* Efeito ao clicar - Agora com a cor --gold-color */
        &:active {
            background-color: var(--gold-color); /* Cor de fundo ao clicar */
        }
    }

    /* Estilo opcional para botões desabilitados */
    .btn-custom:disabled {
        background-color: #e0a3b5;
        cursor: not-allowed;
    }
`;

export default GlobalStyles;
