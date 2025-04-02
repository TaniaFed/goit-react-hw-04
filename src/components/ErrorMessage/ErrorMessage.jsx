import styles from './ErrorMessage.module.css'

const ErrorMessage = ({ message }) => {
  return (
    <div
      className={styles.message}
      style={{ color: 'White', textAlign: 'center', marginTop: '20px' }}
    >
      {message || 'Щось пішло не так. Будь ласка, спробуйте пізніше.'}
    </div>
  )
}

export default ErrorMessage
