import MessageForm from 'components/MessageForm'
import MessagesList from 'components/MessageList'
import { NextPage } from 'next'
import { MessagesProvider } from 'utils/useMessages'
import { FilmsProvider } from '../components/FilmContent'
import { BooksProvider } from '../components/BookContent'
import Layout from 'components/Layout'

const IndexPage: NextPage = () => {
  return (
    <MessagesProvider>
      <FilmsProvider>
        <BooksProvider>
          <Layout>
            <div className="bg-[#212121]">
              <MessagesList />
              <MessageForm />
            </div>
          </Layout>
        </BooksProvider>
      </FilmsProvider>
    </MessagesProvider>
  )
}

export default IndexPage
