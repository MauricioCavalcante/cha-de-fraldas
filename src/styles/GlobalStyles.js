import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    :root{
    --gold-color: #e8c357;
    --pink-color: #f194a8;
    --light-color: #fff9fae0;
    --text-color: white;
    }
    body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-image: url("/fundo.png");
    background-position: center;
    color: #333;
    
    }
`;

export default GlobalStyles;
