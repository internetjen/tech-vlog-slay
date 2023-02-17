
const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    } 
  }
};


const newCommentHandler = async (event) => {
  event.preventDefault();
  const comment = document.querySelector('#comment-desc').value.trim();
  const projectId = event.target.getAttribute('data-id'); // get project id from the form's data-id attribute

  if (projectId) { // check if project id is valid
    try {
      const response = await fetch(`/api/projects/${projectId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const comment = data.comment;

        const commentList = document.querySelector('#comments-list');
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.innerHTML = `
          <div class="comment">
            <p>${comment.text}</p>
            <p class="postText">Posted by ${comment.user.name} on ${format_date(comment.date_created)}</p>
          </div>
        `;
        commentList.appendChild(newComment);

        document.querySelector('#comment-desc').value = '';
      } else {
        throw new Error('Failed to create comment');
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  } else {
    alert('Invalid project ID');
  }
};



const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};


document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);

  document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);