interface ButtonProps {
  color: string;
  label: string;
  onClick: () => void;
}

const Button = (props: ButtonProps) => {
    const { color, label, onClick } = props;
  return (
    <button
      style={{ backgroundColor: color, color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
