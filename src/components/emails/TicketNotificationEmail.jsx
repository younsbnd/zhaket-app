import {
  Html,
  Container,
  Text,
  Button,
  Section,
  Row,
  Column,
} from "@react-email/components";

export default function TicketNotificationEmail({ ticket, userType = "user" }) {
  const isAdmin = userType === "admin";

  return (
    <Html lang="fa" dir="rtl">
      <Container style={containerStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <Text style={titleStyle}>
            {isAdmin ? "تیکت جدید دریافت شد" : "وضعیت تیکت شما تغییر یافت"}
          </Text>
        </div>

        {/* Ticket Information */}
        <Section style={ticketInfoStyle}>
          <Row>
            <Column>
              <Text style={labelStyle}>عنوان تیکت:</Text>
              <Text style={valueStyle}>{ticket.title}</Text>
            </Column>
          </Row>

          <Row>
            <Column>
              <Text style={labelStyle}>شماره تیکت:</Text>
              <Text style={valueStyle}>
                #{ticket.ticketNumber || ticket._id}
              </Text>
            </Column>
          </Row>

          <Row>
            <Column>
              <Text style={labelStyle}>وضعیت:</Text>
              <Text style={statusStyle(ticket.status)}>
                {getStatusText(ticket.status)}
              </Text>
            </Column>
          </Row>

          {ticket.description && (
            <Row>
              <Column>
                <Text style={labelStyle}>توضیحات:</Text>
                <Text style={descriptionStyle}>{ticket.description}</Text>
              </Column>
            </Row>
          )}
        </Section>

        {/* Action Button */}
        <div style={buttonContainerStyle}>
          <Button
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/${isAdmin ? "admin" : "panel"}/tickets/${ticket._id}`}
            style={buttonStyle}
          >
            {isAdmin ? "مشاهده تیکت" : "مشاهده تیکت من"}
          </Button>
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <Text style={footerTextStyle}>
            این ایمیل به صورت خودکار ارسال شده است. لطفاً به آن پاسخ ندهید.
          </Text>
        </div>
      </Container>
    </Html>
  );
}

// Helper functions
const getStatusText = (status) => {
  const statusMap = {
    OPEN: "باز",
    PENDING: "در انتظار پاسخ",
    CLOSED: "بسته شده",
    ANSWERED: "پاسخ داده شده",
  };
  return statusMap[status] || status;
};

// Styles
const containerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "40px 20px",
  backgroundColor: "#f8fafc",
  borderRadius: "12px",
  fontFamily: "Arial, sans-serif",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "30px",
  paddingBottom: "20px",
  borderBottom: "2px solid #e2e8f0",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1e293b",
  margin: "0",
};

const ticketInfoStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "24px",
  margin: "20px 0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#64748b",
  margin: "8px 0 4px 0",
};

const valueStyle = {
  fontSize: "16px",
  fontWeight: "500",
  color: "#1e293b",
  margin: "0 0 16px 0",
};

const statusStyle = (status) => ({
  fontSize: "16px",
  fontWeight: "600",
  color: getStatusColor(status),
  margin: "0 0 16px 0",
  padding: "6px 12px",
  backgroundColor: getStatusBgColor(status),
  borderRadius: "6px",
  display: "inline-block",
});

const descriptionStyle = {
  fontSize: "14px",
  color: "#475569",
  margin: "0 0 16px 0",
  lineHeight: "1.6",
  backgroundColor: "#f1f5f9",
  padding: "12px",
  borderRadius: "8px",
};

const buttonContainerStyle = {
  textAlign: "center",
  margin: "30px 0",
};

const buttonStyle = {
  background: "#3b82f6",
  color: "#ffffff",
  padding: "16px 32px",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "16px",
  display: "inline-block",
  transition: "all 0.2s",
};

const footerStyle = {
  textAlign: "center",
  marginTop: "30px",
  paddingTop: "20px",
  borderTop: "1px solid #e2e8f0",
};

const footerTextStyle = {
  fontSize: "12px",
  color: "#64748b",
  margin: "0",
};

// Helper functions for status colors
const getStatusColor = (status) => {
  const colorMap = {
    open: "#059669",
    pending: "#d97706",
    closed: "#dc2626",
    resolved: "#059669",
  };
  return colorMap[status] || "#64748b";
};

const getStatusBgColor = (status) => {
  const bgColorMap = {
    open: "#d1fae5",
    pending: "#fed7aa",
    closed: "#fee2e2",
    resolved: "#d1fae5",
  };
  return bgColorMap[status] || "#f1f5f9";
};
