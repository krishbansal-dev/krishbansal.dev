export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <span style={{ color: 'var(--color-primary)' }}>$</span>{' '}
      echo "© {new Date().getFullYear()} krishbansal.dev — built from the metal up"
    </footer>
  )
}
