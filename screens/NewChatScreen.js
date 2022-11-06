import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components/native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { FontAwesome } from '@expo/vector-icons'
import PageContainer from '../components/PageContainer'
import CustomHeaderButton from '../components/CustomHeaderButtons'
import { colors } from '../theme/colors'

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.greyExtraLight};
  height: 30px;
  margin: 8px 0;
  padding: 5px 8px;
  border-radius: 5px;
`

const SearchInput = styled.TextInput`
  margin-left: 8px;
  width: 100%;
`

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const EmptyIcon = styled(FontAwesome)`
  margin-bottom: 20px;
`

const EmptyText = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary});
  font-family: regular;
  letter-spacing: 0.3px;
`

const NewChatScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState(null)
  const [noResultsFound, setNoResultsFound] = useState(false)

  const isEmpty = useMemo(() => !isLoading && !users, [isLoading, users])
  const isNotFound = useMemo(
    () => !isLoading && noResultsFound,
    [isLoading, noResultsFound]
  )

  const handleClose = () => navigation.goBack()

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Close" onPress={handleClose} />
          </HeaderButtons>
        )
      },
      headerTitle: 'New chat',
    })
  }, [])

  const handleChangeSearch = value => {
    console.log('handleChangeSearch', value)
  }

  return (
    <PageContainer>
      {/* Search */}
      <SearchContainer>
        <FontAwesome name="search" size={15} color={colors.greyLight} />
        <SearchInput placeholder="Search" onChangeText={handleChangeSearch} />
      </SearchContainer>

      {/* Not fount */}
      {isNotFound && (
        <EmptyContainer>
          <EmptyIcon name="question" size={55} color={colors.greyLight} />
          <EmptyText>No users found!</EmptyText>
        </EmptyContainer>
      )}

      {/* Empty */}
      {isEmpty && (
        <EmptyContainer>
          <EmptyIcon name="users" size={55} color={colors.greyLight} />
          <EmptyText>Enter a name to search for a user</EmptyText>
        </EmptyContainer>
      )}
    </PageContainer>
  )
}

export default NewChatScreen
