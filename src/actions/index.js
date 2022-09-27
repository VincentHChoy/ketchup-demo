export const activeDocs = () => {
  return {
    type: 'ACTIVE_DOC'
  }
}

export const activeSheets = () => {
  return {
    type: 'ACTIVE_SHEET'
  }
}

export const toggleChat = () => {
  return {
    type: 'TOGGLE_CHAT'
  }
}

export const setDocId = (googleId) => {
  return {
    type: 'DOC_ID',
    payload: googleId
  }
}

export const setSheetsId = (googleId) => {
  return {
    type: 'SHEETS_ID',
    payload: googleId
  }
}