import { FiPlus } from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Section } from '../../components/Section'
import { Input } from '../../components/Input'
import { Note } from '../../components/Note'
import { useState } from 'react'
import { useEffect } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const [notes, setNotes] = useState([])
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const navigate = useNavigate()

  function handleSelectedTag(tagName) {
    if (tagName === 'all') {
      return setSelectedTags([])
    }

    const alreadySelected = selectedTags.includes(tagName)

    if (alreadySelected) {
      setSelectedTags(prevState => prevState.filter(tag => tag !== tagName))
    } else {
      setSelectedTags(prevState => [...prevState, tagName])
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`)
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get('/tags')

      setTags(response.data)
    }

    fetchTags()
  }, [])

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${selectedTags}`
      )

      setNotes(response.data)
    }

    fetchNotes()
  }, [selectedTags, search])

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title="Todos"
            isActive={selectedTags.length === 0}
            onClick={() => handleSelectedTag('all')}
          />
        </li>
        {tags &&
          tags.map((tag, index) => (
            <li key={index}>
              <ButtonText
                title={tag.name}
                onClick={() => handleSelectedTag(tag.name)}
                isActive={selectedTags.includes(tag.name)}
              />
            </li>
          ))}
      </Menu>
      <Search>
        <Input
          placeholder="Pesquisar pelo t??tulo"
          onChange={e => setSearch(e.target.value)}
        />
      </Search>
      <Content>
        <Section title="Minhas notas">
          {notes.map(note => (
            <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
            />
          ))}
        </Section>
      </Content>
      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  )
}
