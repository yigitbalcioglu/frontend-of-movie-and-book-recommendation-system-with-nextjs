// pages/index.tsx
import MessageForm from 'components/MessageForm'
import MessagesList from 'components/MessageList'
import FilmList from 'components/FilmList'
import { NextPage } from 'next'
import { MessagesProvider } from 'utils/useMessages'
import { FilmsProvider } from '../components/FilmContent'
import Layout from 'components/Layout'

const IndexPage: NextPage = () => {
  return (
    <MessagesProvider>
      <FilmsProvider>
        <Layout>
          {/* İstediğiniz yerde FilmList’i render edebilirsiniz */}
          <FilmList />
          <MessagesList />
          <div className="fixed bottom-0 right-0 left-0">
            <MessageForm />
          </div>
        </Layout>
      </FilmsProvider>
    </MessagesProvider>
  )
}

export default IndexPage
