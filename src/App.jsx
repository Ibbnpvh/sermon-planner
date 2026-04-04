import { LibraryProvider } from './context/LibraryContext'
import { SermonProvider } from './context/SermonContext'
import { AppHeader } from './components/layout/AppHeader'
import { Sidebar } from './components/layout/Sidebar'
import { MobileNav } from './components/layout/MobileNav'
import { PreacherInfo } from './components/sections/PreacherInfo'
import { TitleTheme } from './components/sections/TitleTheme'
import { Introduction } from './components/sections/Introduction'
import { MainPoints } from './components/sections/MainPoints'
import { Illustrations } from './components/sections/Illustrations'
import { Conclusion } from './components/sections/Conclusion'
import { References } from './components/sections/References'
import { PersonalNotes } from './components/sections/PersonalNotes'
import styles from './App.module.css'

function FormContent() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.sections}>
          <PreacherInfo />
          <TitleTheme />
          <Introduction />
          <MainPoints />
          <Illustrations />
          <Conclusion />
          <References />
          <PersonalNotes />
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <LibraryProvider>
      <SermonProvider>
        <AppHeader />
        <MobileNav />
        <FormContent />
      </SermonProvider>
    </LibraryProvider>
  )
}
