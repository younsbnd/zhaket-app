import { Html, Container, Text, Button } from "@react-email/components";

export default function OtpEmail({ otpCode }) {
  return (
    <Html lang="fa" dir="rtl">
      <Container style={containerStyle}>
        <div style={headerStyle}>
          <Text style={titleStyle}> کد تایید</Text>
        </div>

        <div style={codeBoxStyle}>
          <Text style={codeStyle}>{otpCode}</Text>
        </div>

        <Button href={process.env.NEXT_PUBLIC_BASE_URL} style={buttonStyle}>
          ورود به سایت
        </Button>
      </Container>
    </Html>
  );
}

const containerStyle = {
  maxWidth: "400px",
  margin: "0 auto",
  padding: "40px 20px",
  backgroundColor: "#f8fafc",
  borderRadius: "12px",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "30px",
};

const titleStyle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1e293b",
  margin: "0",
};

const codeBoxStyle = {
  backgroundColor: "#f1f5f9",
  border: "2px solid #e2e8f0",
  borderRadius: "16px",
  padding: "24px",
  textAlign: "center",
  margin: "20px 0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const codeStyle = {
  fontSize: "36px",
  fontWeight: "800",
  color: "#1e293b",
  letterSpacing: "6px",
  margin: "0",
  fontFamily: "monospace",
};

const buttonStyle = {
  background: "#10b981",
  color: "#ffffff",
  padding: "14px 28px",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "14px",
  display: "block",
  textAlign: "center",
  transition: "all 0.2s",
};
