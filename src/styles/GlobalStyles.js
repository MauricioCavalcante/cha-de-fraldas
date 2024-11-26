import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --gold-color: #e6ceac;
        --pink-color: #f194a8;
        --light-color: #fff9fae0;
        --text-color: white;
    }

    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-image: url("./fundo.png");
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
        max-width: 700px;
        justify-content: center;
        align-items: center;
        color: var(--text-color);
        font-family: Arial, Helvetica, sans-serif;
        background-color: var(--pink-color);
        clip-path: polygon(100% 0%, 95% 50%, 100% 99%, 0 99%, 5% 50%, 0 0);
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
        border: none;

        &:hover {
            background-color: #d77e97;
        }

        &:active {
            background-color: var(--gold-color);
        }
        
    }

    .btn-custom:disabled {
        background-color: var(--gold-color);
        cursor: not-allowed;
    }

    .btn-copy {
        background-color: white;
        border: 2px solid var(--pink-color);
        border-radius: 5px;
        padding: 5px;
        color: var(--pink-color);

        &:hover {
            background-color: var(--pink-color);
            border: 2px solid var(--pink-color);
            color:white;
        }
    }
`;

export default GlobalStyles;
