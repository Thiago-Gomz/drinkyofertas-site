import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function getLogoDataUrl() {
  const logoPath = join(process.cwd(), "public", "logo.png");
  const logoBuffer = readFileSync(logoPath);
  const logoBase64 = logoBuffer.toString("base64");

  return `data:image/png;base64,${logoBase64}`;
}

function FeatureCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "390px",
        height: "132px",
        padding: "22px",
        borderRadius: "28px",
        background: "#ffffff",
        border: "1px solid #e4e4e7",
        boxShadow: "0 18px 45px rgba(0,0,0,0.10)",
        gap: "18px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "72px",
          height: "72px",
          borderRadius: "999px",
          background: "#fee2e2",
          color: "#dc2626",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "30px",
          fontWeight: 900,
        }}
      >
        {number}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "250px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "27px",
            fontWeight: 900,
            color: "#18181b",
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "8px",
            fontSize: "18px",
            lineHeight: 1.28,
            color: "#52525b",
            fontWeight: 600,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}

export default function OpenGraphImage() {
  const logoSrc = getLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#ffffff",
          fontFamily: "Arial",
          color: "#18181b",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-180px",
            top: "-170px",
            width: "560px",
            height: "560px",
            borderRadius: "999px",
            background: "linear-gradient(180deg, #dc2626, #991b1b)",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "58px 62px",
            gap: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "675px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <img
                src={logoSrc}
                alt="DrinkyOfertas"
                style={{
                  width: "104px",
                  height: "104px",
                  objectFit: "contain",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: "68px",
                    fontWeight: 900,
                    letterSpacing: "-4px",
                    lineHeight: 1,
                  }}
                >
                  <span>Drinky</span>
                  <span style={{ color: "#dc2626" }}>Ofertas</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    marginTop: "8px",
                    fontSize: "26px",
                    color: "#52525b",
                    fontWeight: 700,
                  }}
                >
                  Sua dose de descontos diários
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                marginTop: "30px",
                padding: "13px 24px",
                borderRadius: "999px",
                border: "2px solid rgba(220,38,38,0.35)",
                color: "#18181b",
                fontSize: "19px",
                fontWeight: 900,
                letterSpacing: "1.5px",
                background: "#ffffff",
              }}
            >
              OFERTAS, CUPONS E COMPARAÇÃO DE BEBIDAS
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "34px",
                fontSize: "72px",
                lineHeight: 0.96,
                letterSpacing: "-5px",
                fontWeight: 900,
              }}
            >
              <div style={{ display: "flex" }}>Compare preços,</div>
              <div style={{ display: "flex" }}>cupons e</div>
              <div style={{ display: "flex", color: "#dc2626" }}>
                oportunidades
              </div>
              <div style={{ display: "flex" }}>antes de comprar.</div>
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "26px",
                maxWidth: "650px",
                fontSize: "25px",
                lineHeight: 1.35,
                color: "#52525b",
                fontWeight: 600,
              }}
            >
              Monitore bebidas online, acompanhe preços e encontre a melhor
              decisão de compra.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "400px",
              gap: "20px",
              paddingTop: "78px",
            }}
          >
            <FeatureCard
              number="1"
              title="Ofertas monitoradas"
              description="Acompanhamento de lojas e oportunidades em bebidas."
            />

            <FeatureCard
              number="2"
              title="Histórico de preços"
              description="Veja variações e descubra o melhor momento."
            />

            <FeatureCard
              number="3"
              title="Cupons e descontos"
              description="Economize mais antes de finalizar sua compra."
            />
          </div>
        </div>
      </div>
    ),
    size
  );
}