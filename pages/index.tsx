import styles from '../styles/Home.module.css';
import Header from '../components/head';
import Footer from '../components/footer';
import WemosGenerator from '../components/generators/wemos';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header/>
      <main>
        <WemosGenerator/>
      </main>
      <Footer/>
      <style jsx global>{`
        body {
          background-color: black;
          color: white;
        }
        @media screen and (prefers-color-scheme: light) {
          body {
            background-color: white;
            color: black;
          }
        }
      `}</style>
    </div>
  )
}
