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

const addResolvedButtonm = id => {
  const node = document.querySelector('.status.attribute')
  if (node) {
    const button = document.createElement('button')
    button.innerText = 'Change to Resolved'
    button.onclick = () => {
      resolveIssue(id)
    }
    node.appendChild(button)
  }
}

const addRedmineIdToIssuesTitle = (node, id) => {
  node.innerText += ` (REDMINE-${id})`
  return node.innerHTML
}

const resolveIssue = id => {
  chrome.storage.sync.get('REDMINE_API_KEY', config => {
    const { REDMINE_API_KEY } = config
    const data = {
      issue: {
        status_id: 3
      }
    }

    if (REDMINE_API_KEY) {
      fetch(`https://redmine.saybot.net/issues/${id}.json`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Redmine-API-Key': REDMINE_API_KEY
        },
        method: 'PUT',
        body: JSON.stringify(data)
      })
        .then(res => {
          if (res.ok) {
            window.location.reload()
          }
        })
        .catch(error => console.error('Error:', error))
    }
  })
}

const main = () => {
  const id = document.location.pathname.replace('/issues/', '')
  const titleNode = document.querySelector('.subject h3')
  if (id && titleNode) {
    const title = addRedmineIdToIssuesTitle(titleNode, id)
    addCopyButton(titleNode, title)
    addResolvedButtonm(id)
  }
}

main()
