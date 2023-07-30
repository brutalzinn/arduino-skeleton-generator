import styles from '../styles/Footer.module.css';

export default function Footer(){
    return (<footer className={styles.container}>
        <a
          href="https://robertocpaes.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed with ❤️ 
          by robertocpaes.dev
        </a>
        <style jsx global>{`
          a {
            color: inherit;
            text-decoration: none;
          }
        
      `}</style>
        </footer>)
}

