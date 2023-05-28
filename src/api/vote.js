const API_URL = process.env.API_URL

const postVote = (body) => {
    let supabaseToken = null
    try {
        supabaseToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('supabaseToken'))
        ?.split('=')[1];
    } catch(e) {
        console.log(e)
    }

    fetch(`${API_URL}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth': supabaseToken
      },
      body: JSON.stringify(body),
    })
    .then((res) => res.json())
    .catch((err) => console.error(err));
  }

module.exports = {postVote}