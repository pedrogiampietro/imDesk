import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        box-sizing: border-box;
    }
    body {
        background: ${({ theme }) => theme.bg};
        color: ${({ theme }) => theme.text};
        font-family: 'Roboto', sans-serif;
        letter-spacing: .6px;
    }

    body.modal-open {
    overflow: hidden;
  }

  ::-webkit-scrollbar {
  width: 10px; 
}


::-webkit-scrollbar-thumb {
  background-color: #c3aff0;
  border-radius: 4px; 
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); 
}


::-webkit-scrollbar-track {
  background-color: #D3D3D3;
  border-radius: 4px;
}
`;
