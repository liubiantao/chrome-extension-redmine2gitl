const addRedmineIdToIssuesTitle = () => {
  const id = document.location.pathname.replace('/issues/', '')
  const titleNode = document.querySelector('.subject h3')
  if (id && titleNode) {
    titleNode.innerText += ` (REDMINE-${id})`
  }
}

addRedmineIdToIssuesTitle()
