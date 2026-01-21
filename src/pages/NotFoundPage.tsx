import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage = () => (
  <div style={{ textAlign: "center", marginTop: 100 }}>
    <h2>404 - Страница не найдена</h2>
    <Link to="/login">Вернуться на главную</Link>
  </div>
);