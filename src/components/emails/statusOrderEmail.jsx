// statusOrderEmail.jsx
import { Html, Container, Text, Button } from "@react-email/components";
import { FaCheck } from "react-icons/fa";

/**
 * @desc Order status email template (successful payment)
 * - Light modern theme
 * - Clean layout and responsive email styling
 * - All styles are declared as variables for clarity and reusability
 */
export default function StatusOrderEmail({ order }) {
  return (
    <Html lang="fa" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>تکمیل سفارش</title>
      </head>
      <Container style={containerStyle}>
        
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>سفارش با موفقیت تکمیل شد</h1>
        </div>

        {/* Body content */}
        <div style={contentBoxStyle}>
          <p style={textStyle}>
            سلام <strong>{order?.user?.fullName || "کاربر گرامی"}</strong>،<br />
            سفارش شما با موفقیت پرداخت شد.
          </p>

          {/* Order details */}
          <div style={orderBoxStyle}>
            <p style={orderTextStyle}>
              شماره سفارش: {order?.orderNumber}
            </p>
            <p style={orderTextStyle}>
              مبلغ پرداختی: {order?.totalPrice?.toLocaleString("fa-IR")} تومان
            </p>
          </div>

          <p style={thankYouStyle}>متشکریم! </p>

          {/* CTA Button */}
          <Button
            href={`${process.env.NEXT_PUBLIC_SITE_URL}/my-orders`}
            style={buttonStyle}
          >
            مشاهده سفارش‌ها
          </Button>
        </div>
      </Container>
    </Html>
  );
}

/* --- Styles --- */

// Main container (background + layout)
const containerStyle = {
  fontFamily: "'Tahoma', 'Arial', sans-serif",
  maxWidth: "420px",
  margin: "auto",
  padding: "24px",
  backgroundColor: "#f9fafb",
  borderRadius: "12px",
  boxSizing: "border-box",
  direction: "rtl",
  textAlign: "right",
};

// Header container (title and icon)
const headerStyle = {
  textAlign: "center",
  marginBottom: "24px",
};



// Title (header text)
const titleStyle = {
  color: "#10b981",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0",
  fontFamily: "'Tahoma', 'Arial', sans-serif",
};

// Main content box
const contentBoxStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  textAlign: "center",
  padding: "20px",
  boxSizing: "border-box",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

// Default paragraph text
const textStyle = {
  color: "#374151",
  fontSize: "14px",
  lineHeight: "1.6",
  marginBottom: "16px",
  textAlign: "center",
  fontFamily: "'Tahoma', 'Arial', sans-serif",
};

// Order details container
const orderBoxStyle = {
  backgroundColor: "#f1f5f9",
  borderRadius: "6px",
  padding: "12px",
  marginBottom: "16px",
  textAlign: "center",
};

// Order info text
const orderTextStyle = {
  color: "#64748b",
  fontSize: "13px",
  margin: "3px 0",
  fontFamily: "'Tahoma', 'Arial', sans-serif",
};

// Thank you message
const thankYouStyle = {
  color: "#10b981",
  fontSize: "14px",
  fontWeight: "600",
  textAlign: "center",
  margin: "10px 0 0",
};

// Button style
const buttonStyle = {
  backgroundColor: "#10b981",
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "14px",
  display: "block",
  textAlign: "center",
  marginTop: "20px",
  transition: "background-color 0.3s ease",
};
