export const main = {
  backgroundColor: '#09090b',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  padding: '40px 20px',
};

export const container = {
  margin: '0 auto',
  maxWidth: '600px',
};

export const heading = {
  color: '#22d3ee',
  fontSize: '28px',
  fontWeight: 'bold',
  textShadow: '0 0 12px rgba(34, 211, 238, 0.5)',
  margin: '0 0 32px',
  padding: '0',
};

export const block = {
  backgroundColor: '#18181b',
  borderRadius: '8px',
  padding: '10px 14px',
  marginBottom: '16px',
  border: '1px solid #27272a',
};

export const label = {
  color: '#a1a1aa',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '0 0 8px',
  padding: '0',
};

export const emailStyle = {
  color: '#22d3ee',
  fontSize: '16px',
  margin: '0',
  padding: '0',
};

export const messageStyle = {
  color: '#fafafa',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0',
  padding: '0',
  whiteSpace: 'pre-wrap' as const,
};
