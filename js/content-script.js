const addCopyButton = (node, title) => {
  const button = document.createElement('button')
  button.innerText = 'Copy'
  button.setAttribute('data-clipboard-text', title)
  node.appendChild(button)

  const clipboard = new ClipboardJS(button)

  clipboard.on('success', e => {
    e.clearSelection()

    button.innerText = 'Copy success'
    setTimeout(() => {
      button.innerText = 'Copy'
    }, 1000)
  })

  clipboard.on('error', e => {
    console.error('Action:', e.action)
    console.error('Trigger:', e.trigger)
  })
}

const addRedmineIdToIssuesTitle = () => {
  const id = document.location.pathname.replace('/issues/', '')
  const titleNode = document.querySelector('.subject h3')
  if (id && titleNode) {
    titleNode.innerText += ` (REDMINE-${id})`
    const title = titleNode.innerHTML
    addCopyButton(titleNode, title)
  }
}

addRedmineIdToIssuesTitle()
