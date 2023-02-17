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
  const commentBtn = document.querySelector('#commentBtn').value.trim();
  // Get the project ID from the URL
  const projectId = window.location.pathname.split('/').pop();
   // Prompt the user for their comment text
  const commentText = prompt('Enter your comment:');

  if (commentBtn) {
    const response = await fetch(`/api/projects/${projectId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text: commentText }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create comment');
    }
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
.querySelector('#commentBtn')
.addEventListener('click', newCommentHandler);
