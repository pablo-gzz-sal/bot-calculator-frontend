export const formatDate = (date: Date) => {
    const formattedDate = new Date(date)
    return formattedDate.toLocaleString()
  }