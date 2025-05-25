import React, { useState } from "react";

function Group() {
  const [dorsal, setDorsal] = useState("");
  const [tarjetas, setTarjetas] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [grupoId] = useState(() => {
    // Generar un ID único simple
    return Math.random().toString(36).substring(2, 8);
  });

  const agregarTarjeta = (tipo) => {
    if (!dorsal) return;

    setTarjetas((prev) => {
      const anterior = prev[dorsal] || { blancas: 0, amarillas: 0, rojas: 0 };
      const nuevo = {
        ...anterior,
        blancas: anterior.blancas + (tipo === "blanca" ? 1 : 0),
        amarillas: anterior.amarillas + (tipo === "amarilla" ? 1 : 0),
        rojas: anterior.rojas + (tipo === "roja" ? 1 : 0),
      };
      return { ...prev, [dorsal]: nuevo };
    });

    setMensaje(`Dorsal ${dorsal} recibió tarjeta ${tipo}`);
    setDorsal("");
  };

  const calcularSancion = ({ blancas, amarillas, rojas }) => {
    if (rojas > 0) return "Expulsado";
    if (blancas >= 5 || (blancas >= 4 && amarillas >= 1)) return "Expulsado";
    if (blancas === 4 || (blancas === 3 && amarillas >= 1)) return "+4 minutos";
    if (blancas === 3) return "+2 minutos";
    if (amarillas > 0) return `+${amarillas * 2} minutos`;
    return "Sin sanción";
  };

  const urlGrupo = `https://tupagina.com/?grupo=${grupoId}`;
  const linkWhatsapp = `https://wa.me/?text=Únete%20al%20grupo%20de%20árbitros%20de%20marcha%20nórdica:%20${encodeURIComponent(urlGrupo)}`;

  return (
    <div style={{ padding: 20, fontFamily: "Arial", textAlign: "center" }}>
      <h1>Panel de Grupo</h1>
      <p>ID de grupo: <strong>{grupoId}</strong></p>

      <a
        href={linkWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginBottom: 20,
          padding: "10px 20px",
          backgroundColor: "#25D366",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "1.2rem",
        }}
      >
        📲 Invitar por WhatsApp
      </a>

      <div style={{ fontSize: "2rem", marginBottom: 10 }}>{mensaje}</div>

      <input
        type="number"
        placeholder="Dorsal"
        value={dorsal}
        onChange={(e) => setDorsal(e.target.value)}
        style={{ fontSize: "2rem", padding: "10px", width: "200px" }}
      />

      <div style={{ marginTop: 20 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button
            key={num}
            onClick={() => setDorsal((prev) => prev + num.toString())}
            style={{
              fontSize: "2rem",
              margin: 5,
              padding: "20px 30px",
              width: "80px",
            }}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setDorsal("")}
          style={{ fontSize: "1.5rem", marginTop: 10, padding: "10px 20px" }}
        >
          Borrar
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => agregarTarjeta("blanca")}
          style={{
            backgroundColor: "white",
            border: "2px solid black",
            color: "black",
            fontSize: "1.5rem",
            margin: 10,
            padding: "10px 30px",
          }}
        >
          Tarjeta Blanca
        </button>
        <button
          onClick={() => agregarTarjeta("amarilla")}
          style={{
            backgroundColor: "gold",
            border: "2px solid black",
            color: "black",
            fontSize: "1.5rem",
            margin: 10,
            padding: "10px 30px",
          }}
        >
          Tarjeta Amarilla
        </button>
        <button
          onClick={() => agregarTarjeta("roja")}
          style={{
            backgroundColor: "red",
            border: "2px solid black",
            color: "white",
            fontSize: "1.5rem",
            margin: 10,
            padding: "10px 30px",
          }}
        >
          Tarjeta Roja
        </button>
      </div>

      <div style={{ marginTop: 40, textAlign: "left", maxWidth: 600, margin: "40px auto" }}>
        <h2>Resumen de sanciones</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={{ border: "1px solid black", padding: 8 }}>Dorsal</th>
              <th style={{ border: "1px solid black", padding: 8 }}>Blancas</th>
              <th style={{ border: "1px solid black", padding: 8 }}>Amarillas</th>
              <th style={{ border: "1px solid black", padding: 8 }}>Rojas</th>
              <th style={{ border: "1px solid black", padding: 8 }}>Sanción</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tarjetas).map(([num, data]) => (
              <tr key={num}>
                <td style={{ border: "1px solid black", padding: 8 }}>{num}</td>
                <td style={{ border: "1px solid black", padding: 8 }}>{data.blancas}</td>
                <td style={{ border: "1px solid black", padding: 8 }}>{data.amarillas}</td>
                <td style={{ border: "1px solid black", padding: 8 }}>{data.rojas}</td>
                <td style={{ border: "1px solid black", padding: 8 }}>
                  {calcularSancion(data)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Group;


