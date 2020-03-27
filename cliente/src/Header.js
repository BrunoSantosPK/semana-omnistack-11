import React from "react";

export default function Header({ titulo, children }) {
    return (
        <header>
            <h1>{titulo}</h1>
            {children}
        </header>
    );
}