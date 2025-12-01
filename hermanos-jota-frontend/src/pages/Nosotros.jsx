import React from "react";
import "../CSS/Nosotros.css";

function SobreNosotros({ handleNavigate }) {
  return (
    <div className="asides">
      <div className="bannerr">
        <aside>
          <h1>SOBRE NOSOTROS</h1>
          <p>
            Hermanos Jota es el redescubrimiento de un arte olvidado: crear
            muebles que no solo cumplen una función, sino que alimentan el
            alma. Nacemos en la intersección entre herencia e innovación, donde
            la calidez del optimismo de los años 60 se encuentra con la
            conciencia sustentable del 2025. Cada pieza cuenta una historia de
            artesanía, hecha para acompañar tu hogar con autenticidad y belleza
            duradera.
          </p>

          <button
            onClick={() => handleNavigate("productos")}
            className="btn btn-primary"
          >
            VER MÁS
          </button>
        </aside>

        <main>
          <h2>Un viaje espiritual</h2>

          <aside className="nota">
            <h3>Primera Impresión</h3>
            <p>
              Una sensación de calidez y nostalgia te envuelve, como descubrir
              un tesoro familiar en perfectas condiciones. Hay un reconocimiento
              inmediato de calidad e intencionalidad.
            </p>
          </aside>

          <aside className="nota">
            <h3>Conexión Más Profunda</h3>
            <p>
              Al explorar más, descubrís los detalles pensados: los materiales
              sustentables, los principios de diseño atemporal, la historia
              detrás de cada pieza. Te das cuenta de que esto no es solo
              mobiliario, es una filosofía de vida.
            </p>
          </aside>

          <aside className="nota">
            <h3>Impacto Duradero</h3>
            <p>
              Vivir con Hermanos Jota se convierte en parte de tu ritual diario.
              Cada pieza envejece con gracia, desarrollando carácter mientras
              mantiene su belleza esencial. No solo compraste muebles; invertiste
              en un legado.
            </p>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default SobreNosotros;
